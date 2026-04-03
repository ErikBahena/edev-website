"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    )
      .fromTo(
        labelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.3"
      )
      .fromTo(
        headlineRef.current?.querySelectorAll(".word") ?? [],
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.2"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  const headlineWords = "We remove the boring side of running your business.".split(" ");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-24 md:pt-0 text-center overflow-hidden bg-navy">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(3,76,178,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Location badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 mb-6 opacity-0"
        >
          <span className="w-2 h-2 rounded-full bg-amber inline-block" />
          <span className="text-label text-white/60">Elma, Washington</span>
        </div>

        <p
          ref={labelRef}
          className="text-label text-blue mb-6 opacity-0"
          style={{ color: "#6B9FE4" }}
        >
          Custom Software &amp; Web Design
        </p>

        <h1
          ref={headlineRef}
          className="text-hero font-display text-white mb-8"
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.22em]"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-body-lg max-w-2xl mx-auto mb-12 opacity-0"
          style={{ color: "rgba(255,255,255,0.65)" }}
        >
          We help Grays Harbor business owners get off spreadsheets, show up
          online, and run their operations with software built around how they
          actually work.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0">
          <a href="#contact" className="btn-primary text-base px-10 py-4">
            Book a Free Call
          </a>
          <a href="#work" className="btn-outline text-base px-10 py-4">
            See Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30">
        <span className="text-xs tracking-[0.2em] uppercase text-white">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
