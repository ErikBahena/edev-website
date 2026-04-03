"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "You didn't start your business to spend evenings in spreadsheets.",
  "You started it because you're good at what you do.",
  "We take care of the rest.",
];

export default function Manifesto() {
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    lineRefs.current.forEach((line) => {
      if (!line) return;
      gsap.fromTo(
        line,
        { opacity: 0.1 },
        {
          opacity: 1,
          duration: 0.6,
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
  }, []);

  return (
    <section className="py-32 md:py-48 px-6 md:px-10 bg-bg">
      <div className="max-w-5xl mx-auto">
        {lines.map((line, i) => (
          <p
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            className="text-manifesto font-display text-navy mb-6 md:mb-8 last:mb-0"
          >
            {i === lines.length - 1 ? (
              <>
                <span className="text-blue">{line}</span>
              </>
            ) : line}
          </p>
        ))}
      </div>
    </section>
  );
}
