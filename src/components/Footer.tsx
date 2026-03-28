export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-bold text-text">EDEV</span>
          <span className="text-text-dim">·</span>
          <span className="text-text-muted text-sm">
            Custom software for local businesses
          </span>
        </div>

        <p className="text-text-dim text-sm">
          &copy; {new Date().getFullYear()} EDEV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
