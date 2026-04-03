"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "We listen first",
    body: "We sit with you and learn how your business actually runs. No assumptions, no requirements doc. Just good questions and honest observation.",
  },
  {
    n: "02",
    title: "We build what fits",
    body: "Logos, websites, or full software — built around your workflow, not the other way around. You see it as it takes shape and we adjust as we go.",
  },
  {
    n: "03",
    title: "We stick around",
    body: "We maintain what we build and improve it as you grow. You're not a transaction — you're a long-term relationship.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".step-item"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-bg-warm">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          {/* Left */}
          <div>
            <p className="text-label text-amber mb-4">How We Work</p>
            <h2 className="text-heading font-display text-navy">
              We listen<br />before we<br />build.
            </h2>
          </div>

          {/* Steps */}
          <div>
            {steps.map((step, i) => (
              <div key={i} className={`step-item opacity-0 py-8 grid grid-cols-[3rem_1fr] gap-6 ${i < steps.length - 1 ? "border-b border-border" : ""}`}>
                <span className="font-display text-xs font-semibold text-text-muted pt-1">{step.n}</span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-navy mb-3">{step.title}</h3>
                  <p className="text-body-lg text-text-muted leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
