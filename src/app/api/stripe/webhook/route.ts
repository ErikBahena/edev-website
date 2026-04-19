import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import type { InvoiceStatus } from "@/lib/types";

/**
 * Stripe webhook endpoint.
 *
 * Configure in Stripe dashboard → Developers → Webhooks:
 *   URL:     https://www.elmadigital.io/api/stripe/webhook
 *   Events:  invoice.*   (or add more as we grow)
 *
 * Local dev:  `stripe listen --forward-to localhost:3000/api/stripe/webhook`
 * That command prints the `whsec_...` secret to put in STRIPE_WEBHOOK_SECRET.
 */

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Service-role Supabase client — webhooks have no user session, so we
// bypass RLS for writes. Keys are server-only.
function supabaseService() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

function mapStatus(s: Stripe.Invoice.Status | null | undefined): InvoiceStatus {
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

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error("[stripe webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // Stripe signs the raw bytes. Do NOT use req.json() here.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    console.error("[stripe webhook] signature verification failed:", message);
    return NextResponse.json(
      { error: `Signature verification failed: ${message}` },
      { status: 400 }
    );
  }

  // Only act on invoice events for now. Safe to expand later.
  if (!event.type.startsWith("invoice.")) {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const invoice = event.data.object as Stripe.Invoice;
  if (!invoice.id) {
    return NextResponse.json({ received: true, warning: "no invoice.id" });
  }

  const supabase = supabaseService();

  const paidAt = invoice.status_transitions?.paid_at
    ? new Date(invoice.status_transitions.paid_at * 1000).toISOString()
    : null;
  const sentAt = invoice.status_transitions?.finalized_at
    ? new Date(invoice.status_transitions.finalized_at * 1000).toISOString()
    : null;

  const updates: Record<string, unknown> = {
    status: mapStatus(invoice.status),
    stripe_hosted_invoice_url: invoice.hosted_invoice_url ?? null,
    stripe_invoice_pdf: invoice.invoice_pdf ?? null,
  };
  if (paidAt) updates.paid_at = paidAt;
  if (sentAt) updates.sent_at = sentAt;

  const { error, count } = await supabase
    .from("invoices")
    .update(updates, { count: "exact" })
    .eq("stripe_invoice_id", invoice.id);

  if (error) {
    console.error("[stripe webhook] db update failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    received: true,
    event: event.type,
    stripe_invoice_id: invoice.id,
    rows_updated: count ?? 0,
  });
}

// Explicitly reject GET so someone hitting the URL in a browser gets a clean 405
// instead of a generic Next.js 404/500.
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed — POST only" },
    { status: 405 }
  );
}
