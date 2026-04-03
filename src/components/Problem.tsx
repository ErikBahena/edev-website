"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    title: "Buried in manual work",
    description:
      "Hours every week copying numbers between spreadsheets, chasing down hours, manually building invoices. Time you should be spending on the work you're actually good at.",
  },
  {
    title: "Software that doesn't fit",
    description:
      "Off-the-shelf tools built for somebody else's business. You end up working around the software instead of the other way around — and paying for it every month.",
  },
  {
    title: "No time for what matters",
    description:
      "You started your business to do something you're proud of. Not to spend Sunday nights catching up on paperwork.",
  },
];

export default function Problem() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-amber mb-4">Sound Familiar?</p>
        <h2 className="text-section-heading font-display text-navy mb-16 md:mb-20 max-w-3xl">
          Running a business shouldn&apos;t feel like a second job.
        </h2>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {problems.map((problem, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="process-card opacity-0"
            >
              <span className="font-display text-blue text-sm font-semibold mb-4 block">
                0{i + 1}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-4 text-navy">
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
