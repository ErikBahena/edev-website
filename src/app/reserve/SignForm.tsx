"use client";

import { useState } from "react";

const PRESETS = [
  { label: "Discovery + Discovery package ($10k)", cents: 1_000_000 },
  { label: "Mid-scope build ($25k)", cents: 2_500_000 },
  { label: "Standard $50k engagement", cents: 5_000_000 },
  { label: "Enterprise scope ($75k)", cents: 7_500_000 },
];

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "ok"; agreementId: string }
  | { kind: "paying" }
  | { kind: "error"; message: string };

export default function SignForm({ token }: { token: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [signerName, setSignerName] = useState("");
  const [signerTitle, setSignerTitle] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [signerPhone, setSignerPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [scopeNotes, setScopeNotes] = useState("");
  const [contractAmountCents, setContractAmountCents] = useState(5_000_000);
  const [signatureTyped, setSignatureTyped] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/reserve", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          signerName,
          signerTitle,
          signerEmail,
          signerPhone,
          businessName,
          industry,
          city,
          state: stateField,
          scopeNotes,
          contractAmountCents,
          signatureTyped,
          agreedToTerms,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setState({ kind: "error", message: json.error ?? "Submission failed." });
        return;
      }
      setState({ kind: "ok", agreementId: json.agreementId });
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error.",
      });
    }
  }

  async function payDeposit(agreementId: string) {
    setState({ kind: "paying" });
    try {
      const res = await fetch("/api/reserve/pay", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ agreementId, signerEmail, token }),
      });
      const json = await res.json();
      if (!res.ok || !json.hostedInvoiceUrl) {
        setState({
          kind: "error",
          message: json.error ?? "Could not create deposit invoice.",
        });
        return;
      }
      // Redirect to Stripe's hosted invoice page
      window.location.href = json.hostedInvoiceUrl;
    } catch (err) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Network error.",
      });
    }
  }

  if (state.kind === "ok" || state.kind === "paying") {
    const depositCents = Math.round((contractAmountCents * 30) / 100);
    const agreementId = state.kind === "ok" ? state.agreementId : "";
    return (
      <div
        className="rounded-2xl p-8"
        style={{
          background: "rgba(var(--accent-rgb),0.08)",
          border: "1px solid rgba(var(--accent-rgb),0.35)",
        }}
      >
        <h3
          className="font-display font-bold text-white mb-3"
          style={{ fontSize: "1.75rem" }}
        >
          Signed and recorded.
        </h3>
        <p className="text-white/75 mb-4" style={{ lineHeight: 1.7 }}>
          Your engagement is on file. Last step to make this a fully-paid
          binding deal: pay the 30% deposit via Stripe now. We&rsquo;ll
          generate a real Stripe invoice ($
          {(depositCents / 100).toLocaleString()}) and take you to the
          hosted payment page.
        </p>
        <p
          className="text-sm font-mono mb-6"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Agreement ID: {agreementId}
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => agreementId && payDeposit(agreementId)}
            disabled={state.kind === "paying"}
            className="btn-primary px-6 py-3 text-sm disabled:opacity-50"
          >
            {state.kind === "paying"
              ? "Generating Stripe invoice…"
              : `Pay $${(depositCents / 100).toLocaleString()} deposit via Stripe →`}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-ghost px-6 py-3 text-sm"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          >
            Print / Save as PDF
          </button>
          <a
            href={`mailto:erik@elmadigital.io?subject=Signed%20engagement%20${encodeURIComponent(agreementId)}&body=Hi%20Erik%20-%20I%20just%20signed%20engagement%20${encodeURIComponent(agreementId)}%20on%20elmadigital.io%2Freserve.`}
            className="btn-ghost px-6 py-3 text-sm"
            style={{ color: "white", borderColor: "rgba(255,255,255,0.3)" }}
          >
            Email Erik a copy
          </a>
        </div>

        <p
          className="mt-6 text-xs"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          Not ready to pay right now? No problem — Erik will follow up with the
          Stripe invoice manually. Either way, your engagement is signed and on
          file.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg px-4 py-3 text-white placeholder-white/30 font-body text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500/40";
  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.12)",
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 print:hidden">
      <fieldset className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-label text-white/60 block mb-2">
            Your full legal name
          </label>
          <input
            required
            type="text"
            className={inputClass}
            style={inputStyle}
            value={signerName}
            onChange={(e) => setSignerName(e.target.value)}
            placeholder="Jane M. Smith"
          />
        </div>
        <div>
          <label className="text-label text-white/60 block mb-2">
            Your title at the company
          </label>
          <input
            required
            type="text"
            className={inputClass}
            style={inputStyle}
            value={signerTitle}
            onChange={(e) => setSignerTitle(e.target.value)}
            placeholder="Owner / President / CFO"
          />
        </div>
      </fieldset>

      <fieldset className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-label text-white/60 block mb-2">Email</label>
          <input
            required
            type="email"
            className={inputClass}
            style={inputStyle}
            value={signerEmail}
            onChange={(e) => setSignerEmail(e.target.value)}
            placeholder="you@yourcompany.com"
          />
        </div>
        <div>
          <label className="text-label text-white/60 block mb-2">Phone</label>
          <input
            type="tel"
            className={inputClass}
            style={inputStyle}
            value={signerPhone}
            onChange={(e) => setSignerPhone(e.target.value)}
            placeholder="(360) 555-0100"
          />
        </div>
      </fieldset>

      <fieldset className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-label text-white/60 block mb-2">
            Company / business name
          </label>
          <input
            required
            type="text"
            className={inputClass}
            style={inputStyle}
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            placeholder="Acme Dairy LLC"
          />
        </div>
        <div>
          <label className="text-label text-white/60 block mb-2">Industry</label>
          <input
            type="text"
            className={inputClass}
            style={inputStyle}
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Dairy farming"
          />
        </div>
        <div className="grid grid-cols-[1fr_5rem] gap-3">
          <div>
            <label className="text-label text-white/60 block mb-2">City</label>
            <input
              type="text"
              className={inputClass}
              style={inputStyle}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Adna"
            />
          </div>
          <div>
            <label className="text-label text-white/60 block mb-2">State</label>
            <input
              type="text"
              className={inputClass}
              style={inputStyle}
              value={stateField}
              onChange={(e) => setStateField(e.target.value)}
              placeholder="WA"
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label className="text-label text-white/60 block mb-2">
          Engagement tier
        </label>
        <div className="grid sm:grid-cols-2 gap-2">
          {PRESETS.map((p) => (
            <button
              type="button"
              key={p.cents}
              onClick={() => setContractAmountCents(p.cents)}
              className="text-left rounded-lg px-4 py-3 text-sm font-display font-medium transition"
              style={{
                background:
                  contractAmountCents === p.cents
                    ? "rgba(var(--accent-rgb),0.18)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  contractAmountCents === p.cents
                    ? "rgba(var(--accent-rgb),0.5)"
                    : "rgba(255,255,255,0.12)"
                }`,
                color:
                  contractAmountCents === p.cents
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.8)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-label text-white/60 block mb-2">
          What we&rsquo;re building (your words — short paragraph)
        </label>
        <textarea
          required
          rows={5}
          className={inputClass}
          style={inputStyle}
          value={scopeNotes}
          onChange={(e) => setScopeNotes(e.target.value)}
          placeholder="Custom herd management for our 250-cow operation — replacing AfiFarm. Mobile access for vets and crew. Inspector-ready reports. Organic-transition record-keeping."
        />
      </div>

      <div
        className="rounded-xl p-5"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 w-5 h-5 accent-yellow-500"
          />
          <span
            className="text-sm"
            style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.6 }}
          >
            I have read and agree to the engagement terms above. I have
            authority to sign on behalf of {businessName || "my company"} and
            understand that this is a binding letter of engagement subject to
            the deposit invoice issued by EDEV within 5 business days.
          </span>
        </label>
      </div>

      <div>
        <label className="text-label text-white/60 block mb-2">
          Type your full legal name as your signature (must match the name
          above)
        </label>
        <input
          required
          type="text"
          className={`${inputClass} font-display`}
          style={{
            ...inputStyle,
            fontStyle: "italic",
            fontSize: "1.25rem",
            letterSpacing: "0.02em",
          }}
          value={signatureTyped}
          onChange={(e) => setSignatureTyped(e.target.value)}
          placeholder="Jane M. Smith"
        />
        <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          By typing your name above and submitting this form, you are signing
          this engagement letter electronically under the ESIGN Act and UETA.
        </p>
      </div>

      {state.kind === "error" && (
        <div
          className="rounded-lg p-4 text-sm"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.4)",
            color: "rgb(252,165,165)",
          }}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={state.kind === "submitting" || !agreedToTerms}
        className="btn-primary px-8 py-4 text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.kind === "submitting"
          ? "Recording signature…"
          : `Sign & execute — $${(contractAmountCents / 100).toLocaleString()}`}
      </button>
    </form>
  );
}
