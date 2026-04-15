"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    metric: "240+",
    metricLabel: "hours saved per year",
    industry: "Residential Painting",
    client: "Alberto\u2019s Residential Painting",
    person: "Luis Cruz",
    location: "Elma, WA",
    headline:
      "We automated the entire back office of a 4-person painting crew.",
    body: "Luis was spending his evenings in Google Sheets \u2014 tracking employee hours across multiple job sites, manually hunting down Sherwin-Williams invoices, calculating what to bill. We built PaintMate. Employees clock in on their phones. Materials import automatically. Invoices generate in one click. What took Luis an entire evening now takes five minutes.",
    tags: [
      "Employee Time Tracking",
      "SW Integration",
      "Automated Invoicing",
      "Payroll",
    ],
    image: "/paintmate-dashboard.png",
    imageAlt:
      "PaintMate dashboard showing work entries with employee time tracking and Gantt-style timeline",
    imageWidth: 3024,
    imageHeight: 1546,
    appName: "PaintMate",
  },
  {
    metric: "$100K+",
    metricLabel: "in software costs eliminated",
    industry: "Dairy Farming",
    client: "Torres Dairy",
    person: "Jose Torres",
    location: "Grays Harbor County, WA",
    headline:
      "We replaced a $100,000 industry system with something better \u2014 and cheaper.",
    body: "A power surge destroyed Jose\u2019s computer \u2014 and with it, his farm management software. The old vendor wanted $100,000+ to get back online, with his data locked in a format only they could read. We built HerdLife: a web app accessible from any device. Workers, vets, and inspectors each have the access they need. His data belongs to him.",
    tags: [
      "Herd Lifecycle Tracking",
      "Role-Based Access",
      "Inspector Reports",
      "Bilingual (EN/ES)",
    ],
    image: "/herdlife-dashboard.png",
    imageAlt:
      "HerdLife dashboard showing herd management table with animal filtering and lifecycle data",
    imageWidth: 2586,
    imageHeight: 1144,
    appName: "HerdLife",
  },
];

function BrowserFrame({
  src,
  alt,
  width,
  height,
  appName,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  appName: string;
}) {
  return (
    <div
      className="rounded-xl overflow-hidden bg-white"
      style={{
        border: "1px solid #DDD8CF",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.04), 0 12px 40px -8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#F6F6F6", borderBottom: "1px solid #E5E5E5" }}
      >
        <div className="flex gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FF5F57" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FEBC2E" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#28C840" }}
          />
        </div>
        <div className="flex-1 mx-4">
          <div
            className="bg-white rounded px-3 py-1 text-center max-w-[160px] mx-auto font-display font-medium"
            style={{
              fontSize: "11px",
              border: "1px solid #E0E0E0",
              color: "#999",
            }}
          >
            {appName}
          </div>
        </div>
        <div className="w-[42px]" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto block"
        sizes="(max-width: 768px) 100vw, 640px"
        quality={90}
      />
    </div>
  );
}

export default function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    sectionRef.current.querySelectorAll(".case-block").forEach((block) => {
      gsap.fromTo(
        block.querySelectorAll(".case-reveal"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: block, start: "top 82%" },
        }
      );
    });
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="py-24 md:py-36 px-6 md:px-14 bg-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-20 pb-10 border-b border-border">
          <p className="text-label text-amber mb-5">Our Work</p>
          <h2 className="text-heading font-display text-navy">The work.</h2>
        </div>

        {/* Projects */}
        <div className="space-y-28 md:space-y-36">
          {projects.map((p, i) => {
            const imageRight = i % 2 === 0;

            return (
              <div key={i} className="case-block">
                {/* Header row */}
                <div className="case-reveal opacity-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-10 md:mb-14">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ background: "var(--amber)" }}
                    />
                    <span
                      className="font-display font-bold leading-none"
                      style={{
                        fontSize: "clamp(2rem, 3.5vw, 3rem)",
                        color: "rgba(13,27,62,0.08)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-label text-amber">{p.industry}</p>
                  </div>
                  <p className="font-display text-sm font-medium text-text-muted">
                    {p.client}
                  </p>
                </div>

                {/* Main grid: image + text */}
                <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-start">
                  {/* Image column with decorative elements */}
                  <div
                    className={`case-reveal opacity-0 relative ${imageRight ? "md:order-2" : "md:order-1"}`}
                  >
                    {/* Decorative circle */}
                    <div
                      className="absolute rounded-full pointer-events-none hidden md:block"
                      style={{
                        width: "clamp(180px, 20vw, 280px)",
                        height: "clamp(180px, 20vw, 280px)",
                        border: "2px solid var(--amber)",
                        opacity: 0.1,
                        top: "-2.5rem",
                        ...(imageRight
                          ? { right: "-2rem" }
                          : { left: "-2rem" }),
                        zIndex: 0,
                      }}
                    />
                    {/* Small accent circle */}
                    <div
                      className="absolute rounded-full pointer-events-none hidden md:block"
                      style={{
                        width: "clamp(60px, 6vw, 90px)",
                        height: "clamp(60px, 6vw, 90px)",
                        background: "var(--blue)",
                        opacity: 0.06,
                        bottom: "-1.5rem",
                        ...(imageRight
                          ? { left: "-1rem" }
                          : { right: "-1rem" }),
                        zIndex: 0,
                      }}
                    />
                    <div className="relative z-10">
                      <BrowserFrame
                        src={p.image}
                        alt={p.imageAlt}
                        width={p.imageWidth}
                        height={p.imageHeight}
                        appName={p.appName}
                      />
                    </div>
                  </div>

                  {/* Text column */}
                  <div
                    className={`flex flex-col justify-center ${imageRight ? "md:order-1" : "md:order-2"}`}
                  >
                    <h3
                      className="case-reveal opacity-0 font-display font-bold text-navy leading-[1.08] mb-4"
                      style={{
                        fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                      }}
                    >
                      {p.headline}
                    </h3>

                    {/* Metric badge */}
                    <div className="case-reveal opacity-0 inline-flex items-center gap-3 mb-6 bg-blue-light rounded-lg px-4 py-2.5">
                      <span className="font-display font-bold text-blue text-xl md:text-2xl leading-none" style={{ letterSpacing: "-0.03em" }}>
                        {p.metric}
                      </span>
                      <span className="w-px h-5 bg-blue/15" />
                      <span className="font-display text-sm font-medium text-navy/50">
                        {p.metricLabel}
                      </span>
                    </div>

                    <p className="case-reveal opacity-0 text-body-lg leading-relaxed text-text-muted mb-8">
                      {p.body}
                    </p>

                    {/* Tags */}
                    <div className="case-reveal opacity-0 flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 text-xs font-display font-medium rounded-full border border-border text-text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
