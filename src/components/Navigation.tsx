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
      {/* Border line that fades in on scroll */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
        style={{ background: "rgba(255,255,255,0.1)" }} />

      <div className={`px-6 md:px-14 h-16 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "bg-navy/96 backdrop-blur-xl" : "bg-transparent"
      }`}>

        {/* Left — wordmark */}
        <a href="#" className="font-display text-lg font-bold tracking-tight flex items-center gap-0.5">
          <span className="text-blue">Elma</span>
          <span className="text-white">Digital</span>
        </a>

        {/* Center — location tag (desktop only) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
          <span className="text-xs font-display font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.35)" }}>
            Elma, WA &nbsp;·&nbsp; Grays Harbor County
          </span>
        </div>

        {/* Right — phone + CTA */}
        <div className="flex items-center gap-5">
          <a href={`tel:${PHONE}`}
            className="hidden md:block text-xs font-medium font-display transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}>
            {PHONE_DISPLAY}
          </a>
          <a href="#contact" className="btn-primary text-xs px-5 py-2.5">
            Free Consultation
          </a>
        </div>
      </div>
    </nav>
  );
}
