import ForgotPasswordForm from "./forgot-password-form";

export const metadata = {
  title: "Reset Password · Elma Digital",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <p className="text-label text-accent mb-3">Elma Digital</p>
          <h1 className="text-heading font-display text-navy">Reset.</h1>
          <p className="text-text-muted text-sm mt-3">
            Enter your email and we&apos;ll send you a link to set a new
            password.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
