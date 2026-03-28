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
  const sectionRef = useRef<HTMLElement>(null);
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
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-10 bg-bg-elevated">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-accent mb-4">What They Say</p>
        <h2 className="text-section-heading font-display mb-16 md:mb-20 max-w-3xl">
          Don&apos;t take our word for it.
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="opacity-0 border border-border rounded-2xl p-8 md:p-10 relative"
            >
              {/* Quote mark */}
              <span className="absolute top-6 right-8 text-6xl font-display text-accent/10 leading-none select-none">
                &ldquo;
              </span>

              <p className="text-text text-lg md:text-xl leading-relaxed mb-8 relative z-10">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="font-display font-bold text-accent text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-text">
                    {testimonial.name}
                  </p>
                  <p className="text-text-muted text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
