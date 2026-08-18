"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createSubscriptionAction } from "./actions";

const PRESETS = [
  { label: "Maintenance — $50/mo", description: "Monthly maintenance", amount: "50" },
  { label: "Maintenance — $150/mo", description: "Monthly maintenance", amount: "150" },
  { label: "Maintenance — $250/mo", description: "Monthly maintenance", amount: "250" },
];

export default function NewSubscriptionForm({
  clientId,
  projects,
  onClose,
}: {
  clientId: string;
  projects?: { id: string; name: string }[];
  onClose?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  function submit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await createSubscriptionAction(clientId, formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setCheckoutUrl(result.checkoutUrl);
      router.refresh();
    });
  }

  async function copyLink() {
    if (!checkoutUrl) return;
    try {
      await navigator.clipboard.writeText(checkoutUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy — select the link and copy it manually.");
    }
  }

  // Once created, the form becomes a hand-off screen for the payment link.
  if (checkoutUrl) {
    return (
      <div className="space-y-4">
        <div>
          <p className="font-display font-semibold text-navy text-base mb-1">
            Payment link ready
          </p>
          <p className="text-xs text-text-muted">
            Send this to the client. Nothing is charged until they enter payment
            details — after that Stripe bills them automatically each period and
            the invoices show up here on their own.
          </p>
        </div>

        <div className="bg-bg rounded-xl border border-border p-3">
          <p className="text-xs text-navy break-all font-mono">{checkoutUrl}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={copyLink}
            className="btn-primary px-5 py-2 text-xs"
          >
            {copied ? "Copied!" : "Copy link"}
          </button>
          <a
            href={checkoutUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-display font-medium text-blue hover:text-blue-dark"
          >
            Preview it &rarr;
          </a>
          <button
            type="button"
            onClick={() => onClose?.()}
            className="text-xs font-display font-medium text-text-muted hover:text-navy ml-auto"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={submit} className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setDescription(p.description);
              setAmount(p.amount);
            }}
            className="text-xs font-display font-medium px-3 py-1.5 rounded-full border border-border text-text-muted hover:text-navy hover:border-navy transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          What are they paying for?
        </label>
        <input
          type="text"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. HerdLife maintenance"
          className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-navy"
        />
        <p className="text-xs text-text-muted mt-1.5">
          This is what the client sees on their receipt every period.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            Amount (USD)
          </label>
          <input
            type="number"
            name="amount"
            required
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50.00"
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-navy"
          />
        </div>
        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            Billed every
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="interval_count"
              min="1"
              defaultValue="1"
              className="w-16 px-3 py-2.5 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-navy"
            />
            <select
              name="billing_interval"
              defaultValue="month"
              className="flex-1 px-3 py-2.5 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-navy"
            >
              <option value="month">month</option>
              <option value="year">year</option>
              <option value="week">week</option>
              <option value="day">day</option>
            </select>
          </div>
        </div>
      </div>

      {projects && projects.length > 0 && (
        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            Project (optional)
          </label>
          <select
            name="project_id"
            defaultValue=""
            className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-navy"
          >
            <option value="">— none —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Internal memo (optional)
        </label>
        <input
          type="text"
          name="memo"
          placeholder="Never shown to the client"
          className="w-full px-4 py-2.5 rounded-xl border border-border text-sm text-navy focus:outline-none focus:border-navy"
        />
      </div>

      {error && (
        <p className="text-xs font-medium" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary px-5 py-2.5 text-xs disabled:opacity-50"
        >
          {pending ? "Creating…" : "Create payment link"}
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-display font-medium text-text-muted hover:text-navy"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
