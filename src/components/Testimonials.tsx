"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Client proof.
 *
 * `summary` is a third-person description of how each client runs their
 * business today — verifiable, and nothing is put in their mouths.
 * `quote` is reserved for the client's actual words. When a real Google
 * review lands, paste it into `quote` (and set `stars`) and the card switches
 * to a real quotation with a star row. Until then it renders as a summary.
 * Never invent a quote here.
 */
type Proof = {
  name: string;
  role: string;
  location: string;
  headshot: string;
  project: string;
  summary: string;
  quote?: string;   // client's actual words only
  stars?: number;   // 1–5, only alongside a real quote
  source?: string;  // e.g. "Google review"
};

const testimonials: Proof[] = [
  {
    name: "Luis Cruz",
    role: "Owner, Alberto\u2019s Residential Painting",
    location: "Elma, WA",
    headshot: "/headshot-luis.jpg",
    project: "PaintMate",
    summary:
      "Luis\u2019s crew clocks in on their phones. Every job, every hour, every material run is already logged by the time he sits down to invoice. What used to take an evening of spreadsheets now takes about five minutes.",
  },
  {
    name: "Jose Torres",
    role: "Owner, Torres Dairy",
    location: "Lewis County, WA",
    headshot: "/headshot-jose.jpg",
    project: "HerdLife",
    summary:
      "Jose checks his herd from his phone in the barn. His vets log in from their own devices to record preg checks. When an inspector shows up, the report is ready in seconds \u2014 and the data lives in a standard database that belongs to him.",
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
            <p className="text-label text-accent mb-5">Who we build for</p>
            <h2 className="text-heading font-display text-navy">
              How they run now.
            </h2>
          </div>
          <p className="text-body-lg text-text-muted max-w-xs md:text-right">
            Two local businesses, two custom
            <br />
            builds, both in daily use.
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

              {/* Body: real quote if we have one; otherwise a summary, no quote marks. */}
              <div className="relative flex-1">
                {t.quote && (
                  <span
                    className="absolute -top-3 -left-1 font-display font-bold leading-none select-none pointer-events-none"
                    style={{ fontSize: "5rem", color: "rgba(var(--accent-rgb),0.1)" }}
                  >
                    &ldquo;
                  </span>
                )}
                {t.quote && t.stars ? (
                  <p className="text-sm mb-2" style={{ color: "var(--accent)", letterSpacing: "0.08em" }} aria-label={`${t.stars} out of 5 stars`}>
                    {"\u2605".repeat(t.stars)}
                    {t.source && <span className="ml-2 text-xs" style={{ color: "var(--text-muted)", letterSpacing: 0 }}>{t.source}</span>}
                  </p>
                ) : null}
                <p
                  className="relative font-display text-navy leading-[1.55] pt-4"
                  style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)", fontWeight: 500 }}
                >
                  {t.quote ?? t.summary}
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
