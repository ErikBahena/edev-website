"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 md:py-48 px-6 md:px-10 relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200,169,126,0.08) 0%, transparent 70%)",
        }}
      />

      <div ref={contentRef} className="max-w-3xl mx-auto text-center relative z-10 opacity-0">
        <p className="text-label text-accent mb-6">Ready to Start?</p>
        <h2 className="text-section-heading font-display mb-8">
          Let&apos;s build something.
        </h2>
        <p className="text-body-lg text-text-muted mb-12 max-w-xl mx-auto">
          Book a free 30-minute discovery call. We&apos;ll talk about what&apos;s
          slowing you down and whether custom software is the right fit.
        </p>
        <a href="mailto:erik@edev.com" className="magnetic-btn text-base px-12 py-5">
          Book a Discovery Call
          <svg
            className="ml-2 w-4 h-4 inline-block"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
