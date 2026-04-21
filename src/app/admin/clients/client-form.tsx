"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CLIENT_STATUS_LABELS,
  type Client,
  type ClientStatus,
} from "@/lib/types";

type Props = {
  initialValues?: Partial<Client>;
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  cancelHref: string;
};

export default function ClientForm({
  initialValues = {},
  action,
  submitLabel,
  cancelHref,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await action(formData);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  const firstContact = initialValues.first_contacted_at
    ? new Date(initialValues.first_contacted_at).toISOString().slice(0, 10)
    : "";

  return (
    <form action={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-5">
        <Field
          label="Contact name"
          name="name"
          required
          defaultValue={initialValues.name ?? ""}
        />
        <Field
          label="Business name"
          name="business_name"
          required
          defaultValue={initialValues.business_name ?? ""}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          defaultValue={initialValues.email ?? ""}
        />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={initialValues.phone ?? ""}
        />
        <Field
          label="City"
          name="city"
          defaultValue={initialValues.city ?? ""}
        />
        <Field
          label="State"
          name="state"
          defaultValue={initialValues.state ?? ""}
        />
        <Field
          label="Industry"
          name="industry"
          defaultValue={initialValues.industry ?? ""}
          placeholder="e.g. Residential Painting"
        />
        <Field
          label="First contacted"
          name="first_contacted_at"
          type="date"
          defaultValue={firstContact}
        />
        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            Status
          </label>
          <select
            name="status"
            defaultValue={initialValues.status ?? "lead"}
            className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
          >
            {(Object.keys(CLIENT_STATUS_LABELS) as ClientStatus[]).map((s) => (
              <option key={s} value={s}>
                {CLIENT_STATUS_LABELS[s]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          rows={5}
          defaultValue={initialValues.notes ?? ""}
          className="w-full px-4 py-3 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy resize-y"
          placeholder="Anything to remember about this client — their pain points, preferences, how they found you, etc."
        />
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-primary px-6 py-3 text-sm disabled:opacity-50"
        >
          {pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href={cancelHref}
          className="btn-outline-dark px-6 py-3 text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-display font-medium text-text-muted mb-2">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
      />
    </div>
  );
}
