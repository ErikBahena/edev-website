"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import type { InvoiceLineItem, InvoiceStatus } from "@/lib/types";
import type Stripe from "stripe";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Ensure the client has a Stripe customer. Creates one on demand if not,
 * and writes the id back to our clients table. Returns the Stripe customer id.
 */
async function ensureStripeCustomer(clientId: string): Promise<string> {
  const supabase = await createClient();
  const { data: client, error } = await supabase
    .from("clients")
    .select("id, name, business_name, email, phone, stripe_customer_id")
    .eq("id", clientId)
    .single();

  if (error || !client) {
    throw new Error("Client not found.");
  }

  if (client.stripe_customer_id) {
    return client.stripe_customer_id;
  }

  if (!client.email) {
    throw new Error(
      "Client needs an email address before an invoice can be created."
    );
  }

  const customer = await stripe.customers.create({
    email: client.email,
    name: client.business_name || client.name,
    phone: client.phone ?? undefined,
    description: client.name,
    metadata: { elma_client_id: client.id },
  });

  const { error: updateError } = await supabase
    .from("clients")
    .update({ stripe_customer_id: customer.id })
    .eq("id", client.id);

  if (updateError) throw new Error(updateError.message);

  return customer.id;
}

function parseLineItems(formData: FormData): InvoiceLineItem[] {
  // Form fields arrive as line_description_N, line_amount_N, line_qty_N
  const items: InvoiceLineItem[] = [];
  let i = 0;
  while (true) {
    const desc = formData.get(`line_description_${i}`);
    const amt = formData.get(`line_amount_${i}`);
    const qty = formData.get(`line_qty_${i}`);
    if (desc === null && amt === null) break;

    const description = String(desc ?? "").trim();
    const amount = parseFloat(String(amt ?? "0"));
    const quantity = parseInt(String(qty ?? "1"), 10);

    if (description && !isNaN(amount) && amount > 0) {
      items.push({
        description,
        amount_cents: Math.round(amount * 100),
        quantity: Math.max(1, isNaN(quantity) ? 1 : quantity),
      });
    }
    i++;
  }
  return items;
}

function stripeStatusToLocal(s: Stripe.Invoice.Status | null): InvoiceStatus {
  switch (s) {
    case "draft":
      return "draft";
    case "open":
      return "open";
    case "paid":
      return "paid";
    case "uncollectible":
      return "uncollectible";
    case "void":
      return "void";
    default:
      return "draft";
  }
}

// ─── Create invoice ──────────────────────────────────────────────────────────

export async function createInvoiceAction(
  clientId: string,
  formData: FormData
): Promise<{ ok: true; invoiceId: string } | { ok: false; error: string }> {
  try {
    const supabase = await createClient();

    const description = String(formData.get("description") || "").trim();
    const memo = String(formData.get("memo") || "").trim() || null;
    const dueRaw = String(formData.get("due_date") || "").trim();
    const dueDate = dueRaw || null;
    const action = String(formData.get("action") || "draft"); // "draft" | "send"

    const lineItems = parseLineItems(formData);
    if (lineItems.length === 0) {
      return {
        ok: false,
        error: "At least one line item with a positive amount is required.",
      };
    }

    const amountTotalCents = lineItems.reduce(
      (sum, li) => sum + li.amount_cents * li.quantity,
      0
    );

    const customerId = await ensureStripeCustomer(clientId);

    // Compute days-until-due for Stripe's `days_until_due` field.
    // Stripe needs this for collection_method=send_invoice.
    let daysUntilDue = 30;
    if (dueDate) {
      const ms = new Date(dueDate).getTime() - Date.now();
      daysUntilDue = Math.max(1, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    }

    // Create the Stripe invoice first (empty), then attach items, then finalize.
    const stripeInvoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: daysUntilDue,
      description: description || undefined,
      metadata: { elma_client_id: clientId },
    });

    // Add line items (as invoice items attached to this invoice).
    // Stripe's invoiceItems.create expects a total `amount` — we fold qty in.
    for (const item of lineItems) {
      const label =
        item.quantity > 1
          ? `${item.description} (×${item.quantity})`
          : item.description;
      await stripe.invoiceItems.create({
        customer: customerId,
        invoice: stripeInvoice.id,
        description: label,
        amount: item.amount_cents * item.quantity,
        currency: "usd",
      });
    }

    let final = stripeInvoice;

    if (action === "send") {
      // Finalize + send — Stripe emails the client with a hosted link.
      final = await stripe.invoices.sendInvoice(stripeInvoice.id!);
    } else {
      // Just finalize so we have hosted url + pdf. Stripe leaves draft items
      // invisible until finalize. Re-fetch after adding line items so the total
      // reflects them.
      final = await stripe.invoices.retrieve(stripeInvoice.id!);
    }

    // Insert local row mirroring Stripe state
    const { data: inserted, error: insertError } = await supabase
      .from("invoices")
      .insert({
        client_id: clientId,
        description: description || null,
        line_items: lineItems,
        amount_total_cents: amountTotalCents,
        currency: "usd",
        status: stripeStatusToLocal(final.status),
        due_date: dueDate,
        memo,
        stripe_invoice_id: final.id,
        stripe_hosted_invoice_url: final.hosted_invoice_url ?? null,
        stripe_invoice_pdf: final.invoice_pdf ?? null,
        sent_at: action === "send" ? new Date().toISOString() : null,
      })
      .select("id")
      .single();

    if (insertError) throw new Error(insertError.message);

    revalidatePath("/admin");
    revalidatePath("/admin/invoices");
    revalidatePath(`/admin/clients/${clientId}`);

    return { ok: true, invoiceId: inserted.id };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to create invoice.",
    };
  }
}

