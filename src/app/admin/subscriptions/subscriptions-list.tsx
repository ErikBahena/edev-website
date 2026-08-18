"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Subscription } from "@/lib/types";
import SubscriptionStatusBadge, { formatRecurring } from "./status-badge";
import {
  cancelSubscriptionAction,
  deleteSubscriptionAction,
  refreshSubscriptionAction,
  resumeSubscriptionAction,
} from "./actions";

export default function SubscriptionsList({
  subscriptions,
  showClient = false,
  clientNames,
}: {
  subscriptions: Subscription[];
  showClient?: boolean;
  clientNames?: Record<string, { name: string; business_name: string }>;
}) {
  if (subscriptions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <p className="text-text-muted text-sm">No recurring billing set up.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {subscriptions.map((sub) => (
        <SubscriptionRow
          key={sub.id}
          subscription={sub}
          showClient={showClient}
          clientMeta={clientNames?.[sub.client_id]}
        />
      ))}
    </ul>
  );
}

function SubscriptionRow({
  subscription: sub,
  showClient,
  clientMeta,
}: {
  subscription: Subscription;
  showClient?: boolean;
  clientMeta?: { name: string; business_name: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function run(fn: () => Promise<void>, confirmMsg?: string) {
    if (confirmMsg && !confirm(confirmMsg)) return;
    setError(null);
    startTransition(async () => {
      try {
        await fn();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Action failed.");
      }
    });
  }

  async function copyLink(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy — open the link and copy it manually.");
    }
  }

  const awaitingSetup = sub.status === "incomplete" && !!sub.checkout_url;
  const isLive =
    sub.status === "active" ||
    sub.status === "trialing" ||
    sub.status === "past_due";
  const neverStarted = !sub.stripe_subscription_id;

  return (
    <li className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <SubscriptionStatusBadge status={sub.status} />
            {showClient && clientMeta && (
              <span className="text-xs font-display font-medium text-text-muted">
                {clientMeta.business_name} · {clientMeta.name}
              </span>
            )}
            {sub.cancel_at_period_end && (
              <span className="text-xs font-display font-medium" style={{ color: "#c23030" }}>
                Ends at period end
              </span>
            )}
          </div>
          <p className="font-display font-semibold text-navy text-base mb-1">
            {sub.description}
          </p>
          <div className="text-sm text-text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display font-bold text-navy">
              {formatRecurring(
                sub.amount_cents,
                sub.billing_interval,
                sub.interval_count,
                sub.currency
              )}
            </span>
            {sub.current_period_end && isLive && (
              <span>
                {sub.cancel_at_period_end ? "Ends" : "Renews"}{" "}
                {new Date(sub.current_period_end).toLocaleDateString()}
              </span>
            )}
            {sub.started_at && (
              <span>
                Started {new Date(sub.started_at).toLocaleDateString()}
              </span>
            )}
          </div>
          {sub.memo && (
            <p className="text-xs text-text-muted mt-2 italic">{sub.memo}</p>
          )}
        </div>
      </div>

      {awaitingSetup && (
        <div
          className="rounded-xl p-3 mb-3 text-xs"
          style={{ background: "rgba(var(--accent-rgb),0.08)" }}
        >
          <p className="text-navy font-display font-medium mb-1">
            Send this link to the client to start billing.
          </p>
          <p className="text-text-muted">
            Nothing is charged until they enter payment details. After that,
            Stripe bills them automatically every {sub.billing_interval}.
          </p>
        </div>
      )}

      {error && (
        <p className="text-xs font-medium mb-2" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-border">
        {awaitingSetup && sub.checkout_url && (
          <>
            <button
              onClick={() => copyLink(sub.checkout_url!)}
              className="text-xs font-display font-medium text-blue hover:text-blue-dark"
            >
              {copied ? "Copied!" : "Copy payment link"}
            </button>
            <a
              href={sub.checkout_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-display font-medium text-blue hover:text-blue-dark"
            >
              Open link &rarr;
            </a>
          </>
        )}

        <button
          disabled={pending}
          onClick={() => run(() => refreshSubscriptionAction(sub.id))}
          className="text-xs font-display font-medium text-text-muted hover:text-navy disabled:opacity-50"
        >
          {pending ? "Working…" : "Refresh from Stripe"}
        </button>

        {isLive && sub.cancel_at_period_end && (
          <button
            disabled={pending}
            onClick={() => run(() => resumeSubscriptionAction(sub.id))}
            className="text-xs font-display font-medium text-navy hover:text-blue disabled:opacity-50"
          >
            Keep it running
          </button>
        )}

        {isLive && !sub.cancel_at_period_end && (
          <button
            disabled={pending}
            onClick={() =>
              run(
                () => cancelSubscriptionAction(sub.id, false),
                "Stop billing at the end of the current period? The client keeps access through what they've paid for."
              )
            }
            className="text-xs font-display font-medium ml-auto disabled:opacity-50"
            style={{ color: "#c23030" }}
          >
            Cancel at period end
          </button>
        )}

        {neverStarted && sub.status !== "canceled" && (
          <button
            disabled={pending}
            onClick={() =>
              run(
                () => deleteSubscriptionAction(sub.id),
                "Delete this pending subscription? The payment link stops working."
              )
            }
            className="text-xs font-display font-medium ml-auto disabled:opacity-50"
            style={{ color: "#c23030" }}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
