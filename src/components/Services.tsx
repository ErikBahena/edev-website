"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    n: "01",
    title: "Logo & Print Design",
    description: "A logo that makes your business look like it takes itself seriously. Flyers, menus, business cards — everything that puts your name in front of customers. Fast turnaround, flat pricing, no surprises.",
    pricing: [
      { name: "Logo Design", price: "from $50" },
      { name: "Flyer / Print Design", price: "from $25" },
      { name: "Business Cards", price: "from $25" },
    ],
  },
  {
    n: "02",
    title: "Website Design",
    description: "A real website built for your business — not a $20/month template someone else's customers are also using. We build it, we add a CMS so you can update it yourself, and we make sure Google can actually find you.",
    pricing: [
      { name: "Single-page + CMS", price: "from $750" },
      { name: "Multi-page + CMS", price: "from $1,500" },
      { name: "Monthly maintenance", price: "ask us" },
    ],
  },
  {
    n: "03",
    title: "Custom Software",
    description: "When your business has outgrown spreadsheets and generic tools. We sit with you, learn how your operation actually works, and build software that fits — employee tracking, invoicing, inventory, reporting, whatever the bottleneck is. Priced on the value we save you, not the hours we work.",
    pricing: [
      { name: "Discovery call", price: "free" },
      { name: "Custom build", price: "from $5,000" },
      { name: "Monthly support", price: "from $200/mo" },
    ],
    featured: true,
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(row, { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" } });
    });
  }, []);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-label text-amber mb-4">What We Do</p>
            <h2 className="text-heading font-display text-navy">
              Every digital need,<br />one local team.
            </h2>
          </div>
          <p className="text-body-lg text-text-muted max-w-xs md:text-right">
            Start with a logo. End up with software that runs your whole operation.
          </p>
        </div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <div key={i} ref={(el) => { rowRefs.current[i] = el; }} className="opacity-0">
              {/* Row */}
              <button
                onClick={() => toggle(i)}
                className="w-full border-t border-border py-7 flex items-center gap-6 md:gap-10 text-left group"
                style={{ borderColor: open === i ? "var(--border-strong)" : "" }}
              >
                {/* Number */}
                <span className="font-display text-xs font-semibold text-text-muted w-6 flex-shrink-0 group-hover:text-navy transition-colors">
                  {s.n}
                </span>

                {/* Title */}
                <span className={`text-service font-display flex-1 transition-colors duration-200 ${open === i ? "text-blue" : "text-navy group-hover:text-blue"}`}>
                  {s.title}
                </span>

                {/* Price range */}
                <span className="font-display font-medium text-sm text-amber hidden md:block flex-shrink-0">
                  {s.pricing[0].price}
                </span>

                {/* Arrow */}
                <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:border-navy ${open === i ? "bg-navy border-navy rotate-45" : ""}`}>
                  <svg className={`w-3.5 h-3.5 transition-colors ${open === i ? "text-white" : "text-text-muted group-hover:text-navy"}`} viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              {/* Expanded */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pb-8 pl-12 md:pl-16 grid md:grid-cols-[1fr_auto] gap-8 items-start">
                  <p className="text-body-lg text-text-muted max-w-xl leading-relaxed">
                    {s.description}
                  </p>
                  <div className="bg-bg-warm rounded-lg p-5 min-w-[220px]">
                    {s.pricing.map((tier, j) => (
                      <div key={j} className={`flex justify-between items-baseline gap-6 ${j > 0 ? "mt-3 pt-3 border-t border-border" : ""}`}>
                        <span className="text-sm text-text-muted">{tier.name}</span>
                        <span className="font-display font-semibold text-sm text-navy whitespace-nowrap">{tier.price}</span>
                      </div>
                    ))}
                    <a href="#contact" className="mt-5 block text-center btn-primary py-2.5 text-sm">
                      Get started →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
