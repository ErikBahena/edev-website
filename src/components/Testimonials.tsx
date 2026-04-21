"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "I used to spend my evenings in spreadsheets trying to figure out who worked where and what to bill. Now my guys clock in on their phones and when it\u2019s time to invoice, everything\u2019s already there. Erik built something that actually fits how my business works.",
    name: "Luis Cruz",
    role: "Owner, Alberto\u2019s Residential Painting LLC",
    location: "Elma, WA",
    headshot: "/headshot-luis.jpg",
    project: "PaintMate",
  },
  {
    quote:
      "When my computer died, I thought I lost everything. The old software company wanted over $100,000 just to get me back up and running. Erik built me something better \u2014 I can check my herd from my phone, my vets can log in from anywhere, and I don\u2019t have to worry about losing my data again.",
    name: "Jose Torres",
    role: "Owner, Torres Dairy",
    location: "Grays Harbor County, WA",
    headshot: "/headshot-jose.jpg",
    project: "HerdLife",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".testimonial-card"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-border">
          <div>
            <p className="text-label text-accent mb-5">What Clients Say</p>
            <h2 className="text-heading font-display text-navy">
              In their words.
            </h2>
          </div>
          <p className="text-body-lg text-text-muted max-w-xs md:text-right">
            Real feedback from the people
            <br />
            we build for.
          </p>
        </div>

        {/* Testimonial grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card opacity-0 bg-bg rounded-2xl p-8 md:p-10 flex flex-col"
            >
              {/* Photo + attribution */}
              <div className="flex items-center gap-5 mb-8">
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={t.headshot}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <p className="font-display font-semibold text-navy text-base md:text-lg">
                    {t.name}
                  </p>
                  <p className="text-text-muted text-sm">{t.role}</p>
                  <p className="text-accent text-xs font-display font-medium mt-1">
                    {t.location}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                {/* Decorative quotation mark */}
                <span
                  className="absolute -top-3 -left-1 font-display font-bold leading-none select-none pointer-events-none"
                  style={{
                    fontSize: "5rem",
                    color: "rgba(var(--accent-rgb),0.1)",
                  }}
                >
                  &ldquo;
                </span>
                <p
                  className="relative font-display text-navy leading-[1.55] pt-4"
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
                    fontWeight: 500,
                  }}
                >
                  {t.quote}
                </p>
              </div>

              {/* Project badge */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "var(--blue)" }}
                  />
                  <span className="text-xs font-display font-medium text-text-muted">
                    Built with {t.project}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
