"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    label: "Residential Painting",
    title: "Alberto's Residential Painting",
    client: "Luis Cruz, Owner",
    headline: "Eliminated hours of manual invoicing",
    metrics: [
      { value: "4", label: "Employees managed" },
      { value: "30+", label: "Min saved per invoice" },
      { value: "0", label: "Manual data entry" },
    ],
    description:
      "Luis's team works across multiple job sites daily, each doing different types of labor at different rates. We built PaintMate — a platform where employees clock in/out on their phones, materials auto-import from Sherwin-Williams (who has no API, so we built our own), and invoices generate with everything pre-calculated. What used to take Luis an entire evening now takes 5 minutes.",
    features: [
      "Employee time tracking per project & labor type",
      "Automated Sherwin-Williams purchase import",
      "One-click invoice generation with PDF email delivery",
      "Automated biweekly payroll calculation",
    ],
    accent: "from-amber-500/20 to-orange-500/10",
  },
  {
    label: "Dairy Farming",
    title: "Torres Dairy",
    client: "Jose Torres, Owner",
    headline: "Replaced a $75,000+ system",
    metrics: [
      { value: "$75K+", label: "In software costs saved" },
      { value: "4", label: "User roles supported" },
      { value: "100%", label: "Data ownership" },
    ],
    description:
      "Jose's farm management computer was destroyed by a power surge. His data was locked in a proprietary format — the old vendor wanted $75,000+ just to get back online. We built HerdLife — a web-based platform for tracking every cow's lifecycle, accessible from any device by workers, vets, and inspectors. His data is his. No vendor lock-in. No single point of failure.",
    features: [
      "Full cow lifecycle tracking (breeding, calving, medications, vet checks)",
      "Inspector-ready reports with CSV/PDF export",
      "Role-based access for workers, vets, and inspectors",
      "Bilingual interface (English & Spanish)",
    ],
    accent: "from-emerald-500/20 to-teal-500/10",
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;

      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-accent mb-4">Our Work</p>
        <h2 className="text-section-heading font-display mb-16 md:mb-20 max-w-4xl">
          Real businesses. Real results.
        </h2>

        <div className="flex flex-col gap-8 md:gap-12">
          {cases.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="case-card opacity-0"
            >
              <div className="case-card-accent" />
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <span className="text-label text-accent">{item.label}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-text mt-2">
                      {item.title}
                    </h3>
                    <p className="text-text-muted mt-1">{item.client}</p>
                  </div>
                  <div
                    className={`px-5 py-2.5 rounded-full bg-gradient-to-r ${item.accent} border border-border self-start`}
                  >
                    <span className="font-display font-semibold text-text text-sm">
                      {item.headline}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
                  {item.metrics.map((metric, j) => (
                    <div key={j}>
                      <p className="font-display text-2xl md:text-3xl font-bold text-accent">
                        {metric.value}
                      </p>
                      <p className="text-text-muted text-sm mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="text-text-muted text-base leading-relaxed mb-8 max-w-3xl">
                  {item.description}
                </p>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-3">
                  {item.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="text-accent mt-1.5 text-xs">●</span>
                      <span className="text-text text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
