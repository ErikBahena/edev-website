"use client";

import { useEffect, useRef, useState } from "react";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
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
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-400 ${visible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className={`mx-4 md:mx-8 mt-4 rounded-xl flex items-center justify-between px-5 md:px-8 h-14 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-xl shadow-lg"
          : "bg-white/5 backdrop-blur-sm border border-white/10"
      }`}>
        <a href="#" className="font-display text-lg font-bold tracking-tight flex items-center gap-1">
          <span className="text-blue">Elma</span>
          <span className="text-white">Digital</span>
        </a>

        <a href={`tel:${PHONE}`} className="hidden md:flex items-center gap-2 text-xs font-medium font-display text-white/50 hover:text-white transition-colors">
          <span className="w-1.5 h-1.5 rounded-full bg-blue" />
          {PHONE_DISPLAY}
        </a>

        <a href="#contact" className="btn-primary text-xs px-5 py-2.5">
          Free Consultation
        </a>
      </div>
    </nav>
  );
}
