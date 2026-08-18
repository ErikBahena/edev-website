/**
 * Minimal fixed-window rate limiter, in-memory per server instance.
 *
 * This is an abuse *floor*, not a distributed limiter: on Vercel each warm
 * function instance keeps its own map, so a determined attacker spread across
 * instances gets N × limit. That's fine for what it guards here — the reserve
 * routes are already behind a signed invite token, so this only has to stop a
 * single leaked link from being hammered in a loop. If these routes ever become
 * genuinely public, swap the Map for Upstash/Vercel KV.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

// Opportunistic sweep so the map can't grow without bound on a long-lived instance.
function sweep(now: number) {
  if (buckets.size < 5_000) return;
  for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  sweep(now);
  const b = buckets.get(key);
  if (!b || b.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }
  b.count += 1;
  if (b.count > limit) {
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - b.count, retryAfterSec: 0 };
}

/** Best-effort client IP behind Vercel's proxy. */
export function clientIp(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  return (xff ? xff.split(",")[0] : headers.get("x-real-ip") ?? "unknown").trim();
}
