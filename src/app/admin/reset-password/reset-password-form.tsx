"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Phase = "checking" | "ready" | "invalid" | "submitting" | "done";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // On mount, verify we have a recovery session from the email magic link.
  // Supabase JS auto-reads the URL hash and establishes a session.
  useEffect(() => {
    const supabase = createClient();

    // Wait briefly for Supabase to process the URL hash, then check session
    const check = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setPhase(session ? "ready" : "invalid");
    };

    // Listen for PASSWORD_RECOVERY event (fires after URL hash is parsed)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY" || session) {
          setPhase("ready");
        }
      }
    );

    // Also check immediately in case session is already set
    check();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setPhase("submitting");

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
      setPhase("ready");
      return;
    }

    setPhase("done");
    setTimeout(() => {
      router.push("/admin");
      router.refresh();
    }, 1500);
  }

  if (phase === "checking") {
    return <p className="text-text-muted text-sm">Verifying link…</p>;
  }

  if (phase === "invalid") {
    return (
      <div className="space-y-4">
        <div className="bg-white border border-border rounded-lg p-5">
          <p className="text-sm text-navy leading-relaxed">
            This reset link is invalid or has expired. Request a new one.
          </p>
        </div>
        <Link
          href="/admin/forgot-password"
          className="btn-primary w-full px-6 py-3 text-sm inline-flex"
        >
          Request new link
        </Link>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="bg-white border border-border rounded-lg p-5">
        <p className="text-sm text-navy">
          Password updated. Redirecting to admin…
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
          className="w-full px-4 py-3 bg-white border border-border rounded font-display text-sm focus:outline-none focus:border-navy"
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
        disabled={phase === "submitting"}
        className="btn-primary w-full px-6 py-3 text-sm disabled:opacity-50"
      >
        {phase === "submitting" ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}
