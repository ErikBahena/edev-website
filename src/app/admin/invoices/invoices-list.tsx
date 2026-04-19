"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import type { Invoice } from "@/lib/types";
import InvoiceStatusBadge, { formatCents } from "./status-badge";
import {
  refreshInvoiceAction,
  sendInvoiceAction,
  voidInvoiceAction,
} from "./actions";

export default function InvoicesList({
  invoices,
  showClient = false,
  clientNames,
}: {
  invoices: Invoice[];
  showClient?: boolean;
  clientNames?: Record<string, { name: string; business_name: string }>;
}) {
  if (invoices.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <p className="text-text-muted text-sm">No invoices yet.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {invoices.map((inv) => (
        <InvoiceRow
          key={inv.id}
          invoice={inv}
          showClient={showClient}
          clientMeta={clientNames?.[inv.client_id]}
        />
      ))}
    </ul>
  );
}

function InvoiceRow({
  invoice,
  showClient,
  clientMeta,
}: {
  invoice: Invoice;
  showClient?: boolean;
  clientMeta?: { name: string; business_name: string };
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

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

  const canSend = invoice.status === "draft";
  const canVoid =
    invoice.status === "draft" ||
    invoice.status === "open" ||
    invoice.status === "uncollectible";

  return (
    <li className="bg-white rounded-2xl border border-border p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <InvoiceStatusBadge status={invoice.status} />
            {showClient && clientMeta && (
              <span className="text-xs font-display font-medium text-text-muted">
                {clientMeta.business_name} · {clientMeta.name}
              </span>
            )}
            <span className="text-xs text-text-muted">
              {new Date(invoice.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="font-display font-semibold text-navy text-base mb-1">
            {invoice.description || "—"}
          </p>
          <div className="text-sm text-text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display font-bold text-navy">
              {formatCents(invoice.amount_total_cents, invoice.currency)}
            </span>
            {invoice.due_date && (
              <span>
                Due {new Date(invoice.due_date).toLocaleDateString()}
              </span>
            )}
            {invoice.line_items.length > 1 && (
              <span>
                {invoice.line_items.length} line items
              </span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <p
          className="text-xs font-medium mb-2"
          style={{ color: "#c23030" }}
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-border">
        {invoice.stripe_hosted_invoice_url && (
          <a
            href={invoice.stripe_hosted_invoice_url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-display font-medium text-blue hover:text-blue-dark"
          >
            View hosted &rarr;
          </a>
        )}
        {invoice.stripe_invoice_pdf && (
          <a
            href={invoice.stripe_invoice_pdf}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-display font-medium text-blue hover:text-blue-dark"
          >
            PDF &rarr;
          </a>
        )}
        {canSend && (
          <button
            disabled={pending}
            onClick={() =>
              run(
                () => sendInvoiceAction(invoice.id),
                "Finalize and email this invoice to the client?"
              )
            }
            className="text-xs font-display font-medium text-navy hover:text-blue disabled:opacity-50"
          >
            Send now
          </button>
        )}
        <button
          disabled={pending}
          onClick={() => run(() => refreshInvoiceAction(invoice.id))}
          className="text-xs font-display font-medium text-text-muted hover:text-navy disabled:opacity-50"
        >
          {pending ? "Working…" : "Refresh from Stripe"}
        </button>
        {canVoid && (
          <button
            disabled={pending}
            onClick={() =>
              run(
                () => voidInvoiceAction(invoice.id),
                invoice.status === "draft"
                  ? "Delete this draft invoice?"
                  : "Void this invoice? This cannot be undone."
              )
            }
            className="text-xs font-display font-medium ml-auto disabled:opacity-50"
            style={{ color: "#c23030" }}
          >
            {invoice.status === "draft" ? "Delete" : "Void"}
          </button>
        )}
      </div>
    </li>
  );
}
