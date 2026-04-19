"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createInvoiceAction } from "./actions";

type LineItem = { description: string; amount: string; quantity: string };

const EMPTY_LINE: LineItem = { description: "", amount: "", quantity: "1" };

export default function NewInvoiceForm({
  clientId,
  onClose,
}: {
  clientId: string;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [lines, setLines] = useState<LineItem[]>([{ ...EMPTY_LINE }]);

  const total = lines.reduce((sum, l) => {
    const amt = parseFloat(l.amount || "0");
    const qty = parseInt(l.quantity || "1", 10);
    return (
      sum + (isNaN(amt) ? 0 : amt) * (isNaN(qty) ? 1 : Math.max(1, qty))
    );
  }, 0);

  function update(i: number, patch: Partial<LineItem>) {
    setLines((prev) =>
      prev.map((l, idx) => (idx === i ? { ...l, ...patch } : l))
    );
  }

  function addLine() {
    setLines((prev) => [...prev, { ...EMPTY_LINE }]);
  }

  function removeLine(i: number) {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }

  function submit(action: "draft" | "send") {
    return (formData: FormData) => {
      setError(null);
      formData.set("action", action);
      startTransition(async () => {
        const result = await createInvoiceAction(clientId, formData);
        if (!result.ok) {
          setError(result.error);
          return;
        }
        router.refresh();
        onClose?.();
      });
    };
  }

  return (
    <form className="space-y-5">
      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Invoice description
        </label>
        <input
          type="text"
          name="description"
          placeholder="e.g. PaintMate — Phase 2 scope"
          className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
        />
      </div>

      {/* Line items */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-display font-medium text-text-muted">
            Line items <span className="text-amber">*</span>
          </label>
          <button
            type="button"
            onClick={addLine}
            className="text-xs font-display font-medium text-blue hover:text-blue-dark"
          >
            + Add line
          </button>
        </div>

        <div className="space-y-2">
          {lines.map((line, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_100px_80px_auto] gap-2 items-start"
            >
              <input
                type="text"
                name={`line_description_${i}`}
                value={line.description}
                onChange={(e) => update(i, { description: e.target.value })}
                placeholder="Description"
                className="px-3 py-2 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
              />
              <input
                type="number"
                name={`line_amount_${i}`}
                value={line.amount}
                onChange={(e) => update(i, { amount: e.target.value })}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="px-3 py-2 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
              />
              <input
                type="number"
                name={`line_qty_${i}`}
                value={line.quantity}
                onChange={(e) => update(i, { quantity: e.target.value })}
                min="1"
                className="px-3 py-2 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
              />
              <button
                type="button"
                onClick={() => removeLine(i)}
                disabled={lines.length === 1}
                className="px-2 py-2 text-xs text-text-muted hover:text-[#c23030] disabled:opacity-30"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-3 mt-3 border-t border-border">
          <span className="text-xs text-text-muted mr-3">Total</span>
          <span className="font-display font-bold text-navy text-lg">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Due date
        </label>
        <input
          type="date"
          name="due_date"
          defaultValue={(() => {
            const d = new Date();
            d.setDate(d.getDate() + 30);
            return d.toISOString().slice(0, 10);
          })()}
          className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
        />
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Internal memo (not shown to client)
        </label>
        <textarea
          name="memo"
          rows={2}
          className="w-full px-4 py-3 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy resize-y"
        />
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          formAction={submit("send")}
          disabled={pending}
          className="btn-primary px-6 py-2.5 text-sm disabled:opacity-50"
        >
          {pending ? "Working…" : "Create & send"}
        </button>
        <button
          type="submit"
          formAction={submit("draft")}
          disabled={pending}
          className="btn-outline-dark px-6 py-2.5 text-sm disabled:opacity-50"
        >
          Save as draft
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            className="ml-auto text-xs font-display font-medium text-text-muted hover:text-navy"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
