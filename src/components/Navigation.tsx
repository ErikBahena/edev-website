"use client";

import { useEffect, useRef, useState } from "react";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScroll.current;
      setScrolled(current > 60);
      // Near top → always visible. Large jumps (>200px) are anchor nav,
      // not hide-on-scroll gestures — keep nav visible. Small deltas:
      // hide when scrolling down, show when scrolling up.
      if (current < 60 || Math.abs(delta) > 200) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
      } else if (delta < -8) {
        setVisible(true);
      }
      lastScroll.current = current;
    };
    // Seed state from the current scroll position so direct loads to an
    // anchor (e.g. /#services) start with the correct nav styling. Seeding
    // lastScroll also prevents a spurious 0→N "scroll-down" delta on the
    // first real scroll event, which would otherwise hide the nav.
    const initial = window.scrollY;
    setScrolled(initial > 60);
    lastScroll.current = initial;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* White bg layer */}
      <div
        className="absolute inset-0 bg-white backdrop-blur-xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: scrolled ? 0.97 : 0 }}
      />
      {/* Bottom border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none transition-opacity duration-300"
        style={{ background: "var(--border)", opacity: scrolled ? 1 : 0 }}
      />

      <div className="relative px-6 md:px-14 h-[4.5rem] flex items-center gap-8">

        {/* Wordmark */}
        <a href="#" className="flex items-baseline gap-1 flex-shrink-0 mr-auto md:mr-0">
          <span
            className="font-display font-bold tracking-tight leading-none transition-colors duration-300"
            style={{
              fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
              color: "var(--blue)",
            }}
          >
            Elma
          </span>
          <span
            className="font-display font-bold tracking-tight leading-none transition-colors duration-300"
            style={{
              fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
              color: scrolled ? "var(--navy)" : "white",
            }}
          >
            Digital
          </span>
        </a>

        {/* Nav links — desktop center */}
        <div className="hidden md:flex items-center gap-7 mx-auto">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-display font-semibold text-sm tracking-wide transition-colors duration-200"
              style={{ color: scrolled ? "rgba(var(--navy-rgb),0.45)" : "rgba(255,255,255,0.45)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = scrolled ? "var(--navy)" : "white")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = scrolled
                  ? "rgba(var(--navy-rgb),0.45)"
                  : "rgba(255,255,255,0.45)")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right — phone + CTA */}
        <div className="hidden md:flex items-center gap-6 ml-auto md:ml-0">
          <a
            href={`tel:${PHONE}`}
            className="font-display font-medium text-sm transition-colors duration-200"
            style={{ color: scrolled ? "rgba(var(--navy-rgb),0.4)" : "rgba(255,255,255,0.4)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = scrolled ? "var(--navy)" : "white")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = scrolled
                ? "rgba(var(--navy-rgb),0.4)"
                : "rgba(255,255,255,0.4)")
            }
          >
            {PHONE_DISPLAY}
          </a>

          <a
            href="#contact"
            className="font-display font-semibold text-sm px-5 py-2.5 rounded transition-all duration-200"
            style={
              scrolled
                ? {
                    background: "var(--blue)",
                    color: "white",
                  }
                : {
                    background: "rgba(255,255,255,0.12)",
                    color: "white",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }
            }
            onMouseEnter={(e) => {
              if (scrolled) {
                e.currentTarget.style.background = "var(--navy)";
              } else {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (scrolled) {
                e.currentTarget.style.background = "var(--blue)";
              } else {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              }
            }}
          >
            Free Consultation
          </a>
        </div>

        {/* Mobile — CTA only */}
        <a
          href="#contact"
          className="md:hidden font-display font-semibold text-sm px-4 py-2.5 rounded transition-all duration-200"
          style={
            scrolled
              ? { background: "var(--blue)", color: "white" }
              : {
                  background: "rgba(255,255,255,0.12)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                }
          }
        >
          Free Consult
        </a>
      </div>
    </nav>
  );
}
