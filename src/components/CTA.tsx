"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-10 bg-navy relative overflow-hidden">
      {/* Blue glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(3,76,178,0.2) 0%, transparent 70%)",
        }}
      />

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10 opacity-0">
        <p className="text-label mb-6" style={{ color: "#C4882A" }}>Based in Elma, WA</p>
        <h2 className="text-section-heading font-display text-white mb-8">
          Let&apos;s talk about your business.
        </h2>
        <p className="text-body-lg mb-12 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
          Book a free 30-minute call. We&apos;ll talk through what&apos;s slowing you down
          and whether we can help — no pressure, no pitch.
        </p>
        <a
          href="mailto:erik@elmadigital.io"
          className="btn-primary text-base px-12 py-5"
        >
          Book a Free Call
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
