"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "We listen first",
    description:
      "We sit down with you and watch how your business actually runs. No guessing, no assumptions. We want to understand your day before we suggest anything.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="18" stroke="#034CB2" strokeWidth="1.5" opacity="0.25" />
        <circle cx="24" cy="24" r="8" stroke="#034CB2" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="3" fill="#034CB2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "We build what fits",
    description:
      "Custom software or a website designed around your workflow — not a template someone else made. Your team starts using it and things just work.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="10" width="32" height="28" rx="3" stroke="#034CB2" strokeWidth="1.5" opacity="0.25" />
        <path d="M16 24L21 29L32 18" stroke="#034CB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "We stick around",
    description:
      "Your business changes — your software changes with it. We're not a one-and-done shop. We keep improving what we've built as you grow.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M24 10C31.732 10 38 16.268 38 24C38 31.732 31.732 38 24 38C16.268 38 10 31.732 10 24" stroke="#034CB2" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
        <path d="M10 24C10 16.268 16.268 10 24 10" stroke="#034CB2" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 18L10 24L16 24" stroke="#034CB2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Process() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    stepsRef.current.forEach((step, i) => {
      if (!step) return;
      gsap.fromTo(
        step,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-bg-elevated">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-amber mb-4">How We Work</p>
        <h2 className="text-section-heading font-display text-navy mb-16 md:mb-20 max-w-3xl">
          We listen before we build. Every time.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="opacity-0"
            >
              <div className="mb-5">{step.icon}</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-label text-amber">{step.number}</span>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-navy">
                  {step.title}
                </h3>
              </div>
              <p className="text-text-muted text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
