"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";
import { ensureStripeCustomer } from "@/lib/stripe-customer";
import type { BillingInterval, SubscriptionStatus } from "@/lib/types";
import type Stripe from "stripe";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mapSubscriptionStatus(
  s: Stripe.Subscription.Status | null | undefined
): SubscriptionStatus {
  switch (s) {
    case "incomplete":
    case "incomplete_expired":
    case "trialing":
    case "active":
    case "past_due":
    case "canceled":
    case "unpaid":
    case "paused":
      return s;
    default:
      return "incomplete";
  }
}

function idOf(ref: string | { id: string } | null | undefined): string | null {
  if (!ref) return null;
  return typeof ref === "string" ? ref : ref.id;
}

function unixToIso(seconds: number | null | undefined): string | null {
  return seconds ? new Date(seconds * 1000).toISOString() : null;
}

/**
 * Stripe API 2025+ keeps the billing period on each subscription item rather
 * than the subscription itself. We bill single-item subscriptions.
 */
function periodEndFromSubscription(sub: Stripe.Subscription): string | null {
  return unixToIso(sub.items?.data?.[0]?.current_period_end);
}

/** Absolute origin of this deployment, for Checkout return URLs. */
async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host");
  if (!host) return "https://www.elmadigital.io";
  const proto = host.startsWith("localhost") ? "http" : "https";
  return `${proto}://${host}`;
}

const VALID_INTERVALS: BillingInterval[] = ["day", "week", "month", "year"];

// ─── Create subscription (via Stripe Checkout) ───────────────────────────────

/**
 * Creates a local subscription row plus a Stripe Checkout Session in
 * `subscription` mode, and returns the hosted checkout URL.
 *
 * The client opens that link once and enters a card or bank account. Stripe
 * then creates the subscription and charges it automatically every period —
 * no invoice to chase, no monthly click. The webhook fills in the Stripe ids
 * on `checkout.session.completed`.
 *
 * Nothing is charged and no subscription exists in Stripe until the client
 * completes checkout.
 */
export async function createSubscriptionAction(
  clientId: string,
  formData: FormData
): Promise<
  { ok: true; subscriptionId: string; checkoutUrl: string } | { ok: false; error: string }
> {
  try {
    const supabase = await createClient();

    const description = String(formData.get("description") || "").trim();
    const memo = String(formData.get("memo") || "").trim() || null;
    const projectId = String(formData.get("project_id") || "").trim() || null;
    const amountRaw = String(formData.get("amount") || "").trim();
    const intervalRaw = String(formData.get("billing_interval") || "month");
    const intervalCount = Math.max(
      1,
      parseInt(String(formData.get("interval_count") || "1"), 10) || 1
    );

    if (!description) {
      return { ok: false, error: "A description is required." };
    }

    const amount = parseFloat(amountRaw);
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, error: "Amount must be greater than zero." };
    }
    const amountCents = Math.round(amount * 100);

    const billingInterval = VALID_INTERVALS.includes(
      intervalRaw as BillingInterval
    )
      ? (intervalRaw as BillingInterval)
      : "month";

    const customerId = await ensureStripeCustomer(clientId);
    const origin = await siteOrigin();

    // Insert the local row first so we have an id to correlate the session to.
    const { data: row, error: insertError } = await supabase
      .from("subscriptions")
      .insert({
        client_id: clientId,
        project_id: projectId,
        description,
        amount_cents: amountCents,
        currency: "usd",
        billing_interval: billingInterval,
        interval_count: intervalCount,
        status: "incomplete",
        memo,
      })
      .select("id")
      .single();

    if (insertError) throw new Error(insertError.message);

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        // Payment method types are left to the dashboard's automatic settings.
        // Enabling ACH there drops the fee on a $50/mo retainer from ~$1.75 to
        // ~$0.40 per charge.
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "usd",
              unit_amount: amountCents,
              product_data: { name: description },
              recurring: {
                interval: billingInterval,
                interval_count: intervalCount,
              },
            },
          },
        ],
        subscription_data: {
          description,
          metadata: {
            elma_client_id: clientId,
            elma_subscription_id: row.id,
            ...(projectId ? { elma_project_id: projectId } : {}),
          },
        },
        metadata: {
          elma_client_id: clientId,
          elma_subscription_id: row.id,
        },
        success_url: `${origin}/admin/clients/${clientId}?billing=started`,
        cancel_url: `${origin}/admin/clients/${clientId}?billing=canceled`,
      });
    } catch (stripeErr) {
      // Don't leave an orphan local row pointing at nothing.
      await supabase.from("subscriptions").delete().eq("id", row.id);
      throw stripeErr;
    }

    const { error: updateError } = await supabase
      .from("subscriptions")
      .update({
        stripe_checkout_session_id: session.id,
        checkout_url: session.url,
      })
      .eq("id", row.id);

    if (updateError) throw new Error(updateError.message);

    revalidatePath("/admin");
    revalidatePath("/admin/subscriptions");
    revalidatePath(`/admin/clients/${clientId}`);

    return {
      ok: true,
      subscriptionId: row.id,
      checkoutUrl: session.url ?? "",
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to create subscription.",
    };
  }
}

