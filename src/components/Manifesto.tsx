"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "You didn't start your business to spend evenings in spreadsheets.",
  "You started it because you're great at what you do.",
  "We build the software that handles everything else.",
];

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    lineRefs.current.forEach((line) => {
      if (!line) return;

      gsap.fromTo(
        line,
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "top 40%",
            scrub: 1,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 md:py-48 px-6 md:px-10"
    >
      <div className="max-w-5xl mx-auto">
        {lines.map((line, i) => (
          <p
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="text-manifesto font-display text-text mb-6 md:mb-8 last:mb-0"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
