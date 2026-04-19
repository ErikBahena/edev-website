"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push(redirect);
    router.refresh();
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

      <div>
        <label className="block text-xs font-display font-medium text-text-muted mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
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
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <Link
        href="/admin/forgot-password"
        className="block text-center text-xs font-display font-medium text-text-muted hover:text-navy"
      >
        Forgot password?
      </Link>
    </form>
  );
}
