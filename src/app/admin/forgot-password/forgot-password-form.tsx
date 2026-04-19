"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      }
    );

    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-border rounded-lg p-5">
          <p className="text-sm text-navy leading-relaxed">
            Check <span className="font-semibold">{email}</span> for a link to
            reset your password. The link expires in 1 hour.
          </p>
        </div>
        <Link
          href="/admin/login"
          className="block text-xs font-display font-medium text-text-muted hover:text-navy"
        >
          &larr; Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className="w-full px-4 py-3 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
        />
      </div>

      {error && (
        <p className="text-sm font-medium" style={{ color: "#c23030" }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full px-6 py-3 text-sm disabled:opacity-50"
      >
        {loading ? "Sending…" : "Send reset link"}
      </button>

      <Link
        href="/admin/login"
        className="block text-center text-xs font-display font-medium text-text-muted hover:text-navy"
      >
        &larr; Back to login
      </Link>
    </form>
  );
}
