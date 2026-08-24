"use client";

import { useState } from "react";

/**
 * Three-field lead form. Deliberately three: research on landing-page forms
 * puts three-field conversion around 10% against roughly 3.6% at nine fields,
 * so every extra box has to earn its place. Name, one way to reach you, and
 * what you need — Erik can ask the rest on the call.
 *
 * On success it fires the Google Ads conversion and a Clarity event. A form
 * submit is a far better signal than a tel: tap (which only opens a dialer),
 * so this is the conversion the campaign should actually optimise toward.
 *
 * Labels sit above the inputs and stay visible — placeholder-only labels
 * disappear the moment you type, which is a known problem for older users,
 * and this audience skews 65+.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

type Props = {
  /** Which page this sits on — recorded on the lead and used for reporting. */
  source: string;
  /** Dark hero backgrounds vs light page sections. */
  onDark?: boolean;
  heading?: string;
  blurb?: string;
};

export default function LeadForm({
  source,
  onDark = false,
  heading = "Tell me what you need",
  blurb = "I'll get back to you the same day. No pitch, no pressure.",
}: Props) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const fg = onDark ? "rgba(255,255,255,0.92)" : "var(--navy)";
  const muted = onDark ? "rgba(255,255,255,0.6)" : "var(--text-muted)";
  const line = onDark ? "rgba(255,255,255,0.22)" : "var(--border)";
  const field = onDark ? "rgba(255,255,255,0.07)" : "#fff";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          contact: fd.get("contact"),
          message: fd.get("message"),
          website: fd.get("website"), // honeypot
          source,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please call or text.");
        setState("error");
        return;
      }
      // A completed form is the real conversion — report it as such.
      const label = process.env.NEXT_PUBLIC_ADS_CONV_FORM;
      window.gtag?.("event", "lead_form_submit", { source });
      if (label) window.gtag?.("event", "conversion", { send_to: label, event_label: source });
      window.clarity?.("event", "lead_form_submit");
      window.clarity?.("set", "converted", "form");
      window.clarity?.("upgrade", "lead_form_submit");
      setState("done");
    } catch {
      setError("Something went wrong. Please call or text.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div
        className="rounded-2xl p-7"
        style={{ border: `1px solid ${line}`, background: field }}
      >
        <p className="font-display font-semibold text-xl mb-2" style={{ color: fg }}>
          Got it — thank you.
        </p>
        <p className="text-base" style={{ color: muted }}>
          I&rsquo;ll get back to you today. If it&rsquo;s urgent, call or text{" "}
          <a
            href="tel:3608435566"
            className="font-display font-semibold underline underline-offset-4"
            style={{ color: fg }}
          >
            (360) 843-5566
          </a>
          .
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    border: `1px solid ${line}`,
    background: field,
    color: fg,
    fontSize: "1.0625rem", // 17px — never triggers iOS zoom-on-focus, and readable
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="mb-5">
        <h3 className="font-display font-semibold text-2xl mb-1" style={{ color: fg }}>
          {heading}
        </h3>
        <p className="text-base" style={{ color: muted }}>
          {blurb}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="lf-name" className="block font-display font-medium mb-1.5" style={{ color: fg }}>
            Your name
          </label>
          <input
            id="lf-name"
            name="name"
            required
            autoComplete="name"
            maxLength={120}
            className="w-full rounded-xl px-4 py-3.5 outline-none focus:ring-2"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="lf-contact" className="block font-display font-medium mb-1.5" style={{ color: fg }}>
            Phone or email
          </label>
          <input
            id="lf-contact"
            name="contact"
            required
            inputMode="text"
            autoComplete="tel"
            maxLength={254}
            className="w-full rounded-xl px-4 py-3.5 outline-none focus:ring-2"
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="lf-message" className="block font-display font-medium mb-1.5" style={{ color: fg }}>
            What do you need? <span style={{ color: muted, fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            id="lf-message"
            name="message"
            rows={3}
            maxLength={2000}
            className="w-full rounded-xl px-4 py-3.5 outline-none focus:ring-2 resize-y"
            style={inputStyle}
          />
        </div>

        {/* Honeypot — hidden from people, catnip for bots. */}
        <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
          <label htmlFor="lf-website">Website</label>
          <input id="lf-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        {error && (
          <p className="text-sm font-medium" style={{ color: "#ff8a8a" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={state === "sending"}
          className="btn-primary w-full px-7 py-4 text-base disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Send it"}
        </button>

        <p className="text-sm text-center" style={{ color: muted }}>
          Or call/text{" "}
          <a href="tel:3608435566" className="font-display font-semibold underline underline-offset-4" style={{ color: fg }}>
            (360) 843-5566
          </a>
        </p>
      </div>
    </form>
  );
}
