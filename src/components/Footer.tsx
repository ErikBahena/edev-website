export default function Footer() {
  return (
    <footer className="bg-navy border-t px-6 md:px-10 py-10" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold" style={{ color: "#6B9FE4" }}>Elma</span>
          <span className="font-display text-lg font-bold text-white">Digital</span>
          <span className="text-white/20 mx-2">·</span>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Elma, WA</span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          &copy; {new Date().getFullYear()} Elma Digital. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