// ─── Cancel ──────────────────────────────────────────────────────────────────

/**
 * Cancel a subscription. Defaults to cancelling at period end so the client
 * keeps what they've already paid for; `immediately` stops billing at once.
 */
export async function cancelSubscriptionAction(
  localId: string,
  immediately = false
) {
  const supabase = await createClient();

  const { data: sub, error } = await supabase
    .from("subscriptions")
    .select("id, client_id, stripe_subscription_id, status")
    .eq("id", localId)
    .single();

  if (error || !sub) throw new Error("Subscription not found.");

  if (!sub.stripe_subscription_id) {
    // Never completed checkout — nothing exists in Stripe to cancel.
    await supabase
      .from("subscriptions")
      .update({
        status: "canceled",
        canceled_at: new Date().toISOString(),
        checkout_url: null,
      })
      .eq("id", localId);
  } else if (immediately) {
    const canceled = await stripe.subscriptions.cancel(
      sub.stripe_subscription_id
    );
    await supabase
      .from("subscriptions")
      .update({
        status: mapSubscriptionStatus(canceled.status),
        canceled_at: unixToIso(canceled.canceled_at),
        cancel_at_period_end: false,
      })
      .eq("id", localId);
  } else {
    const updated = await stripe.subscriptions.update(
      sub.stripe_subscription_id,
      { cancel_at_period_end: true }
    );
    await supabase
      .from("subscriptions")
      .update({
        status: mapSubscriptionStatus(updated.status),
        cancel_at_period_end: true,
        current_period_end: periodEndFromSubscription(updated),
      })
      .eq("id", localId);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/clients/${sub.client_id}`);
}

// ─── Resume (undo a scheduled cancellation) ──────────────────────────────────

export async function resumeSubscriptionAction(localId: string) {
  const supabase = await createClient();

  const { data: sub, error } = await supabase
    .from("subscriptions")
    .select("id, client_id, stripe_subscription_id")
    .eq("id", localId)
    .single();

  if (error || !sub) throw new Error("Subscription not found.");
  if (!sub.stripe_subscription_id) {
    throw new Error("This subscription was never started in Stripe.");
  }

  const updated = await stripe.subscriptions.update(sub.stripe_subscription_id, {
    cancel_at_period_end: false,
  });

  await supabase
    .from("subscriptions")
    .update({
      status: mapSubscriptionStatus(updated.status),
      cancel_at_period_end: false,
      current_period_end: periodEndFromSubscription(updated),
    })
    .eq("id", localId);

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/clients/${sub.client_id}`);
}

// ─── Refresh from Stripe ─────────────────────────────────────────────────────

export async function refreshSubscriptionAction(localId: string) {
  const supabase = await createClient();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("id, client_id, stripe_subscription_id, stripe_checkout_session_id")
    .eq("id", localId)
    .single();

  if (!sub) return;

  let stripeSubId = sub.stripe_subscription_id;

  // Checkout may have completed while the webhook was misconfigured — recover
  // the link from the session rather than stranding the row on "Awaiting setup".
  if (!stripeSubId && sub.stripe_checkout_session_id) {
    const session = await stripe.checkout.sessions.retrieve(
      sub.stripe_checkout_session_id
    );
    stripeSubId = idOf(session.subscription);
  }

  if (!stripeSubId) return;

  const fresh = await stripe.subscriptions.retrieve(stripeSubId);

  await supabase
    .from("subscriptions")
    .update({
      stripe_subscription_id: fresh.id,
      stripe_price_id: idOf(fresh.items?.data?.[0]?.price),
      status: mapSubscriptionStatus(fresh.status),
      current_period_end: periodEndFromSubscription(fresh),
      cancel_at_period_end: fresh.cancel_at_period_end ?? false,
      started_at: unixToIso(fresh.start_date),
      canceled_at: unixToIso(fresh.canceled_at),
    })
    .eq("id", localId);

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/clients/${sub.client_id}`);
}

// ─── Delete a never-started row ──────────────────────────────────────────────

export async function deleteSubscriptionAction(localId: string) {
  const supabase = await createClient();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("id, client_id, stripe_subscription_id")
    .eq("id", localId)
    .single();

  if (!sub) return;
  if (sub.stripe_subscription_id) {
    throw new Error(
      "This subscription exists in Stripe — cancel it instead of deleting."
    );
  }

  await supabase.from("subscriptions").delete().eq("id", localId);

  revalidatePath("/admin");
  revalidatePath("/admin/subscriptions");
  revalidatePath(`/admin/clients/${sub.client_id}`);
}
