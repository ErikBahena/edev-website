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
      } ${scrolled ? "bg-bg/95 backdrop-blur-xl shadow-sm border-b border-border" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex items-center justify-between h-18 md:h-20">
        {/* Logo */}
        <a href="#" className="font-display text-lg md:text-xl font-bold tracking-tight text-navy flex items-center gap-1.5">
          <span className="text-blue">Elma</span>
          <span>Digital</span>
        </a>

        {/* Phone — visible on md+ */}
        <a
          href={`tel:${PHONE}`}
          className="hidden md:flex items-center gap-2 text-sm font-medium text-text-muted hover:text-navy transition-colors"
        >
          <svg className="w-4 h-4 text-blue" viewBox="0 0 16 16" fill="none">
            <path d="M14 10.667c-1.067 0-2.1-.167-3.067-.467a.967.967 0 0 0-1 .234l-1.9 1.9A12.067 12.067 0 0 1 2.667 5.967l1.9-1.9c.266-.267.35-.634.233-1A9.897 9.897 0 0 1 2.333 2C2.333 1.4 1.933 1 1.333 1H1C.4 1 0 1.4 0 2c0 7.733 6.267 14 14 14 .6 0 1-.4 1-1v-.333c0-.6-.4-1-1-1z" fill="currentColor"/>
          </svg>
          {PHONE_DISPLAY}
        </a>

        {/* CTA */}
        <a href="#contact" className="btn-primary text-sm px-5 py-2.5">
          Free Consultation
        </a>
      </div>
    </nav>
  );
}
