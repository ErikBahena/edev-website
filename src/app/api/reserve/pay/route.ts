import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { stripe } from "@/lib/stripe";
import { verifyReserveToken } from "@/lib/reserve-token";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/reserve/pay
 *
 * Body: { agreementId: string, signerEmail: string, token: string, percent?: number }
 *
 * Auth: same signed invite token as /api/reserve, PLUS the caller must supply
 * the signer email on file for that agreement. A UUID alone is not a
 * credential — agreementIds are shown on screen after signing and could be
 * shoulder-surfed or leaked; without the email match, holding one gets you
 * nothing. Rate limited per IP.
 *
 * Also guarded against double-issue: if an open/paid deposit invoice already
 * exists for this project, we return that one instead of creating another.
 *
 * Creates a Stripe customer for the signer (if not already linked), creates
 * a Stripe invoice for the deposit (default 30% of the project amount),
 * finalizes the invoice so it's payable via Stripe's hosted URL, and returns
 * the hosted invoice URL.
 *
 * NOTE: Uses the LIVE Stripe key in this environment — every successful call
 * creates a REAL customer and invoice in Erik's Stripe account. The flow is
 * intentionally a separate endpoint from /api/reserve so that signing alone
 * doesn't touch Stripe — only an explicit "pay deposit" click does.
 */
export async function POST(req: NextRequest) {
  try {
    const rl = rateLimit(`reserve-pay:${clientIp(req.headers)}`, 10, 60 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json({ error: "Too many requests." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } });
    }

    const body = await req.json();

    if (!verifyReserveToken(typeof body.token === "string" ? body.token : null)) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const agreementId = String(body.agreementId ?? "").trim();
    const signerEmail = String(body.signerEmail ?? "").trim().toLowerCase();
    // Server-side constant. Never let the caller pick their own deposit size.
    const percent = 30;

    if (!signerEmail) {
      return NextResponse.json({ error: "signerEmail required" }, { status: 400 });
    }

    if (!agreementId) {
      return NextResponse.json(
        { error: "agreementId required" },
        { status: 400 },
      );
    }
    const sb = createAdminClient();

    // Look up project + client
    const { data: project, error: projectErr } = await sb
      .from("projects")
      .select("id, client_id, name, project_fee_cents")
      .eq("id", agreementId)
      .single();
    if (projectErr || !project) {
      return NextResponse.json(
        { error: "Agreement not found." },
        { status: 404 },
      );
    }

    const { data: client, error: clientErr } = await sb
      .from("clients")
      .select("id, name, business_name, email, phone, stripe_customer_id")
      .eq("id", project.client_id)
      .single();
    if (clientErr || !client) {
      return NextResponse.json(
        { error: "Client not found." },
        { status: 404 },
      );
    }

    if (!client.email) {
      return NextResponse.json(
        { error: "Client email is required to issue an invoice." },
        { status: 400 },
      );
    }

    // Ownership: the email on the agreement must match what the caller sent.
    // Same 404 as an unknown id so the two cases are indistinguishable.
    if (client.email.trim().toLowerCase() !== signerEmail) {
      return NextResponse.json({ error: "Agreement not found." }, { status: 404 });
    }

    // Idempotency: one deposit invoice per project. A retry (or a double-click)
    // returns the existing invoice rather than minting a second one in Stripe.
    const { data: existing } = await sb
      .from("invoices")
      .select("stripe_invoice_id, stripe_hosted_invoice_url, amount_total_cents, status")
      .eq("project_id", project.id)
      .in("status", ["open", "paid", "draft"])
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existing?.stripe_hosted_invoice_url) {
      return NextResponse.json({
        hostedInvoiceUrl: existing.stripe_hosted_invoice_url,
        stripeInvoiceId: existing.stripe_invoice_id,
        amountCents: existing.amount_total_cents,
        existing: true,
      });
    }

    const totalCents = Number(project.project_fee_cents ?? 0);
    if (totalCents <= 0) {
      return NextResponse.json(
        { error: "Project has no fee on file." },
        { status: 400 },
      );
    }
    const depositCents = Math.round((totalCents * percent) / 100);

    // 1. Ensure a Stripe customer exists for this client
    let stripeCustomerId = client.stripe_customer_id;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: client.email,
        name: client.business_name,
        description: `${client.name} — ${client.business_name} — autogenerated from /reserve`,
        phone: client.phone ?? undefined,
        metadata: {
          source: "elmadigital.io/reserve",
          edev_client_id: client.id,
          edev_project_id: project.id,
        },
      });
      stripeCustomerId = customer.id;
      // Save back so we don't recreate next time
      await sb
        .from("clients")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", client.id);
    }

    // 2. Create the invoice (draft → finalize → it becomes payable)
    const invoice = await stripe.invoices.create({
      customer: stripeCustomerId,
      collection_method: "send_invoice",
      days_until_due: 7,
      description: `Deposit (${percent}%) for ${project.name}`,
      metadata: {
        source: "elmadigital.io/reserve",
        edev_client_id: client.id,
        edev_project_id: project.id,
        deposit_percent: String(percent),
        total_cents: String(totalCents),
      },
    });

    // 3. Add the line item
    await stripe.invoiceItems.create({
      customer: stripeCustomerId,
      invoice: invoice.id,
      amount: depositCents,
      currency: "usd",
      description: `${percent}% deposit on $${(totalCents / 100).toLocaleString()} engagement — ${project.name}`,
    });

    // 4. Finalize so it becomes payable
    const finalized = await stripe.invoices.finalizeInvoice(invoice.id!);

    // 5. Persist to our invoices table
    const { error: invErr } = await sb.from("invoices").insert({
      client_id: client.id,
      project_id: project.id,
      stripe_invoice_id: finalized.id,
      stripe_hosted_invoice_url: finalized.hosted_invoice_url ?? null,
      stripe_invoice_pdf: finalized.invoice_pdf ?? null,
      description: `Deposit (${percent}%) for ${project.name}`,
      line_items: [
        {
          description: `${percent}% deposit on $${(totalCents / 100).toLocaleString()} engagement`,
          amount_cents: depositCents,
          quantity: 1,
        },
      ],
      amount_total_cents: depositCents,
      currency: "usd",
      status: finalized.status === "open" ? "open" : "draft",
      due_date: finalized.due_date
        ? new Date(finalized.due_date * 1000).toISOString().slice(0, 10)
        : null,
      sent_at: finalized.status_transitions?.finalized_at
        ? new Date(finalized.status_transitions.finalized_at * 1000).toISOString()
        : null,
    });
    if (invErr) {
      console.error("[/api/reserve/pay] failed to save invoice row:", invErr);
      // Non-fatal — Stripe is source of truth.
    }

    return NextResponse.json({
      hostedInvoiceUrl: finalized.hosted_invoice_url,
      stripeInvoiceId: finalized.id,
      amountCents: depositCents,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[/api/reserve/pay] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
