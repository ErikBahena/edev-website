"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    metric: "240+",
    metricLabel: "hours saved / year",
    industry: "Residential Painting",
    client: "Alberto's Residential Painting · Luis Cruz · Elma, WA",
    headline: "We automated the entire back office of a 4-person painting crew.",
    body: "Luis was spending his evenings in Google Sheets — tracking employee hours across multiple job sites, manually hunting down Sherwin-Williams invoices, calculating what to bill. We built PaintMate. Employees clock in on their phones. Materials import automatically. Invoices generate in one click.",
    tags: ["Employee Time Tracking", "SW Integration", "Automated Invoicing", "Payroll"],
  },
  {
    metric: "$75K+",
    metricLabel: "in software costs eliminated",
    industry: "Dairy Farming",
    client: "Torres Dairy · Jose Torres · Grays Harbor County, WA",
    headline: "We replaced a $75,000 industry system with something better — and cheaper.",
    body: "A power surge destroyed Jose's computer — and with it, his farm management software. The old vendor wanted $75,000+ to get back online. We built HerdLife: a web app accessible from any device. Workers, vets, and inspectors each have the access they need. His data belongs to him.",
    tags: ["Herd Lifecycle Tracking", "Role-Based Access", "Inspector Reports", "Bilingual (EN/ES)"],
  },
];

export default function CaseStudies() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    itemRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(el.querySelectorAll(".case-reveal"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" } });
    });
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 md:px-14 bg-navy">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20 pb-12 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div>
            <p className="text-label mb-4" style={{ color: "var(--amber)" }}>Our Work</p>
            <h2 className="text-heading font-display text-white">
              Results that<br />speak for themselves.
            </h2>
          </div>
          <p className="text-body-lg max-w-xs md:text-right" style={{ color: "rgba(255,255,255,0.35)" }}>
            Two local businesses.<br />Two real problems.<br />Two solutions built from scratch.
          </p>
        </div>

        {/* Cases */}
        <div className="space-y-20 md:space-y-28">
          {cases.map((c, i) => (
            <div key={i} ref={(el) => { itemRefs.current[i] = el; }}>
              <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-20 items-start">
                {/* Metric */}
                <div className="case-reveal opacity-0">
                  <div className="text-metric font-display text-blue leading-none">{c.metric}</div>
                  <p className="text-xs mt-2 font-display tracking-wide" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {c.metricLabel}
                  </p>
                </div>

                {/* Content */}
                <div>
                  <p className="case-reveal opacity-0 text-label mb-4" style={{ color: "var(--amber)" }}>{c.industry}</p>
                  <p className="case-reveal opacity-0 text-xs mb-5 font-display" style={{ color: "rgba(255,255,255,0.25)" }}>{c.client}</p>
                  <h3 className="case-reveal opacity-0 font-display font-semibold text-white mb-6 leading-snug"
                    style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                    {c.headline}
                  </h3>
                  <p className="case-reveal opacity-0 text-body-lg leading-relaxed mb-8"
                    style={{ color: "rgba(255,255,255,0.45)" }}>
                    {c.body}
                  </p>
                  <div className="case-reveal opacity-0 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded text-xs font-medium font-display"
                        style={{ background: "rgba(3,76,178,0.18)", color: "rgba(107,159,228,0.85)", border: "1px solid rgba(3,76,178,0.25)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {i < cases.length - 1 && (
                <div className="mt-20 md:mt-28 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
