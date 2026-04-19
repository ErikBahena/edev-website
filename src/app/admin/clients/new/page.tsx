import AdminNav from "../../nav";
import ClientForm from "../client-form";
import { createClientAction } from "../actions";

export const metadata = {
  title: "New Client · Elma Digital Admin",
  robots: { index: false, follow: false },
};

export default function NewClientPage() {
  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-12">
        <div className="mb-10">
          <p className="text-label text-amber mb-3">Clients</p>
          <h1 className="text-heading font-display text-navy">New client.</h1>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 md:p-10">
          <ClientForm
            action={createClientAction}
            submitLabel="Create client"
            cancelHref="/admin/clients"
          />
        </div>
      </main>
    </div>
  );
}
