const PHONE_DISPLAY = "(360) 843-5566";
const PHONE = "3608435566";

const cities = ["Elma", "Aberdeen", "Hoquiam", "Montesano", "Ocean Shores", "Westport", "McCleary", "Cosmopolis", "Oakville", "+ surrounding areas"];

export default function Footer() {
  return (
    <footer className="bg-navy px-6 md:px-14" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      {/* City strip */}
      <div className="py-5 border-b flex flex-wrap gap-x-5 gap-y-1" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        {cities.map((city, i) => (
          <span key={i} className="text-xs font-display font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>
            {city}
          </span>
        ))}
      </div>

      <div className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="font-display text-xl font-bold" style={{ color: "#6B9FE4" }}>Elma</span>
              <span className="font-display text-xl font-bold text-white">Digital</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
              Locally owned digital services for Grays Harbor County businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-label mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>Services</p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <li>Logo &amp; Print Design</li>
              <li>Website Design</li>
              <li>Custom Software</li>
            </ul>
          </div>

          {/* Contact / NAP */}
          <div>
            <p className="text-label mb-4" style={{ color: "rgba(255,255,255,0.2)" }}>Contact</p>
            <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <li>
                <a href={`tel:${PHONE}`} className="hover:text-white transition-colors">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href="mailto:erikjbahena@gmail.com" className="hover:text-white transition-colors">
                  erikjbahena@gmail.com
                </a>
              </li>
              <li>Elma, WA 98541</li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} Elma Digital · Elma, WA · Serving Grays Harbor County
          </p>
          <p className="text-xs font-display font-medium" style={{ color: "rgba(255,255,255,0.15)" }}>
            Go Eagles
          </p>
        </div>
      </div>
    </footer>
  );
}
