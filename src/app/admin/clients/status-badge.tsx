import { CLIENT_STATUS_LABELS, type ClientStatus } from "@/lib/types";

const STYLES: Record<ClientStatus, { bg: string; color: string }> = {
  lead: { bg: "rgba(196,136,42,0.12)", color: "#C4882A" },
  active: { bg: "rgba(3,76,178,0.12)", color: "#034CB2" },
  completed: { bg: "rgba(10,125,59,0.12)", color: "#0a7d3b" },
  on_hold: { bg: "rgba(107,114,128,0.15)", color: "#4b5563" },
  churned: { bg: "rgba(194,48,48,0.12)", color: "#c23030" },
};

export default function StatusBadge({ status }: { status: ClientStatus }) {
  const style = STYLES[status];
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-display font-medium"
      style={{ background: style.bg, color: style.color }}
    >
      {CLIENT_STATUS_LABELS[status]}
    </span>
  );
}
