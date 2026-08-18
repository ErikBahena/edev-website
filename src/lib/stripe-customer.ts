import { createClient } from "@/lib/supabase/server";
import { stripe } from "@/lib/stripe";

/**
 * Ensure a client has a Stripe customer. Creates one on demand if not, and
 * writes the id back to our clients table. Returns the Stripe customer id.
 *
 * Shared by invoicing and subscription billing so both paths produce customers
 * with the same shape — two independent creation paths eventually drift, and a
 * duplicate customer splits a client's billing history in the Stripe dashboard.
 *
 * Runs with the caller's session (RLS applies), so admin-only by construction.
 */
export async function ensureStripeCustomer(clientId: string): Promise<string> {
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
      "Client needs an email address before billing can be set up."
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
