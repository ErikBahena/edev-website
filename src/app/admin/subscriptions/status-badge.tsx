import {
  SUBSCRIPTION_STATUS_LABELS,
  type SubscriptionStatus,
} from "@/lib/types";

const STYLES: Record<SubscriptionStatus, { bg: string; color: string }> = {
  incomplete: { bg: "rgba(var(--accent-rgb),0.12)", color: "var(--accent)" },
  incomplete_expired: { bg: "rgba(107,114,128,0.10)", color: "#9ca3af" },
  trialing: { bg: "rgba(37,99,235,0.12)", color: "#2563eb" },
  active: { bg: "rgba(10,125,59,0.12)", color: "#0a7d3b" },
  past_due: { bg: "rgba(194,48,48,0.12)", color: "#c23030" },
  canceled: { bg: "rgba(107,114,128,0.10)", color: "#9ca3af" },
  unpaid: { bg: "rgba(194,48,48,0.12)", color: "#c23030" },
  paused: { bg: "rgba(107,114,128,0.15)", color: "#4b5563" },
};

export default function SubscriptionStatusBadge({
  status,
}: {
  status: SubscriptionStatus;
}) {
  const s = STYLES[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-display font-medium"
      style={{ background: s.bg, color: s.color }}
    >
      {SUBSCRIPTION_STATUS_LABELS[status]}
    </span>
  );
}

/** "$50.00/month" or "$120.00 every 3 months" */
export function formatRecurring(
  cents: number,
  interval: string,
  intervalCount: number,
  currency = "usd"
): string {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);

  return intervalCount === 1
    ? `${amount}/${interval}`
    : `${amount} every ${intervalCount} ${interval}s`;
}
