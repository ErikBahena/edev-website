"use client";

import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setVisible(current < 50 || current < lastScroll.current);
      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${scrolled ? "bg-bg/90 backdrop-blur-xl shadow-sm border-b border-border" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-navy flex items-center gap-2">
          <span className="text-blue">Elma</span>
          <span>Digital</span>
        </a>
        <a href="#contact" className="btn-primary text-sm px-6 py-3">
          Book a Call
        </a>
      </div>
    </nav>
  );
}
