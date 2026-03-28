"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        headlineRef.current?.querySelectorAll(".word") ?? [],
        { opacity: 0, y: 80, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );
  }, []);

  const headlineWords = "We remove the boring side of running your business".split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 pt-24 md:pt-0 text-center overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(200,169,126,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p
          ref={labelRef}
          className="text-label text-accent mb-8 opacity-0 hidden md:block"
        >
          Custom Software Consultancy
        </p>

        <h1
          ref={headlineRef}
          className="text-hero font-display mb-8"
          style={{ perspective: "1000px" }}
        >
          {headlineWords.map((word, i) => (
            <span
              key={i}
              className="word inline-block mr-[0.25em]"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p
          ref={subtitleRef}
          className="text-body-lg text-text-muted max-w-2xl mx-auto mb-12 opacity-0"
        >
          We help busy local business owners replace complicated workflows with
          modern, custom software — so you can get back to doing what you love.
        </p>

        <div ref={ctaRef} className="opacity-0">
          <a href="#contact" className="magnetic-btn text-base px-10 py-4">
            Book a Discovery Call
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
        <span className="text-xs tracking-[0.2em] uppercase text-text-muted">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-text-muted to-transparent" />
      </div>
    </section>
  );
}
