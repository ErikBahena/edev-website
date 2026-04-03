"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

export default function CTA() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section id="contact" className="py-32 md:py-48 px-6 md:px-10 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(3,76,178,0.2) 0%, transparent 70%)" }}
      />

      <div ref={contentRef} className="max-w-2xl mx-auto text-center relative z-10 opacity-0">
        <p className="text-label mb-6" style={{ color: "#C4882A" }}>Free Consultation · No Pressure</p>
        <h2 className="text-section-heading font-display text-white mb-6">
          Let&apos;s talk about your business.
        </h2>
        <p className="text-body-lg mb-12 max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
          Whether you need a logo this week or software that runs your whole operation — reach out and we&apos;ll figure out what fits.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`tel:${PHONE}`} className="btn-primary text-base px-10 py-4">
            Call {PHONE_DISPLAY}
          </a>
          <a href="mailto:erik@elmadigital.io" className="btn-outline text-base px-10 py-4">
            Send an Email
          </a>
        </div>

        <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Based in Elma, WA — serving all of Grays Harbor County
        </p>
      </div>
    </section>
  );
}
