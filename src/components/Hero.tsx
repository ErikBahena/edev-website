"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(badgeRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(
        headlineRef.current?.querySelectorAll(".word") ?? [],
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.75, stagger: 0.06, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(subRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.3")
      .fromTo(ctaRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.25");
  }, []);

  const words = "Elma's digital partner for every size business.".split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-24 md:pt-0 text-center overflow-hidden bg-navy">
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(3,76,178,0.22) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Location badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 mb-6 opacity-0">
          <span className="w-1.5 h-1.5 rounded-full bg-amber inline-block" />
          <span className="text-label text-white/50">Locally owned · Elma, WA · Grays Harbor County</span>
        </div>

        <h1 ref={headlineRef} className="text-hero font-display text-white mb-6">
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.22em]">{word}</span>
          ))}
        </h1>

        <p ref={subRef} className="text-body-lg max-w-xl mx-auto mb-10 opacity-0" style={{ color: "rgba(255,255,255,0.6)" }}>
          Logos from $50. Websites from $750. Custom software for when your business outgrows spreadsheets.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a href="#contact" className="btn-primary text-base px-8 py-4">
            Get a Free Consultation
          </a>
          <a href={`tel:${PHONE}`} className="btn-outline text-base px-8 py-4">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-25">
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
