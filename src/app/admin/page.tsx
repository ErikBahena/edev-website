import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "./nav";
import { CLIENT_STATUS_LABELS, type ClientStatus } from "@/lib/types";

export const metadata = {
  title: "Admin · Elma Digital",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const supabase = await createClient();

  // Pull client counts grouped by status
  const { data: clients } = await supabase
    .from("clients")
    .select("id, status");

  const totalClients = clients?.length ?? 0;
  const statusCounts = (clients ?? []).reduce(
    (acc, c) => {
      const s = c.status as ClientStatus;
      acc[s] = (acc[s] ?? 0) + 1;
      return acc;
    },
    {} as Record<ClientStatus, number>
  );

  // Recent interactions count (last 30 days)
  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();
  const { count: recentInteractions } = await supabase
    .from("interactions")
    .select("*", { count: "exact", head: true })
    .gte("occurred_at", thirtyDaysAgo);

  // Active projects
  const { count: activeProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .in("status", ["scoping", "in_progress", "maintenance"]);

  const statusOrder: ClientStatus[] = [
    "lead",
    "active",
    "completed",
    "on_hold",
    "churned",
  ];

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="mb-12">
          <p className="text-label text-amber mb-3">Overview</p>
          <h1 className="text-heading font-display text-navy">Dashboard.</h1>
        </div>

        {/* Top stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <StatCard label="Total Clients" value={totalClients} />
          <StatCard
            label="Active Projects"
            value={activeProjects ?? 0}
          />
          <StatCard
            label="Interactions (30d)"
            value={recentInteractions ?? 0}
          />
        </div>

        {/* Client breakdown by status */}
        <section className="bg-white rounded-2xl border border-border p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-navy text-lg">
              Clients by status
            </h2>
            <Link
              href="/admin/clients"
              className="text-sm font-display font-medium text-blue hover:text-blue-dark"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {statusOrder.map((status) => (
              <div key={status}>
                <p className="text-xs text-text-muted font-medium mb-1">
                  {CLIENT_STATUS_LABELS[status]}
                </p>
                <p className="font-display font-bold text-navy text-3xl">
                  {statusCounts[status] ?? 0}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-border">
      <p className="text-label text-amber mb-4">{label}</p>
      <p className="font-display font-bold text-navy text-5xl">{value}</p>
    </div>
  );
}
