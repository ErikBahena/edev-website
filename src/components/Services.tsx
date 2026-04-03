"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="4" width="32" height="32" rx="8" stroke="#034CB2" strokeWidth="1.5" opacity="0.3"/>
        <path d="M20 12C20 12 14 16 14 21C14 24.314 16.686 27 20 27C23.314 27 26 24.314 26 21C26 16 20 12 20 12Z" stroke="#034CB2" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M20 27V32" stroke="#034CB2" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M17 32H23" stroke="#034CB2" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: "Design",
    title: "Logo & Print Design",
    description:
      "A logo that makes your business look like it means business. Flyers, menus, business cards — everything that puts your name in front of customers.",
    pricing: [
      { name: "Logo Design", price: "from $50" },
      { name: "Flyer / Print Design", price: "from $25" },
    ],
    cta: "Get a logo",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="8" width="32" height="24" rx="3" stroke="#034CB2" strokeWidth="1.5" opacity="0.3"/>
        <path d="M4 14H36" stroke="#034CB2" strokeWidth="1.5"/>
        <circle cx="9" cy="11" r="1.5" fill="#034CB2" opacity="0.5"/>
        <circle cx="14" cy="11" r="1.5" fill="#034CB2" opacity="0.5"/>
        <path d="M12 22L16 26L28 18" stroke="#034CB2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Web",
    title: "Website Design",
    description:
      "A real website that gets your business found on Google. Not a template — built for your business, with a CMS so you can update it yourself.",
    pricing: [
      { name: "Single-page + CMS", price: "from $750" },
      { name: "Multi-page + CMS", price: "from $1,500" },
    ],
    cta: "Get a website",
  },
  {
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="4" y="4" width="32" height="32" rx="4" stroke="#034CB2" strokeWidth="1.5" opacity="0.3"/>
        <path d="M14 20H26M20 14V26" stroke="#034CB2" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="10" y="10" width="8" height="6" rx="1.5" stroke="#034CB2" strokeWidth="1.5"/>
        <rect x="22" y="24" width="8" height="6" rx="1.5" stroke="#034CB2" strokeWidth="1.5"/>
      </svg>
    ),
    label: "Software",
    title: "Custom Software",
    description:
      "When your business has outgrown spreadsheets and generic software. We watch how you work, then build something that fits — employee tracking, invoicing, reporting, whatever you need.",
    pricing: [
      { name: "Priced on value saved", price: "Let's talk" },
    ],
    cta: "Book a call",
    featured: true,
  },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" } }
      );
    });
  }, []);

  return (
    <section id="services" className="py-24 md:py-36 px-6 md:px-10 bg-bg">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-amber mb-4">What We Do</p>
        <h2 className="text-section-heading font-display text-navy mb-4 max-w-3xl">
          Everything your business needs to show up and run better.
        </h2>
        <p className="text-body-lg text-text-muted mb-16 md:mb-20 max-w-2xl">
          Start small or go big — we work with businesses at every stage.
        </p>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`opacity-0 rounded-xl p-8 flex flex-col border transition-all duration-300 hover:-translate-y-1 ${
                service.featured
                  ? "bg-navy border-blue/30 hover:border-blue/60"
                  : "bg-white border-border hover:border-blue/40 hover:shadow-lg"
              }`}
            >
              <div className="mb-5">{service.icon}</div>
              <span className={`text-label mb-2 ${service.featured ? "text-amber" : "text-amber"}`}>
                {service.label}
              </span>
              <h3 className={`font-display text-xl md:text-2xl font-semibold mb-3 ${service.featured ? "text-white" : "text-navy"}`}>
                {service.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-6 flex-1 ${service.featured ? "text-white/60" : "text-text-muted"}`}>
                {service.description}
              </p>

              {/* Pricing */}
              <div className={`rounded-lg p-4 mb-6 ${service.featured ? "bg-white/5 border border-white/10" : "bg-bg-elevated border border-border"}`}>
                {service.pricing.map((tier, j) => (
                  <div key={j} className={`flex items-center justify-between ${j > 0 ? "mt-2 pt-2 border-t " + (service.featured ? "border-white/10" : "border-border") : ""}`}>
                    <span className={`text-sm ${service.featured ? "text-white/60" : "text-text-muted"}`}>{tier.name}</span>
                    <span className={`text-sm font-semibold font-display ${service.featured ? "text-white" : "text-navy"}`}>{tier.price}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`text-center text-sm font-semibold font-display py-3 px-6 rounded-full transition-all duration-200 ${
                  service.featured
                    ? "bg-blue text-white hover:bg-blue-dark"
                    : "bg-navy text-white hover:bg-navy/80"
                }`}
              >
                {service.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
