import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyReserveToken } from "@/lib/reserve-token";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * POST /api/reserve
 *
 * Body: { signerName, signerTitle, signerEmail, signerPhone,
 *         businessName, industry, city, state,
 *         scopeNotes, contractAmountCents, signatureTyped, agreedAt }
 *
 * Effect:
 *   1. Validates required fields.
 *   2. Creates a `clients` row (status='lead') with the signer's contact info.
 *   3. Creates a `projects` row in 'scoping' state with the signed amount.
 *   4. Creates an `interactions` note recording the signing event + full
 *      engagement letter text and the typed signature.
 *
 * Returns: { agreementId, message }
 *
 * Auth: requires a valid signed invite token (body.token) minted from the
 * admin — see src/lib/reserve-token.ts. Without one this is a 404, same as any
 * route that doesn't exist. Rate limited per IP as a floor against a leaked
 * link being replayed in a loop.
 */
const MAX = { name: 120, title: 80, email: 254, phone: 40, biz: 160, city: 80, state: 40, industry: 80, scope: 4000, sig: 120 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    // 20 signing attempts per IP per hour is generous for a human, hostile to a loop.
    const rl = rateLimit(`reserve:${clientIp(req.headers)}`, 20, 60 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json({ error: "Too many requests." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } });
    }

    const body = await req.json();

    // Invite gate. Deliberately a 404 — don't advertise that the route exists.
    const claims = verifyReserveToken(typeof body.token === "string" ? body.token : null);
    if (!claims) {
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const required = [
      "signerName",
      "signerEmail",
      "businessName",
      "scopeNotes",
      "contractAmountCents",
      "signatureTyped",
      "agreedToTerms",
    ];
    for (const k of required) {
      if (!body[k]) {
        return NextResponse.json(
          { error: `Missing required field: ${k}` },
          { status: 400 },
        );
      }
    }

    if (body.agreedToTerms !== true) {
      return NextResponse.json(
        { error: "You must agree to the engagement terms to sign." },
        { status: 400 },
      );
    }

    if (
      typeof body.signatureTyped !== "string" ||
      body.signatureTyped.trim().toLowerCase() !==
        String(body.signerName).trim().toLowerCase()
    ) {
      return NextResponse.json(
        {
          error:
            "Typed signature must exactly match the signer name (case-insensitive).",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_RE.test(String(body.signerEmail))) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // Length caps: these go straight into DB text columns and into an
    // interactions note. Nothing here should be a novel.
    const tooLong =
      String(body.signerName).length > MAX.name ||
      String(body.signerTitle ?? "").length > MAX.title ||
      String(body.signerEmail).length > MAX.email ||
      String(body.signerPhone ?? "").length > MAX.phone ||
      String(body.businessName).length > MAX.biz ||
      String(body.city ?? "").length > MAX.city ||
      String(body.state ?? "").length > MAX.state ||
      String(body.industry ?? "").length > MAX.industry ||
      String(body.scopeNotes).length > MAX.scope ||
      String(body.signatureTyped).length > MAX.sig;
    if (tooLong) {
      return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
    }

    const contractAmount = Number(body.contractAmountCents);
    // Floor $10k, ceiling $250k — anything outside that band is a typo or a probe.
    if (!Number.isInteger(contractAmount) || contractAmount < 1_000_000 || contractAmount > 25_000_000) {
      return NextResponse.json(
        { error: "Contract amount must be between $10,000 and $250,000." },
        { status: 400 },
      );
    }

    const sb = createAdminClient();
    const signedAt = new Date().toISOString();

    // 1. clients row
    const { data: client, error: clientErr } = await sb
      .from("clients")
      .insert({
        name: body.signerName,
        business_name: body.businessName,
        email: body.signerEmail,
        phone: body.signerPhone ?? null,
        city: body.city ?? null,
        state: body.state ?? null,
        industry: body.industry ?? null,
        first_contacted_at: signedAt,
        status: "lead",
        notes: `Signed engagement letter via /reserve on ${signedAt}. Title: ${body.signerTitle ?? "—"}. Invite: ${claims.label || "(unlabeled)"}.`,
      })
      .select("id")
      .single();
    if (clientErr || !client) {
      return NextResponse.json(
        { error: `Could not save client: ${clientErr?.message}` },
        { status: 500 },
      );
    }

    // 2. projects row
    const { data: project, error: projectErr } = await sb
      .from("projects")
      .insert({
        client_id: client.id,
        name: `${body.businessName} — Custom Software Engagement (signed via /reserve)`,
        status: "scoping",
        project_fee_cents: contractAmount,
        notes: body.scopeNotes,
      })
      .select("id")
      .single();
    if (projectErr || !project) {
      return NextResponse.json(
        { error: `Could not save project: ${projectErr?.message}` },
        { status: 500 },
      );
    }

    // 3. interactions note — captures the full agreement text and signature
    const dollars = (contractAmount / 100).toLocaleString("en-US");
    const agreementBody = [
      `=== ENGAGEMENT LETTER (executed via elmadigital.io/reserve) ===`,
      ``,
      `Signed at:           ${signedAt}`,
      `Signed by:           ${body.signerName}, ${body.signerTitle ?? "—"}`,
      `On behalf of:        ${body.businessName}`,
      `Signer email:        ${body.signerEmail}`,
      `Signer phone:        ${body.signerPhone ?? "—"}`,
      `Location:            ${[body.city, body.state].filter(Boolean).join(", ") || "—"}`,
      `Industry:            ${body.industry ?? "—"}`,
      ``,
      `Contract amount:     $${dollars} USD`,
      ``,
      `Scope summary (signer's words):`,
      body.scopeNotes,
      ``,
      `Typed signature:     "${body.signatureTyped}"`,
      `Affirmation:         Signer confirmed agreement to engagement terms.`,
      `Counter-signature:   Pre-signed by Erik Bahena, EDEV — terms posted at`,
      `                     elmadigital.io/reserve (Erik electronically pre-`,
      `                     signed by publishing the offer to accept these`,
      `                     terms at this price).`,
    ].join("\n");

    const { error: noteErr } = await sb.from("interactions").insert({
      client_id: client.id,
      project_id: project.id,
      type: "note",
      occurred_at: signedAt,
      summary: `Engagement letter SIGNED via /reserve — $${dollars}`,
      notes: agreementBody,
    });
    if (noteErr) {
      // Non-fatal: client + project rows already exist. Log but continue.
      console.error("Failed to save interaction note:", noteErr);
    }

    return NextResponse.json({
      agreementId: project.id,
      message: "Engagement signed. Erik will reach out within 24 hours.",
    });
  } catch (err) {
    console.error("[/api/reserve] unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected error processing signature." },
      { status: 500 },
    );
  }
}
