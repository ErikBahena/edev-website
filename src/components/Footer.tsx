const PHONE_DISPLAY = "(360) 843-5566";
const PHONE = "3608435566";

export default function Footer() {
  return (
    <footer className="bg-navy px-6 md:px-10 py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-display text-xl font-bold" style={{ color: "#6B9FE4" }}>Elma</span>
              <span className="font-display text-xl font-bold text-white">Digital</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
              Locally owned digital services for Grays Harbor County businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-label text-white/30 mb-4">Services</p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li>Logo &amp; Print Design</li>
              <li>Website Design</li>
              <li>Custom Software</li>
            </ul>
          </div>

          {/* Contact / NAP */}
          <div>
            <p className="text-label text-white/30 mb-4">Contact</p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href="mailto:erik@elmadigital.io" className="hover:text-white transition-colors">
                  erik@elmadigital.io
                </a>
              </li>
              <li>Elma, WA 98541</li>
              <li style={{ color: "rgba(255,255,255,0.3)" }}>Mon – Fri, 9am – 5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            &copy; {new Date().getFullYear()} Elma Digital · Elma, WA · Serving Grays Harbor County
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Go Eagles 🦅
          </p>
        </div>
      </div>
    </footer>
  );
}
