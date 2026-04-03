"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    label: "Custom Software",
    title: "Alberto's Residential Painting",
    client: "Luis Cruz, Owner",
    headline: "Eliminated hours of manual invoicing",
    metrics: [
      { value: "4", label: "Employees tracked automatically" },
      { value: "30+", label: "Minutes saved per invoice" },
      { value: "0", label: "Manual data entry" },
    ],
    description:
      "Luis runs a 4-person painting crew across multiple job sites. Before, he spent his evenings in Google Sheets tracking employee hours, hunting down Sherwin-Williams invoices one by one, and manually calculating what to bill. We built PaintMate — employees clock in on their phones, materials pull in automatically, and invoices generate with everything already calculated. What took an evening now takes 5 minutes.",
    features: [
      "Employee clock-in/out per project and labor type",
      "Automated Sherwin-Williams purchase import",
      "One-click invoice generation with PDF email",
      "Automated biweekly payroll calculation",
    ],
  },
  {
    label: "Custom Software",
    title: "Torres Dairy",
    client: "Jose Torres, Owner",
    headline: "Replaced a $75,000+ system",
    metrics: [
      { value: "$75K+", label: "In legacy software costs replaced" },
      { value: "4", label: "Staff roles with access" },
      { value: "100%", label: "Data ownership" },
    ],
    description:
      "A power surge destroyed Jose's computer — and with it, his farm management software. His previous vendor wanted $75,000+ just to get back online, with his data locked in a format only they could read. We built HerdLife — a web app he can access from any device. Workers, vets, and inspectors each have the access they need. When an inspector shows up, the report is one click away. His data is his.",
    features: [
      "Full herd lifecycle tracking (breeding, calving, medications, vet checks)",
      "Inspector-ready reports with CSV/PDF export",
      "Role-based access for workers, vets, and inspectors",
      "Bilingual interface — English and Spanish",
    ],
  },
];

export default function CaseStudies() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        }
      );
    });
  }, []);

  return (
    <section id="work" className="py-24 md:py-36 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-amber mb-4">Our Work</p>
        <h2 className="text-section-heading font-display text-navy mb-16 md:mb-20 max-w-4xl">
          Real businesses. Real results.
        </h2>

        <div className="flex flex-col gap-8 md:gap-10">
          {cases.map((item, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="case-card opacity-0"
            >
              <div className="case-card-accent" />
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <span className="text-label text-amber">{item.label}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-navy mt-2">
                      {item.title}
                    </h3>
                    <p className="text-text-muted mt-1 text-sm">{item.client}</p>
                  </div>
                  <div className="px-5 py-2.5 rounded-full bg-blue-light border border-blue/20 self-start">
                    <span className="font-display font-semibold text-blue text-sm">
                      {item.headline}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
                  {item.metrics.map((metric, j) => (
                    <div key={j}>
                      <p className="font-display text-2xl md:text-3xl font-bold text-blue">
                        {metric.value}
                      </p>
                      <p className="text-text-muted text-sm mt-1">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-text-muted text-base leading-relaxed mb-8 max-w-3xl">
                  {item.description}
                </p>

                <div className="grid md:grid-cols-2 gap-3">
                  {item.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="text-blue mt-1.5 text-xs flex-shrink-0">●</span>
                      <span className="text-navy text-sm">{feature}</span>
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
