import { createClient } from "@/lib/supabase/server";
import AdminNav from "../nav";
import InvoicesList from "./invoices-list";
import { formatCents } from "./status-badge";
import type { Client, Invoice, InvoiceStatus } from "@/lib/types";

export const metadata = {
  title: "Invoices · Elma Digital Admin",
  robots: { index: false, follow: false },
};

export default async function InvoicesPage() {
  const supabase = await createClient();

  const { data: invoicesRaw } = await supabase
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });

  const invoices = (invoicesRaw ?? []) as Invoice[];

  // Fetch client meta for display
  const clientIds = [...new Set(invoices.map((i) => i.client_id))];
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

  // Top-line stats
  const totalInvoiced = invoices
    .filter((i) => i.status !== "draft" && i.status !== "void")
    .reduce((s, i) => s + i.amount_total_cents, 0);
  const totalPaid = invoices
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + i.amount_total_cents, 0);
  const totalOutstanding = invoices
    .filter((i) => i.status === "open")
    .reduce((s, i) => s + i.amount_total_cents, 0);

  const byStatus = invoices.reduce(
    (acc, i) => {
      acc[i.status] = (acc[i.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<InvoiceStatus, number>
  );

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-label text-amber mb-3">Invoices</p>
          <h1 className="text-heading font-display text-navy">All invoices.</h1>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard
            label="Outstanding"
            value={formatCents(totalOutstanding)}
            hint={`${byStatus.open ?? 0} open`}
          />
          <StatCard
            label="Paid"
            value={formatCents(totalPaid)}
            hint={`${byStatus.paid ?? 0} paid`}
          />
          <StatCard
            label="Total invoiced"
            value={formatCents(totalInvoiced)}
            hint={`${invoices.length} total`}
          />
        </div>

        <InvoicesList
          invoices={invoices}
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
      <p className="text-label text-amber mb-3">{label}</p>
      <p className="font-display font-bold text-navy text-3xl mb-1">{value}</p>
      <p className="text-xs text-text-muted">{hint}</p>
    </div>
  );
}
