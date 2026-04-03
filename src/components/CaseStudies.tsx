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
    client: "Alberto's Residential Painting",
    person: "Luis Cruz · Elma, WA",
    headline: "We automated the entire back office of a 4-person painting crew.",
    body: "Luis was spending his evenings in Google Sheets — tracking employee hours across multiple job sites, manually hunting down Sherwin-Williams invoices, calculating what to bill. We built PaintMate. Employees clock in on their phones. Materials import automatically. Invoices generate in one click. What took Luis an entire evening now takes five minutes.",
    tags: ["Employee Time Tracking", "SW Integration", "Automated Invoicing", "Payroll"],
  },
  {
    metric: "$75K+",
    metricLabel: "in software costs eliminated",
    industry: "Dairy Farming",
    client: "Torres Dairy",
    person: "Jose Torres · Grays Harbor County, WA",
    headline: "We replaced a $75,000 industry system with something better — and cheaper.",
    body: "A power surge destroyed Jose's computer — and with it, his farm management software. The old vendor wanted $75,000+ to get back online, with his data locked in a format only they could read. We built HerdLife: a web app accessible from any device. Workers, vets, and inspectors each have the access they need. His data belongs to him.",
    tags: ["Herd Lifecycle Tracking", "Role-Based Access", "Inspector Reports", "Bilingual (EN/ES)"],
  },
];

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll(".case-block").forEach((block) => {
      gsap.fromTo(block.querySelectorAll(".case-reveal"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 82%" } });
    });
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-navy">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-20 pb-10 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-label mb-5" style={{ color: "var(--amber)" }}>Our Work</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-heading font-display text-white">
              The work.
            </h2>
            <p className="text-body-lg max-w-xs md:text-right" style={{ color: "rgba(255,255,255,0.3)" }}>
              Two local businesses.<br />Two real problems.<br />Two builds from scratch.
            </p>
          </div>
        </div>

        {/* Cases */}
        <div className="space-y-0">
          {cases.map((c, i) => (
            <div key={i} className="case-block py-16 md:py-24 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>

              {/* Client header row */}
              <div className="case-reveal opacity-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-10">
                <p className="text-label" style={{ color: "var(--amber)" }}>{c.industry}</p>
                <p className="font-display text-sm font-medium" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {c.client} &nbsp;·&nbsp; {c.person}
                </p>
              </div>

              {/* Main grid: metric left, content right */}
              <div className="grid md:grid-cols-[2fr_3fr] gap-10 md:gap-16 items-start">

                {/* Metric column */}
                <div className="case-reveal opacity-0">
                  <div className="font-display font-bold text-blue leading-none"
                    style={{ fontSize: "clamp(5rem, 9vw, 10rem)", letterSpacing: "-0.05em" }}>
                    {c.metric}
                  </div>
                  <p className="font-display text-sm font-medium mt-3" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {c.metricLabel}
                  </p>
                </div>

                {/* Content column */}
                <div>
                  <h3 className="case-reveal opacity-0 font-display font-bold text-white mb-6 leading-[1.1]"
                    style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.25rem)" }}>
                    {c.headline}
                  </h3>
                  <p className="case-reveal opacity-0 text-body-lg leading-relaxed mb-10"
                    style={{ color: "rgba(255,255,255,0.45)" }}>
                    {c.body}
                  </p>
                  <p className="case-reveal opacity-0 text-sm font-display font-medium" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {c.tags.join(" · ")}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
