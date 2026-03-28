"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Observe",
    description:
      "We don't start with a requirements doc. We watch how your business actually runs — the daily rhythms, the bottlenecks, the workarounds you've built. No assumptions.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-accent">
        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build",
    description:
      "Custom software designed around your workflow — not the other way around. Modern, fast, accessible from anywhere. Your team starts using it, and things just work.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-accent">
        <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M18 24L22 28L30 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Optimize",
    description:
      "Your business evolves, your software evolves with it. We continuously improve, add features, and refine — so the system gets better the longer you use it.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-accent">
        <path d="M24 8V40M8 24H40" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
        <path d="M24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <polygon points="26,14 24,8 22,14" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    stepsRef.current.forEach((step, i) => {
      if (!step) return;

      gsap.fromTo(
        step,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 82%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-10 bg-bg-elevated">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-accent mb-4">How It Works</p>
        <h2 className="text-section-heading font-display mb-16 md:mb-20 max-w-3xl">
          A process built on listening first.
        </h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { stepsRef.current[i] = el; }}
              className="opacity-0"
            >
              <div className="mb-6">{step.icon}</div>
              <div className="flex items-baseline gap-3 mb-3">
                <span className="text-accent font-display text-sm font-medium">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-text">
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
