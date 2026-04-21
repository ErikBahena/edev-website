"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  INTERACTION_TYPE_LABELS,
  type InteractionType,
} from "@/lib/types";
import { addInteractionAction } from "../actions";

export default function AddInteractionForm({ clientId }: { clientId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Default the occurred_at field to current local datetime
  const now = new Date();
  const defaultDatetime = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await addInteractionAction(clientId, formData);
        formRef.current?.reset();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to add interaction.");
      }
    });
  }

  return (
    <form ref={formRef} action={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-[200px_1fr] gap-4">
        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            Type
          </label>
          <select
            name="type"
            defaultValue="note"
            className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
          >
            {(Object.keys(INTERACTION_TYPE_LABELS) as InteractionType[]).map(
              (t) => (
                <option key={t} value={t}>
                  {INTERACTION_TYPE_LABELS[t]}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            When
          </label>
          <input
            type="datetime-local"
            name="occurred_at"
            defaultValue={defaultDatetime}
            className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Summary <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          name="summary"
          required
          placeholder="Called to review scope for herd app"
          className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
        />
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Longer details…"
          className="w-full px-4 py-3 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy resize-y"
        />
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
      >
        {pending ? "Adding…" : "+ Add entry"}
      </button>
    </form>
  );
}
