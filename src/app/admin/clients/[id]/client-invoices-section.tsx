"use client";

import { useState } from "react";
import type { Invoice } from "@/lib/types";
import InvoicesList from "../../invoices/invoices-list";
import NewInvoiceForm from "../../invoices/new-invoice-form";

export default function ClientInvoicesSection({
  clientId,
  invoices,
  clientHasEmail,
}: {
  clientId: string;
  invoices: Invoice[];
  clientHasEmail: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-navy text-lg">
          Invoices
          <span className="text-text-muted font-normal ml-2 text-sm">
            {invoices.length}
            {invoices.length === 1 ? " invoice" : " invoices"}
          </span>
        </h2>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            disabled={!clientHasEmail}
            title={
              clientHasEmail
                ? "Create a new invoice"
                : "Add the client's email first."
            }
            className="btn-primary px-5 py-2 text-xs disabled:opacity-50"
          >
            + New invoice
          </button>
        )}
      </div>

      {!clientHasEmail && !open && (
        <p className="text-xs text-text-muted mb-4">
          Add an email address to the client before sending invoices.
        </p>
      )}

      {open && (
        <div className="bg-white rounded-2xl border border-border p-6 mb-6">
          <NewInvoiceForm
            clientId={clientId}
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      <InvoicesList invoices={invoices} />
    </div>
  );
}
