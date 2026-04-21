import {
  INVOICE_STATUS_LABELS,
  type InvoiceStatus,
} from "@/lib/types";

const STYLES: Record<InvoiceStatus, { bg: string; color: string }> = {
  draft: { bg: "rgba(107,114,128,0.15)", color: "#4b5563" },
  open: { bg: "rgba(var(--accent-rgb),0.12)", color: "var(--accent)" },
  paid: { bg: "rgba(10,125,59,0.12)", color: "#0a7d3b" },
  uncollectible: { bg: "rgba(194,48,48,0.12)", color: "#c23030" },
  void: { bg: "rgba(107,114,128,0.10)", color: "#9ca3af" },
};

export default function InvoiceStatusBadge({
  status,
}: {
  status: InvoiceStatus;
}) {
  const s = STYLES[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-display font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {INVOICE_STATUS_LABELS[status]}
    </span>
  );
}

export function formatCents(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}
