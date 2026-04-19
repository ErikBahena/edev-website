import ResetPasswordForm from "./reset-password-form";

export const metadata = {
  title: "Set New Password · Elma Digital",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-label text-amber mb-3">Elma Digital</p>
          <h1 className="text-heading font-display text-navy">
            New password.
          </h1>
          <p className="text-text-muted text-sm mt-3">
            Choose a strong password you haven&apos;t used before.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </main>
  );
}
