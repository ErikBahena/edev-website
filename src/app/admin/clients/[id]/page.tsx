import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminNav from "../../nav";
import StatusBadge from "../status-badge";
import ClientForm from "../client-form";
import AddInteractionForm from "./add-interaction-form";
import InteractionsList from "./interactions-list";
import DeleteClientButton from "./delete-client-button";
import ClientInvoicesSection from "./client-invoices-section";
import { updateClientAction } from "../actions";
import type { Client, Interaction, Invoice } from "@/lib/types";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("clients")
    .select("name, business_name")
    .eq("id", id)
    .single();

  return {
    title: data
      ? `${data.name} (${data.business_name}) · Admin`
      : "Client · Admin",
    robots: { index: false, follow: false },
  };
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) {
    notFound();
  }

  const typedClient = client as Client;

  const { data: interactions } = await supabase
    .from("interactions")
    .select("*")
    .eq("client_id", id)
    .order("occurred_at", { ascending: false });

  const typedInteractions = (interactions ?? []) as Interaction[];

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const typedInvoices = (invoices ?? []) as Invoice[];

  // Pre-bind the client id so the form action only needs formData
  const updateAction = updateClientAction.bind(null, id);

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/admin/clients"
            className="text-sm font-display font-medium text-text-muted hover:text-navy inline-block mb-4"
          >
            &larr; All clients
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <p className="text-label text-amber">
                  {typedClient.industry || "Client"}
                </p>
                <StatusBadge status={typedClient.status} />
              </div>
              <h1 className="text-heading font-display text-navy">
                {typedClient.name}
              </h1>
              <p className="text-body-lg text-text-muted mt-1">
                {typedClient.business_name}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-text-muted">
              {typedClient.email && (
                <a
                  href={`mailto:${typedClient.email}`}
                  className="hover:text-navy"
                >
                  {typedClient.email}
                </a>
              )}
              {typedClient.phone && (
                <a
                  href={`tel:${typedClient.phone}`}
                  className="hover:text-navy"
                >
                  {typedClient.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-start">
          {/* Left: interactions timeline */}
          <section>
            <div className="bg-white rounded-2xl border border-border p-8">
              <h2 className="font-display font-semibold text-navy text-lg mb-6">
                Log an interaction
              </h2>
              <AddInteractionForm clientId={typedClient.id} />
            </div>

            <div className="mt-10">
              <h2 className="font-display font-semibold text-navy text-lg mb-6">
                Timeline
                <span className="text-text-muted font-normal ml-2 text-sm">
                  {typedInteractions.length}{" "}
                  {typedInteractions.length === 1 ? "entry" : "entries"}
                </span>
              </h2>
              <InteractionsList
                interactions={typedInteractions}
                clientId={typedClient.id}
              />
            </div>

            <div className="mt-12 pt-10 border-t border-border">
              <ClientInvoicesSection
                clientId={typedClient.id}
                invoices={typedInvoices}
                clientHasEmail={!!typedClient.email}
              />
            </div>
          </section>

          {/* Right: client info edit */}
          <aside className="lg:w-[420px] w-full">
            <div className="bg-white rounded-2xl border border-border p-8">
              <h2 className="font-display font-semibold text-navy text-lg mb-6">
                Client details
              </h2>
              <ClientForm
                initialValues={typedClient}
                action={updateAction}
                submitLabel="Save changes"
                cancelHref="/admin/clients"
              />

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs text-text-muted mb-3">Danger zone</p>
                <DeleteClientButton
                  id={typedClient.id}
                  name={typedClient.name}
                />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
