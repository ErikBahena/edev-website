"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    title: "Drowning in spreadsheets",
    description:
      "Hours every week manually tracking employees, invoices, inventory — copying numbers from one place to another.",
  },
  {
    title: "Locked into expensive software",
    description:
      "Paying tens of thousands for tools that don't fit your workflow, lock your data in proprietary formats, and charge you to access it.",
  },
  {
    title: "No time for what matters",
    description:
      "The business you built to do what you love has become a full-time admin job. Evenings, weekends — consumed by management.",
  },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-accent mb-4">The Problem</p>
        <h2 className="text-section-heading font-display mb-16 md:mb-20 max-w-3xl">
          Running a business shouldn&apos;t feel like a second job.
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="process-card opacity-0"
            >
              <span className="text-accent font-display text-sm font-medium mb-4 block">
                0{i + 1}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-text">
                {problem.title}
              </h3>
              <p className="text-text-muted text-base leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
