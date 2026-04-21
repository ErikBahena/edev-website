import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "../nav";
import {
  CLIENT_STATUS_LABELS,
  type Client,
  type ClientStatus,
} from "@/lib/types";
import StatusBadge from "./status-badge";

export const metadata = {
  title: "Clients · Elma Digital Admin",
  robots: { index: false, follow: false },
};

export default async function ClientsListPage() {
  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("updated_at", { ascending: false });

  const list = (clients ?? []) as Client[];

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-label text-accent mb-3">Clients</p>
            <h1 className="text-heading font-display text-navy">All clients.</h1>
          </div>
          <Link
            href="/admin/clients/new"
            className="btn-primary px-6 py-3 text-sm"
          >
            + New client
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <p className="font-display font-semibold text-navy text-lg mb-2">
              No clients yet.
            </p>
            <p className="text-text-muted text-sm mb-6">
              Add your first one and start logging interactions.
            </p>
            <Link
              href="/admin/clients/new"
              className="btn-primary px-6 py-3 text-sm inline-flex"
            >
              + New client
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_1.5fr_1fr_auto] gap-4 px-6 py-4 border-b border-border text-label text-accent font-medium">
              <span>Client</span>
              <span>Business</span>
              <span>Status</span>
              <span>Location</span>
              <span>First contact</span>
              <span aria-hidden="true" className="w-5" />
            </div>

            {/* Rows */}
            <ul>
              {list.map((c) => (
                <li key={c.id} className="border-b border-border last:border-0">
                  <Link
                    href={`/admin/clients/${c.id}`}
                    className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_1.5fr_1fr_auto] gap-y-1 md:gap-4 items-center px-6 py-5 hover:bg-bg transition-colors group"
                  >
                    <span className="font-display font-semibold text-navy group-hover:text-blue transition-colors">
                      {c.name}
                    </span>
                    <span className="text-sm text-text-muted font-medium">
                      {c.business_name}
                    </span>
                    <span>
                      <StatusBadge status={c.status} />
                    </span>
                    <span className="text-sm text-text-muted">
                      {[c.city, c.state].filter(Boolean).join(", ") || "—"}
                    </span>
                    <span className="text-sm text-text-muted">
                      {c.first_contacted_at
                        ? new Date(c.first_contacted_at).toLocaleDateString()
                        : "—"}
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden md:block text-text-muted group-hover:text-navy transition-colors text-lg leading-none"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-3 text-xs text-text-muted">
          {(Object.keys(CLIENT_STATUS_LABELS) as ClientStatus[]).map(
            (status) => (
              <div key={status} className="flex items-center gap-1.5">
                <StatusBadge status={status} />
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}
