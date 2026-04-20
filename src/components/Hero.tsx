"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

const SERVICES = [
  { n: "01", label: "Logo Design", price: "from $50" },
  { n: "02", label: "Website Design", price: "from $750" },
  { n: "03", label: "Custom Software", price: "Let's talk" },
];

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.1 });

    tl.fromTo(".hero-label", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(".hero-line", { opacity: 0, y: 60, skewY: 1 },
        { opacity: 1, y: 0, skewY: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.2")
      .fromTo(".hero-sub", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(".hero-cta", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2")
      .fromTo(".hero-services", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
  }, []);

  // Headline sizing that fits 3 lines + label + subhead + CTAs within 100vh
  // on both a 375x667 portrait phone AND a 1500x800 laptop.
  // Cap at 6.5rem so "Websites." / "Software." never wrap next to the
  // services list column on desktop.
  const headlineSize = "clamp(2.25rem, 7.5vw, 6.5rem)";

  return (
    <section
      ref={containerRef}
      // 100svh uses small-viewport-height so it fits when the mobile URL bar
      // is visible. Tighter padding on mobile so content never overflows 100vh.
      className="relative flex flex-col justify-end pt-24 pb-10 md:pt-28 md:pb-20 px-6 md:px-14 overflow-hidden bg-navy"
      style={{ minHeight: "100svh" }}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Radial blue glow */}
      <div
        className="absolute top-0 right-0 w-[70%] h-[70%] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(3,76,178,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
          {/* Left — headline */}
          <div>
            <p
              className="hero-label text-label mb-6 md:mb-8 opacity-0"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Elma, WA &nbsp;·&nbsp; Locally Owned
            </p>

            {/* Three services as the headline — zero ambiguity about what we do. */}
            <div className="overflow-hidden mb-1">
              <h1
                className="hero-line font-display font-bold text-white opacity-0 pb-2 whitespace-nowrap"
                style={{
                  fontSize: headlineSize,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Logos.
              </h1>
            </div>
            <div className="overflow-hidden mb-1">
              <h1
                className="hero-line font-display font-bold opacity-0 pb-2 whitespace-nowrap"
                style={{
                  fontSize: headlineSize,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                  color: "var(--blue)",
                  WebkitTextStroke: "2px var(--blue)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Websites.
              </h1>
            </div>
            <div className="overflow-hidden mb-5 md:mb-8">
              <h1
                className="hero-line font-display font-bold text-white opacity-0 pb-2 whitespace-nowrap"
                style={{
                  fontSize: headlineSize,
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                Software.
              </h1>
            </div>

            <p
              className="hero-sub text-body-lg max-w-md mb-5 md:mb-8 opacity-0"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Custom design and software for local businesses in Grays Harbor
              County. Observed, built, and maintained by one local engineer.
            </p>

            <div className="hero-cta flex flex-wrap gap-3 opacity-0">
              <a href="#contact" className="btn-primary px-6 md:px-8 py-3.5 md:py-4 text-sm">
                Free Consultation
              </a>
              <a
                href={`tel:${PHONE}`}
                className="btn-ghost px-6 md:px-8 py-3.5 md:py-4 text-sm"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Right — service list (decorative, desktop only) */}
          <div className="hero-services opacity-0 hidden md:block">
            <div className="space-y-3 text-right">
              {SERVICES.map((s) => (
                <a
                  href="#services"
                  key={s.n}
                  className="flex items-baseline justify-end gap-4 group transition-all duration-200"
                >
                  <span className="text-label opacity-30 text-white group-hover:opacity-60 transition-opacity">
                    {s.n}
                  </span>
                  <span className="font-display font-semibold text-lg text-white/70 group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                  <span className="font-display text-sm font-medium text-amber w-24 text-right">
                    {s.price}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom rule */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.08)" }}
      />
    </section>
  );
}
