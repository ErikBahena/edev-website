"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".cta-reveal"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 md:py-48 px-6 md:px-14 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(3,76,178,0.2) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">
          {/* Left */}
          <div>
            <p className="cta-reveal text-label mb-6 opacity-0" style={{ color: "var(--amber)" }}>
              Based in Elma, WA · No Pressure · Free Consultation
            </p>
            <h2 className="cta-reveal text-heading font-display text-white mb-6 opacity-0">
              Let&apos;s talk about<br />your business.
            </h2>
            <p className="cta-reveal text-body-lg opacity-0 max-w-md" style={{ color: "rgba(255,255,255,0.45)" }}>
              Logo this week or software that runs your whole operation — reach out and we&apos;ll figure out what fits. No pitch, just a real conversation.
            </p>
          </div>

          {/* Right — contact options */}
          <div className="cta-reveal opacity-0 flex flex-col gap-4 min-w-[260px]">
            <a href="tel:3608435566"
              className="flex items-center gap-4 p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="w-10 h-10 rounded-lg bg-blue flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M14 10.667c-1.067 0-2.1-.167-3.067-.467a.967.967 0 0 0-1 .234l-1.9 1.9A12.067 12.067 0 0 1 2.667 5.967l1.9-1.9c.266-.267.35-.634.233-1A9.897 9.897 0 0 1 2.333 2C2.333 1.4 1.933 1 1.333 1H1C.4 1 0 1.4 0 2c0 7.733 6.267 14 14 14 .6 0 1-.4 1-1v-.333c0-.6-.4-1-1-1z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Call or Text</p>
                <p className="font-display font-semibold text-white">(360) 843-5566</p>
              </div>
            </a>

            <a href="mailto:erik@elmadigital.io"
              className="flex items-center gap-4 p-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(196,136,42,0.25)" }}>
                <svg className="w-4 h-4" style={{ color: "var(--amber)" }} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Email</p>
                <p className="font-display font-semibold text-white">erik@elmadigital.io</p>
              </div>
            </a>

            <a href="#contact" className="btn-primary py-4 text-sm text-center mt-2">
              Schedule a Free Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
