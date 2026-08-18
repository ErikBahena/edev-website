"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { mintReserveToken, DEFAULT_TTL_DAYS } from "@/lib/reserve-token";

/**
 * Mint an invite link to /reserve for a specific client.
 *
 * Auth: this is a server action, so it's callable by anyone who knows the
 * action id. Defense is the same as every other admin action — the RLS-gated
 * read below fails for an anonymous session, and we return before minting.
 */
export async function createReserveLinkAction(
  clientId: string,
): Promise<{ ok: true; url: string; expiresAt: string } | { ok: false; error: string }> {
  try {
    const supabase = await createClient();
    const { data: client, error } = await supabase
      .from("clients")
      .select("id, business_name")
      .eq("id", clientId)
      .single();
    if (error || !client) return { ok: false, error: "Client not found." };

    const { token, expiresAt } = mintReserveToken(client.business_name, DEFAULT_TTL_DAYS);

    const h = await headers();
    const host = h.get("host") ?? "www.elmadigital.io";
    const proto = host.startsWith("localhost") ? "http" : "https";
    return {
      ok: true,
      url: `${proto}://${host}/reserve?t=${encodeURIComponent(token)}`,
      expiresAt: expiresAt.toISOString(),
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to create link." };
  }
}
