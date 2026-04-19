"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setPassword("");
    setConfirm("");
    setLoading(false);
    setTimeout(() => {
      setSuccess(false);
      setOpen(false);
    }, 2500);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="btn-outline-dark px-5 py-2 text-xs"
      >
        Change password
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-border rounded-2xl p-6 w-full max-w-sm space-y-4"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-navy text-sm">
          Change password
        </h3>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setError(null);
            setPassword("");
            setConfirm("");
          }}
          className="text-text-muted text-xs hover:text-navy"
        >
          Cancel
        </button>
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          New password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
          className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
        />
      </div>

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Confirm password
        </label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          autoComplete="new-password"
          minLength={8}
          className="w-full px-4 py-2.5 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
        />
      </div>

      {error && (
        <p className="text-xs font-medium" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      {success && (
        <p className="text-xs font-medium" style={{ color: "#0a7d3b" }}>
          Password updated.
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full px-5 py-2.5 text-xs disabled:opacity-50"
      >
        {loading ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
