import { createClient } from "@/lib/supabase/server";
import AdminNav from "../nav";
import SubscriptionsList from "./subscriptions-list";
import { formatCents } from "../invoices/status-badge";
import {
  LIVE_SUBSCRIPTION_STATUSES,
  monthlyValueCents,
  type Client,
  type Subscription,
} from "@/lib/types";

export const metadata = {
  title: "Recurring · Elma Digital Admin",
  robots: { index: false, follow: false },
};

export default async function SubscriptionsPage() {
  const supabase = await createClient();

  const { data: subsRaw } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  const subscriptions = (subsRaw ?? []) as Subscription[];

  const clientIds = [...new Set(subscriptions.map((s) => s.client_id))];
  const { data: clientsRaw } =
    clientIds.length > 0
      ? await supabase
          .from("clients")
          .select("id, name, business_name")
          .in("id", clientIds)
      : { data: [] };

  const clientMap: Record<string, { name: string; business_name: string }> = {};
  for (const c of (clientsRaw ?? []) as Pick<
    Client,
    "id" | "name" | "business_name"
  >[]) {
    clientMap[c.id] = { name: c.name, business_name: c.business_name };
  }

  const live = subscriptions.filter((s) =>
    LIVE_SUBSCRIPTION_STATUSES.includes(s.status)
  );
  const mrr = live.reduce((sum, s) => sum + monthlyValueCents(s), 0);
  const awaitingSetup = subscriptions.filter(
    (s) => s.status === "incomplete"
  ).length;
  const needsAttention = subscriptions.filter(
    (s) => s.status === "past_due" || s.status === "unpaid"
  ).length;

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-label text-accent mb-3">Recurring</p>
          <h1 className="text-heading font-display text-navy">
            Monthly revenue.
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="MRR"
            value={formatCents(mrr)}
            hint={`${live.length} active ${live.length === 1 ? "plan" : "plans"}`}
          />
          <StatCard
            label="Annual run rate"
            value={formatCents(mrr * 12)}
            hint="At today's active plans"
          />
          <StatCard
            label="Needs attention"
            value={String(needsAttention + awaitingSetup)}
            hint={`${awaitingSetup} awaiting setup · ${needsAttention} past due`}
          />
        </div>

        <SubscriptionsList
          subscriptions={subscriptions}
          showClient
          clientNames={clientMap}
        />
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6">
      <p className="text-label text-accent mb-3">{label}</p>
      <p className="font-display font-bold text-navy text-3xl mb-1">{value}</p>
      <p className="text-xs text-text-muted">{hint}</p>
    </div>
  );
}
