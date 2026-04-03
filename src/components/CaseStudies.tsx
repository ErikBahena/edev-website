"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    metric: "240+",
    metricLabel: "hours saved per year",
    industry: "Residential Painting",
    client: "Alberto's Residential Painting · Luis Cruz",
    headline: "We automated the entire back office of a 4-person painting crew.",
    body: "Luis was spending his evenings in Google Sheets — tracking employee hours across multiple job sites, manually hunting down Sherwin-Williams invoices, calculating what to bill. We built PaintMate. Employees clock in on their phones. Materials import automatically. Invoices generate in one click. What took Luis an entire evening now takes five minutes.",
    tags: ["Employee Time Tracking", "SW Integration", "Automated Invoicing", "Payroll"],
  },
  {
    metric: "$75K+",
    metricLabel: "in software costs eliminated",
    industry: "Dairy Farming",
    client: "Torres Dairy · Jose Torres",
    headline: "We replaced a $75,000 industry system with something better — and cheaper.",
    body: "A power surge destroyed Jose's computer — and with it, his farm management software. The old vendor wanted $75,000+ to get back online, with his data locked in a format only they could read. We built HerdLife: a web app accessible from any device. Workers, vets, and inspectors each have the access they need. When an inspector shows up, the report is one click away. His data belongs to him.",
    tags: ["Herd Lifecycle Tracking", "Role-Based Access", "Inspector Reports", "Bilingual (EN/ES)"],
  },
];

export default function CaseStudies() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(card, { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" } });
    });
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 md:px-14 bg-navy">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-12" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-label mb-4" style={{ color: "var(--amber)" }}>Our Work</p>
            <h2 className="text-heading font-display text-white">
              Results that<br />speak for themselves.
            </h2>
          </div>
          <p className="text-body-lg max-w-xs md:text-right" style={{ color: "rgba(255,255,255,0.4)" }}>
            Two local businesses. Two real problems. Two solutions built from scratch.
          </p>
        </div>

        {/* Case study cards */}
        <div className="space-y-6">
          {cases.map((c, i) => (
            <div key={i} ref={(el) => { cardsRef.current[i] = el; }}
              className="opacity-0 rounded-xl p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8 md:gap-16"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              {/* Metric */}
              <div className="md:text-right md:border-r md:pr-16" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                <div className="text-metric font-display text-blue leading-none">{c.metric}</div>
                <p className="text-sm mt-2 max-w-[12ch] md:ml-auto" style={{ color: "rgba(255,255,255,0.35)" }}>{c.metricLabel}</p>
                <p className="text-label mt-6" style={{ color: "var(--amber)" }}>{c.industry}</p>
              </div>

              {/* Content */}
              <div>
                <p className="text-xs font-medium mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>{c.client}</p>
                <h3 className="font-display font-semibold text-white mb-4 text-xl md:text-2xl leading-snug">
                  {c.headline}
                </h3>
                <p className="text-body-lg leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {c.body}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1.5 rounded text-xs font-medium font-display"
                      style={{ background: "rgba(3,76,178,0.2)", color: "rgba(107,159,228,0.9)", border: "1px solid rgba(3,76,178,0.3)" }}>
                      {tag}
                    </span>
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
