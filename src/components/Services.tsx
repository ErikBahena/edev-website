"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "3608435566";

const services = [
  {
    n: "01",
    title: "Logo & Print Design",
    smsBody: "Hi Erik, I'm interested in Logo & Print Design. Can we chat?",
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
    smsBody: "Hi Erik, I'm interested in getting a website built. Can we chat?",
    description: "A real website built for your business — not a $20/month template someone else's customers are also using. We build it, add a CMS so you can update it yourself, and make sure Google can actually find you.",
    pricing: [
      { name: "Single-page + CMS", price: "from $750" },
      { name: "Multi-page + CMS", price: "from $1,500" },
      { name: "Monthly maintenance", price: "ask us" },
    ],
  },
  {
    n: "03",
    title: "Custom Software",
    smsBody: "Hi Erik, I'm interested in Custom Software for my business. Can we chat?",
    description: "When your business has outgrown spreadsheets and generic tools. We sit with you, learn how your operation actually works, and build software that fits — employee tracking, invoicing, inventory, reporting, whatever the bottleneck is.",
    pricing: [
      { name: "Discovery call", price: "free" },
      { name: "Custom build", price: "from $5,000" },
      { name: "Monthly support", price: "from $200/mo" },
    ],
  },
];

export default function Services() {
  const [open, setOpen] = useState<number | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(row, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, delay: i * 0.08, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%" } });
    });
  }, []);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-14 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 pb-10 border-b border-border">
          <div>
            <p className="text-label text-accent mb-3">What We Do</p>
            <h2 className="text-heading font-display text-navy">
              Every digital need,<br />one local team.
            </h2>
          </div>
          <p className="text-body-lg text-text-muted max-w-xs md:text-right leading-relaxed">
            Start with a logo.<br className="hidden md:block" />
            End with software that runs<br className="hidden md:block" />
            your whole operation.
          </p>
        </div>

        {/* Service rows */}
        <div>
          {services.map((s, i) => (
            <div key={i} ref={(el) => { rowRefs.current[i] = el; }} className="opacity-0">

              {/* Row header */}
              <button
                onClick={() => toggle(i)}
                className="w-full border-t border-border py-7 flex items-center gap-5 md:gap-8 text-left group"
              >
                <span className="text-label text-text-dim w-7 flex-shrink-0 group-hover:text-navy transition-colors">
                  {s.n}
                </span>
                <span className={`text-heading font-display flex-1 leading-[1.05] transition-colors duration-200 ${open === i ? "text-blue" : "text-navy group-hover:text-blue"}`}>
                  {s.title}
                </span>
                <span className="font-display font-semibold text-base text-accent hidden md:block flex-shrink-0">
                  {s.pricing[0].price}
                </span>
                <span className={`flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center transition-all duration-300 group-hover:border-navy ${open === i ? "bg-navy border-navy rotate-45" : ""}`}>
                  <svg className={`w-3.5 h-3.5 transition-colors ${open === i ? "text-white" : "text-text-muted group-hover:text-navy"}`} viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              {/* Expanded panel */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open === i ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pb-12 md:pl-[3.75rem]">

                  {/* Description */}
                  <p className="text-body-lg text-text-muted leading-relaxed max-w-2xl mb-10">
                    {s.description}
                  </p>

                  {/* Pricing — clean columns, no box */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-10 rounded-lg overflow-hidden border border-border">
                    {s.pricing.map((tier, j) => (
                      <div key={j} className="bg-white px-5 py-4 sm:px-6 sm:py-5">
                        <p className="text-xs font-medium text-text-muted mb-1.5">{tier.name}</p>
                        <p className="font-display font-bold text-xl text-navy">{tier.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 justify-end">
                    <a
                      href={`sms:${PHONE}?body=${encodeURIComponent(s.smsBody)}`}
                      className="btn-primary px-7 py-3 text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7A1.5 1.5 0 0 1 14.5 12H9l-3 3v-3H1.5A1.5 1.5 0 0 1 0 10.5v-7z"/>
                      </svg>
                      Text us about this
                    </a>
                    <a
                      href={`tel:${PHONE}`}
                      className="btn-outline-dark px-7 py-3 text-sm"
                    >
                      Call (360) 843-5566
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
