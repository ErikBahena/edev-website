"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  INTERACTION_TYPE_LABELS,
  type Interaction,
  type InteractionType,
} from "@/lib/types";
import {
  deleteInteractionAction,
  updateInteractionAction,
} from "../actions";

const TYPE_STYLES: Record<InteractionType, { bg: string; color: string }> = {
  call: { bg: "rgba(3,76,178,0.10)", color: "#034CB2" },
  email: { bg: "rgba(196,136,42,0.12)", color: "#C4882A" },
  meeting: { bg: "rgba(10,125,59,0.12)", color: "#0a7d3b" },
  text: { bg: "rgba(107,114,128,0.15)", color: "#4b5563" },
  work: { bg: "rgba(13,27,62,0.08)", color: "#0D1B3E" },
  note: { bg: "rgba(107,114,128,0.10)", color: "#6b7280" },
};

export default function InteractionsList({
  interactions,
  clientId,
}: {
  interactions: Interaction[];
  clientId: string;
}) {
  if (interactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center">
        <p className="text-text-muted text-sm">
          No interactions logged yet. Add one above.
        </p>
      </div>
    );
  }

  return (
    <ol className="space-y-4">
      {interactions.map((entry) => (
        <InteractionItem key={entry.id} entry={entry} clientId={clientId} />
      ))}
    </ol>
  );
}

function InteractionItem({
  entry,
  clientId,
}: {
  entry: Interaction;
  clientId: string;
}) {
  const [editing, setEditing] = useState(false);
  return editing ? (
    <InteractionEditForm
      entry={entry}
      clientId={clientId}
      onCancel={() => setEditing(false)}
      onSaved={() => setEditing(false)}
    />
  ) : (
    <InteractionDisplay
      entry={entry}
      clientId={clientId}
      onEdit={() => setEditing(true)}
    />
  );
}

function InteractionDisplay({
  entry,
  clientId,
  onEdit,
}: {
  entry: Interaction;
  clientId: string;
  onEdit: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const style = TYPE_STYLES[entry.type];

  function onDelete() {
    if (!confirm("Delete this interaction?")) return;
    startTransition(async () => {
      await deleteInteractionAction(entry.id, clientId);
      router.refresh();
    });
  }

  return (
    <li className="bg-white rounded-2xl border border-border p-6">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-display font-medium"
            style={{ background: style.bg, color: style.color }}
          >
            {INTERACTION_TYPE_LABELS[entry.type]}
          </span>
          <span className="text-xs text-text-muted font-medium">
            {new Date(entry.occurred_at).toLocaleString([], {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onEdit}
            disabled={pending}
            className="text-xs text-text-muted hover:text-navy font-display font-medium disabled:opacity-50"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={pending}
            className="text-xs text-text-muted font-display font-medium hover:text-[#c23030] disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </div>
      <p className="font-display font-semibold text-navy text-base mb-1">
        {entry.summary}
      </p>
      {entry.notes && (
        <p className="text-sm text-text-muted leading-relaxed whitespace-pre-wrap mt-2">
          {entry.notes}
        </p>
      )}
    </li>
  );
}

function InteractionEditForm({
  entry,
  clientId,
  onCancel,
  onSaved,
}: {
  entry: Interaction;
  clientId: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Format occurred_at as local datetime for input[type=datetime-local]
  const occurred = new Date(entry.occurred_at);
  const occurredLocal = new Date(
    occurred.getTime() - occurred.getTimezoneOffset() * 60000
  )
    .toISOString()
    .slice(0, 16);

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      try {
        await updateInteractionAction(entry.id, clientId, formData);
        router.refresh();
        onSaved();
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to save.");
      }
    });
  }

  return (
    <li className="bg-white rounded-2xl border-2 border-blue p-6">
      <form action={onSubmit} className="space-y-4">
        <div className="grid md:grid-cols-[200px_1fr] gap-4">
          <div>
            <label className="block text-xs font-display font-medium text-text-muted mb-2">
              Type
            </label>
            <select
              name="type"
              defaultValue={entry.type}
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
              defaultValue={occurredLocal}
              className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-display font-medium text-text-muted mb-2">
            Summary <span className="text-amber">*</span>
          </label>
          <input
            type="text"
            name="summary"
            required
            defaultValue={entry.summary}
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
            defaultValue={entry.notes ?? ""}
            className="w-full px-4 py-3 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy resize-y"
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
            className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={pending}
            className="btn-outline-dark px-6 py-2.5 text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </li>
  );
}
