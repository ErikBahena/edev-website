"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "I used to spend my evenings in spreadsheets trying to figure out who worked where and what to bill. Now my guys clock in on their phones and when it's time to invoice, everything's already there. Erik built something that actually fits how my business works.",
    name: "Luis Cruz",
    role: "Owner, Alberto's Residential Painting LLC",
  },
  {
    quote:
      "When my computer died, I thought I lost everything. The old software company wanted over $75,000 just to get me back up and running. Erik built me something better — I can check my herd from my phone, my vets can log in from anywhere, and I don't have to worry about losing my data again.",
    name: "Jose Torres",
    role: "Owner, Torres Dairy",
  },
];

export default function Testimonials() {
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
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        }
      );
    });
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-navy">
      <div className="max-w-7xl mx-auto">
        <p className="text-label mb-4" style={{ color: "#C4882A" }}>What They Say</p>
        <h2 className="text-section-heading font-display text-white mb-16 md:mb-20 max-w-3xl">
          Don&apos;t take our word for it.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="opacity-0 rounded-2xl p-8 md:p-10 relative"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="absolute top-6 right-8 text-7xl font-display leading-none select-none" style={{ color: "rgba(3,76,178,0.3)" }}>
                &ldquo;
              </span>

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-bold text-lg" style={{ background: "rgba(3,76,178,0.3)", color: "#6B9FE4" }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-display font-semibold text-white">{t.name}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
