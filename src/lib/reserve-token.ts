import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed, expiring invite tokens for the /reserve flow.
 *
 * /reserve is not a public funnel — nobody signs a $50k engagement from a page
 * they stumbled onto. It's the link Erik hands a prospect after a discovery
 * call. So the page and both APIs behind it only work with a valid token, and
 * anything without one 404s exactly like a page that doesn't exist.
 *
 * Token = base64url(payload) + "." + base64url(hmac_sha256(payload))
 * payload = "<expiresAtUnixSeconds>:<label>"
 *
 * Signed with RESERVE_LINK_SECRET. Stateless on purpose: nothing to store, and
 * rotating the secret invalidates every outstanding link at once.
 */

const SECRET = process.env.RESERVE_LINK_SECRET;

/** Default link lifetime. Long enough for a real decision, short enough that
 *  a leaked link goes stale. */
export const DEFAULT_TTL_DAYS = 14;

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf).toString("base64url");
}

function sign(payload: string): string {
  if (!SECRET) throw new Error("RESERVE_LINK_SECRET is not set");
  return b64url(createHmac("sha256", SECRET).update(payload).digest());
}

export function mintReserveToken(
  label: string,
  ttlDays: number = DEFAULT_TTL_DAYS,
): { token: string; expiresAt: Date } {
  const expiresAt = new Date(Date.now() + ttlDays * 86_400_000);
  const safeLabel = label.replace(/[^a-z0-9 _-]/gi, "").slice(0, 40);
  const payload = `${Math.floor(expiresAt.getTime() / 1000)}:${safeLabel}`;
  return { token: `${b64url(payload)}.${sign(payload)}`, expiresAt };
}

export type ReserveTokenClaims = { expiresAt: Date; label: string };

/** Returns claims if the token is well-formed, correctly signed, and unexpired. */
export function verifyReserveToken(
  token: string | null | undefined,
): ReserveTokenClaims | null {
  if (!token || !SECRET) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;

  let payload: string;
  try {
    payload = Buffer.from(token.slice(0, dot), "base64url").toString("utf8");
  } catch {
    return null;
  }

  const expected = sign(payload);
  const given = token.slice(dot + 1);
  // constant-time compare; lengths must match for timingSafeEqual
  if (expected.length !== given.length) return null;
  if (!timingSafeEqual(Buffer.from(expected), Buffer.from(given))) return null;

  const colon = payload.indexOf(":");
  if (colon <= 0) return null;
  const exp = Number(payload.slice(0, colon));
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return null;

  return { expiresAt: new Date(exp * 1000), label: payload.slice(colon + 1) };
}