// ─── Send a draft invoice ────────────────────────────────────────────────────

export async function sendInvoiceAction(localInvoiceId: string) {
  const supabase = await createClient();

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("id, client_id, stripe_invoice_id, status")
    .eq("id", localInvoiceId)
    .single();

  if (error || !invoice) throw new Error("Invoice not found.");
  if (!invoice.stripe_invoice_id)
    throw new Error("Invoice has no Stripe id; can't send.");
  if (invoice.status !== "draft")
    throw new Error("Only draft invoices can be sent.");

  const sent = await stripe.invoices.sendInvoice(invoice.stripe_invoice_id);

  await supabase
    .from("invoices")
    .update({
      status: stripeStatusToLocal(sent.status),
      sent_at: new Date().toISOString(),
      stripe_hosted_invoice_url: sent.hosted_invoice_url ?? null,
      stripe_invoice_pdf: sent.invoice_pdf ?? null,
    })
    .eq("id", localInvoiceId);

  revalidatePath("/admin");
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/clients/${invoice.client_id}`);
}

// ─── Void a Stripe invoice ───────────────────────────────────────────────────

export async function voidInvoiceAction(localInvoiceId: string) {
  const supabase = await createClient();

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("id, client_id, stripe_invoice_id, status")
    .eq("id", localInvoiceId)
    .single();

  if (error || !invoice) throw new Error("Invoice not found.");
  if (!invoice.stripe_invoice_id) {
    // Draft never synced — just mark as void locally
    await supabase
      .from("invoices")
      .update({ status: "void" })
      .eq("id", localInvoiceId);
  } else if (invoice.status === "draft") {
    // Stripe requires deleting drafts, not voiding
    await stripe.invoices.del(invoice.stripe_invoice_id);
    await supabase
      .from("invoices")
      .update({ status: "void" })
      .eq("id", localInvoiceId);
  } else {
    const voided = await stripe.invoices.voidInvoice(invoice.stripe_invoice_id);
    await supabase
      .from("invoices")
      .update({ status: stripeStatusToLocal(voided.status) })
      .eq("id", localInvoiceId);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/clients/${invoice.client_id}`);
}

// ─── Refresh from Stripe (manual sync for now; webhook comes later) ──────────

export async function refreshInvoiceAction(localInvoiceId: string) {
  const supabase = await createClient();
  const { data: invoice } = await supabase
    .from("invoices")
    .select("id, client_id, stripe_invoice_id")
    .eq("id", localInvoiceId)
    .single();

  if (!invoice?.stripe_invoice_id) return;

  const fresh = await stripe.invoices.retrieve(invoice.stripe_invoice_id);

  await supabase
    .from("invoices")
    .update({
      status: stripeStatusToLocal(fresh.status),
      stripe_hosted_invoice_url: fresh.hosted_invoice_url ?? null,
      stripe_invoice_pdf: fresh.invoice_pdf ?? null,
      paid_at: fresh.status === "paid" && !fresh.status_transitions?.paid_at
        ? new Date().toISOString()
        : fresh.status_transitions?.paid_at
          ? new Date(fresh.status_transitions.paid_at * 1000).toISOString()
          : null,
    })
    .eq("id", localInvoiceId);

  revalidatePath("/admin");
  revalidatePath("/admin/invoices");
  revalidatePath(`/admin/clients/${invoice.client_id}`);
}
