"use client";

import { useState } from "react";
import type { Subscription } from "@/lib/types";
import SubscriptionsList from "../../subscriptions/subscriptions-list";
import NewSubscriptionForm from "../../subscriptions/new-subscription-form";

export default function ClientSubscriptionsSection({
  clientId,
  subscriptions,
  projects,
  clientHasEmail,
}: {
  clientId: string;
  subscriptions: Subscription[];
  projects?: { id: string; name: string }[];
  clientHasEmail: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-navy text-lg">
          Recurring billing
          <span className="text-text-muted font-normal ml-2 text-sm">
            {subscriptions.length}
            {subscriptions.length === 1 ? " plan" : " plans"}
          </span>
        </h2>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            disabled={!clientHasEmail}
            title={
              clientHasEmail
                ? "Set up a recurring charge"
                : "Add the client's email first."
            }
            className="btn-primary px-5 py-2 text-xs disabled:opacity-50"
          >
            + New plan
          </button>
        )}
      </div>

      {!clientHasEmail && !open && (
        <p className="text-xs text-text-muted mb-4">
          Add an email address to the client before setting up recurring billing.
        </p>
      )}

      {open && (
        <div className="bg-white rounded-2xl border border-border p-6 mb-6">
          <NewSubscriptionForm
            clientId={clientId}
            projects={projects}
            onClose={() => setOpen(false)}
          />
        </div>
      )}

      <SubscriptionsList subscriptions={subscriptions} />
    </div>
  );
}
