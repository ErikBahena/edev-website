"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "We sit with you,",
  "watch how your business",
  "actually runs, then build",
  "something that fits.",
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".manifesto-line"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
    );
    gsap.fromTo(sectionRef.current.querySelectorAll(".manifesto-sub"),
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col justify-center py-28 md:py-36 px-6 md:px-14 bg-bg">
      <div className="max-w-7xl mx-auto w-full">
        <p className="text-label text-amber mb-14 manifesto-line opacity-0">Our Approach</p>

        <div className="mb-16">
          {lines.map((line, i) => (
            <div key={i} className="manifesto-line opacity-0 overflow-hidden">
              <p className="text-display font-display text-navy leading-[0.95] pb-2"
                style={{ fontStyle: i === lines.length - 1 ? "normal" : "normal" }}>
                {line}
              </p>
            </div>
          ))}
        </div>

        <div className="manifesto-sub opacity-0 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 pt-10 border-t border-border">
          <p className="text-body-lg text-text-muted max-w-md leading-relaxed">
            We don&apos;t start with a proposal. We start by spending time in your business — watching the actual workflow, asking questions, and understanding what&apos;s genuinely costing you time. Only then do we build.
          </p>
          <div className="md:ml-auto">
            <a href="#contact" className="btn-outline-dark px-8 py-4 text-sm">
              Start with a free call →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
