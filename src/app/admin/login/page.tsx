import { Suspense } from "react";
import LoginForm from "./login-form";

export const metadata = {
  title: "Admin Login · Elma Digital",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-label text-accent mb-3">Elma Digital</p>
          <h1 className="text-heading font-display text-navy">Admin.</h1>
        </div>
        <Suspense fallback={<div className="text-text-muted text-sm">Loading…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
