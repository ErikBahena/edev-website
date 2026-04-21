import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";
import ChangePasswordForm from "./change-password-form";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/invoices", label: "Invoices" },
];

export default async function AdminNav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link
            href="/admin"
            className="font-display font-bold text-navy text-lg"
          >
            Elma Digital
            <span className="text-accent ml-2 text-xs font-medium uppercase tracking-wider">
              Admin
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-sm font-medium text-text-muted hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden md:block text-xs text-text-muted">
            {user?.email}
          </span>
          <ChangePasswordForm />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
