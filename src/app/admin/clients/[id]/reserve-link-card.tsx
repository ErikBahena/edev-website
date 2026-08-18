"use client";

import { useState, useTransition } from "react";
import { createReserveLinkAction } from "../reserve-link-actions";

export default function ReserveLinkCard({ clientId }: { clientId: string }) {
  const [pending, start] = useTransition();
  const [url, setUrl] = useState<string | null>(null);
  const [expires, setExpires] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function mint() {
    setError(null);
    start(async () => {
      const r = await createReserveLinkAction(clientId);
      if (!r.ok) { setError(r.error); return; }
      setUrl(r.url); setExpires(r.expiresAt);
    });
  }

  async function copy() {
    if (!url) return;
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { setError("Couldn't copy — select the link and copy it manually."); }
  }

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <p className="text-xs text-text-muted mb-1">Engagement letter</p>
      <p className="text-xs text-text-muted mb-3">
        Send this after a discovery call. Link is private, expires in 14 days,
        and lets the client sign and pay the 30% deposit.
      </p>
      {!url ? (
        <button onClick={mint} disabled={pending} className="btn-primary px-4 py-2 text-xs disabled:opacity-50">
          {pending ? "Creating…" : "Create signing link"}
        </button>
      ) : (
        <div className="space-y-2">
          <div className="bg-bg rounded-xl border border-border p-2.5">
            <p className="text-[11px] text-navy break-all font-mono">{url}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={copy} className="btn-primary px-4 py-1.5 text-xs">{copied ? "Copied!" : "Copy link"}</button>
            {expires && <span className="text-xs text-text-muted">Expires {new Date(expires).toLocaleDateString()}</span>}
          </div>
        </div>
      )}
      {error && <p className="text-xs mt-2" style={{ color: "#c23030" }}>{error}</p>}
    </div>
  );
}
