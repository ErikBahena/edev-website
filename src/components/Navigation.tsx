"use client";

import { useEffect, useRef, useState } from "react";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 60);
      setVisible(current < 60 || current < lastScroll.current);
      lastScroll.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        style={{ background: scrolled ? "var(--border)" : "rgba(255,255,255,0.1)" }} />

      <div className={`px-6 md:px-14 h-16 md:h-18 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-white/98 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}>

        {/* Wordmark */}
        <a href="#" className="font-display text-xl md:text-2xl font-bold tracking-tight flex items-center gap-0.5">
          <span className="text-blue">Elma</span>
          <span className={scrolled ? "text-navy" : "text-white"}>Digital</span>
        </a>

        {/* Center — location (desktop) */}
        <div className="hidden md:flex items-center gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
          <span className={`text-sm font-display font-medium tracking-wide transition-colors duration-300 ${
            scrolled ? "text-navy/40" : "text-white/35"
          }`}>
            Elma, WA &nbsp;·&nbsp; Grays Harbor County
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5 md:gap-7">
          <a href={`tel:${PHONE}`}
            className={`hidden md:block text-sm font-medium font-display transition-colors duration-300 ${
              scrolled ? "text-navy/50 hover:text-navy" : "text-white/45 hover:text-white"
            }`}>
            {PHONE_DISPLAY}
          </a>
          <a href="#contact" className={`btn-primary text-sm px-5 md:px-7 py-2.5 md:py-3 ${
            scrolled ? "" : ""
          }`}>
            Free Consultation
          </a>
        </div>
      </div>
    </nav>
  );
}
