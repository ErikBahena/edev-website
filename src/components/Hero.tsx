"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BrowserFrame from "./BrowserFrame";

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
      .fromTo(".hero-showcase", { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }, "-=0.8")
      .fromTo(".hero-services", { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4");
  }, []);

  // Headline sizing that fits 3 lines + label + subhead + CTAs within 100vh
  // on both a 375x667 portrait phone AND a 1500x800 laptop.
  // Cap at 6.5rem so "Websites." / "Software." never wrap next to the
  // services list column on desktop.
  const headlineSize = "clamp(2.1rem, 6.2vw, 5.4rem)";

  return (
    <section
      ref={containerRef}
      // Uses the `.section--hero` variant (full 100svh, content justified to
      // the bottom so the navbar overlays cleanly above the headline).
      className="section section--hero relative overflow-hidden bg-navy"
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
            "radial-gradient(ellipse at top right, rgba(var(--blue-rgb),0.18) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-end">
          {/* Left — headline. min-w-0 lets the 1fr track shrink below its
              content's min width, otherwise long lines widen the column past
              the viewport on phones. */}
          <div className="min-w-0">
            <p
              className="hero-label text-label mb-6 md:mb-8 opacity-0"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Elma, WA &nbsp;·&nbsp; Locally Owned
            </p>

            {/* Promise-led headline. The three products live in the subhead + services grid;
                the H1's job is to say why a busy owner should care. */}
            <div className="overflow-hidden mb-1">
              <h1
                className="hero-line font-display font-bold text-white opacity-0 pb-2"
                style={{ fontSize: headlineSize, lineHeight: 0.98, letterSpacing: "-0.03em" }}
              >
                Software and websites
              </h1>
            </div>
            <div className="overflow-hidden mb-5 md:mb-8">
              <h1
                className="hero-line font-display font-bold opacity-0 pb-2"
                style={{ fontSize: headlineSize, lineHeight: 0.98, letterSpacing: "-0.03em", color: "var(--accent)" }}
              >
                for the way you actually work.
              </h1>
            </div>

            <p
              className="hero-sub text-body-lg max-w-md mb-5 md:mb-8 opacity-0"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Logos, websites, and custom business software for Grays Harbor
              businesses. Built in Elma by one engineer who watches how your
              operation runs, then builds what fits.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-4 opacity-0">
              <a href={`tel:${PHONE}`} className="btn-primary px-6 md:px-8 py-3.5 md:py-4 text-sm">
                Call for a free 20-min chat
              </a>
              <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                or text{" "}
                <a
                  href={`sms:${PHONE}?&body=${encodeURIComponent("Hi Erik — I'd like to talk about my business.")}`}
                  className="font-display font-semibold underline underline-offset-4"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {PHONE_DISPLAY}
                </a>
              </span>
            </div>

            {/* Trust line: the person, up front. Pulled up from the footer where it was invisible. */}
            <div className="hero-cta mt-6 flex items-center gap-3 opacity-0">
              <span className="relative inline-block h-10 w-10 overflow-hidden rounded-full flex-shrink-0"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/erik.jpg" alt="Erik Bahena" className="h-full w-full object-cover object-top" />
              </span>
              <p className="text-sm leading-snug" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="font-display font-semibold" style={{ color: "rgba(255,255,255,0.9)" }}>Erik Bahena</span>
                {" "}· from Elma · you talk to the person who builds it. No agency, no offshore.
              </p>
            </div>

            {/* MOBILE showcase: the three real products, visible on the FIRST phone screen.
                Desktop gets the fanned stack in the right column instead. */}
            <div className="hero-showcase md:hidden mt-7 opacity-0">
              <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory" style={{ scrollbarWidth: "none" }}>
                {[
                  { src: "/paintmate-dashboard.png", w: 3024, h: 1546, app: "PaintMate", cap: "Job costing · painting contractor" },
                  { src: "/dynamic-stylz.png",       w: 1600, h: 1041, app: "dynamicstylz.com", cap: "Website · hair salon, Elma" },
                  { src: "/herdlife-dashboard.png",  w: 2586, h: 1144, app: "HerdLife", cap: "Herd management · dairy" },
                ].map((m) => (
                  <div key={m.app} className="snap-start flex-shrink-0 w-[78%]">
                    <BrowserFrame src={m.src} alt={m.cap} width={m.w} height={m.h} appName={m.app} sizes="80vw" aspectRatio="16 / 10" />
                    <p className="mt-2 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{m.cap}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — product showcase + service list (desktop only) */}
          <div className="hidden md:flex flex-col gap-10 lg:gap-12 items-end">
            {/* Stacked product screenshots — "this is what I build" */}
            <div
              className="hero-showcase opacity-0 relative w-[460px] lg:w-[540px]"
              style={{ height: "clamp(340px, 36vh, 420px)" }}
            >
              {/* Ambient accent glow behind */}
              <div
                className="absolute inset-0 -z-10 blur-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.22) 0%, transparent 70%)",
                }}
              />

              {/* Dynamic Stylz — back card, tucked top-left, tilted left */}
              <div
                className="absolute w-[52%]"
                style={{
                  top: "0%",
                  left: "2%",
                  transform: "rotate(-6deg)",
                  transformOrigin: "center",
                  filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.32))",
                }}
              >
                <BrowserFrame
                  src="/dynamic-stylz.png"
                  alt="Dynamic Stylz Salon — website for a local hair salon"
                  width={1600}
                  height={1041}
                  appName="dynamicstylz.com"
                  sizes="280px"
                />
              </div>

              {/* HerdLife — middle-right, tilted right */}
              <div
                className="absolute w-[54%]"
                style={{
                  top: "18%",
                  right: "0%",
                  transform: "rotate(5deg)",
                  transformOrigin: "center",
                  filter: "drop-shadow(0 20px 36px rgba(0,0,0,0.4))",
                }}
              >
                <BrowserFrame
                  src="/herdlife-dashboard.png"
                  alt="HerdLife — custom software for dairy farms"
                  width={2586}
                  height={1144}
                  appName="HerdLife"
                  sizes="300px"
                />
              </div>

              {/* PaintMate — front, bottom-center, largest, almost level */}
              <div
                className="absolute w-[68%]"
                style={{
                  bottom: "0%",
                  left: "14%",
                  transform: "rotate(-1deg)",
                  transformOrigin: "center",
                  filter: "drop-shadow(0 32px 52px rgba(0,0,0,0.55))",
                }}
              >
                <BrowserFrame
                  src="/paintmate-dashboard.png"
                  alt="PaintMate — custom software for painting contractors"
                  width={3024}
                  height={1546}
                  appName="PaintMate"
                  sizes="400px"
                />
              </div>
            </div>

            {/* Compact services + price hint under the stack */}
            <div className="hero-services opacity-0 flex gap-6 text-right">
              {SERVICES.map((s) => (
                <a href="#services" key={s.n} className="group">
                  <span className="block font-display font-semibold text-sm text-white/70 group-hover:text-white transition-colors">{s.label}</span>
                  <span className="block font-display text-xs font-medium text-accent">{s.price}</span>
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
