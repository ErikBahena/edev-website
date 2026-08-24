import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/lead — the public contact form.
 *
 * Why this exists: every path to Erik was call/text/email. Ads showed four
 * "conversions" that were tel: taps — a tap opens the dialer, it does not
 * place a call — and the phone never rang. A form captures the person who is
 * interested but not ready to talk to a stranger.
 *
 * A submission lands in the CRM Erik already has: a `clients` row (status
 * 'lead') plus an `interactions` note holding the message verbatim. Nothing
 * new to check — it appears at /admin alongside everything else.
 *
 * Notification is pluggable: if RESEND_API_KEY + LEAD_NOTIFY_EMAIL are set the
 * lead is emailed immediately; if not it is still stored and nothing fails.
 * Storage is the source of truth; email is a convenience.
 *
 * Abuse: honeypot + per-IP rate limit + length caps. No CAPTCHA — at this
 * volume it would cost more real leads than the spam it stops.
 */

const MAX = { name: 120, contact: 254, message: 2000, business: 160 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function looksLikePhone(v: string): boolean {
  return (v.match(/\d/g) || []).length >= 7;
}

export async function POST(req: NextRequest) {
  try {
    // 5 submissions per IP per hour. A real person sends one.
    const rl = rateLimit(`lead:${clientIp(req.headers)}`, 5, 60 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Give it a few minutes." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
      );
    }

    const body = await req.json();

    // Honeypot: a field hidden from humans. Anything in it is a bot.
    // Return 200 so the bot believes it worked and doesn't retry.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const contact = String(body.contact ?? "").trim();
    const message = String(body.message ?? "").trim();
    const source = String(body.source ?? "").trim().slice(0, 60) || "website";

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Please add your name and a phone number or email." },
        { status: 400 },
      );
    }
    if (name.length > MAX.name || contact.length > MAX.contact || message.length > MAX.message) {
      return NextResponse.json({ error: "That's longer than expected." }, { status: 400 });
    }

    const isEmail = EMAIL_RE.test(contact);
    const isPhone = looksLikePhone(contact);
    if (!isEmail && !isPhone) {
      return NextResponse.json(
        { error: "That doesn't look like a phone number or an email address." },
        { status: 400 },
      );
    }

    const sb = createAdminClient();
    const now = new Date().toISOString();

    // business_name is NOT NULL in the schema; the form deliberately doesn't
    // ask for it (three fields convert far better than five), so fall back to
    // the person's name until Erik fills it in.
    const { data: client, error: clientErr } = await sb
      .from("clients")
      .insert({
        name,
        business_name: String(body.business ?? "").trim().slice(0, MAX.business) || name,
        email: isEmail ? contact : null,
        phone: !isEmail && isPhone ? contact : null,
        first_contacted_at: now,
        status: "lead",
        notes: `Website form — ${source}`,
      })
      .select("id")
      .single();

    if (clientErr || !client) {
      console.error("[/api/lead] client insert failed:", clientErr?.message);
      return NextResponse.json(
        { error: "Could not save that. Please call or text instead." },
        { status: 500 },
      );
    }

    await sb.from("interactions").insert({
      client_id: client.id,
      type: "note",
      occurred_at: now,
      summary: `New website enquiry from ${name}`,
      notes: [
        `Source page: ${source}`,
        `Contact:     ${contact}`,
        ``,
        message || "(no message left)",
      ].join("\n"),
    });

    // Optional immediate notification. Missing key = silently skipped.
    const key = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_NOTIFY_EMAIL;
    if (key && to) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Elma Digital <leads@elmadigital.io>",
            to: [to],
            reply_to: isEmail ? contact : undefined,
            subject: `New enquiry - ${name}`,
            text: [
              name,
              contact,
              `From: ${source}`,
              ``,
              message || "(no message left)",
              ``,
              `https://www.elmadigital.io/admin/clients/${client.id}`,
            ].join("\n"),
          }),
        });
      } catch (e) {
        // Never fail the submission because email failed — it is already saved.
        console.error("[/api/lead] notify failed:", e instanceof Error ? e.message : e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/lead] unexpected:", err);
    return NextResponse.json({ error: "Something went wrong. Please call or text." }, { status: 500 });
  }
}
