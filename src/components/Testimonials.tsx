"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    quote: "I used to spend my evenings in spreadsheets trying to figure out who worked where and what to bill. Now my guys clock in on their phones and when it's time to invoice, everything's already there. Erik built something that actually fits how my business works.",
    name: "Luis Cruz",
    role: "Owner — Alberto's Residential Painting LLC",
    location: "Elma, WA",
  },
  {
    quote: "When my computer died, I thought I lost everything. The old software company wanted over $75,000 just to get me back up and running. Erik built me something better — I can check my herd from my phone, my vets can log in from anywhere, and I don't have to worry about losing my data again.",
    name: "Jose Torres",
    role: "Owner — Torres Dairy",
    location: "Grays Harbor County, WA",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".quote-card"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-bg-warm">
      <div className="max-w-7xl mx-auto">
        <p className="text-label text-amber mb-12">What Clients Say</p>

        <div className="grid md:grid-cols-2 gap-1">
          {quotes.map((q, i) => (
            <div key={i} className="quote-card opacity-0 p-8 md:p-12 bg-white border border-border rounded-xl flex flex-col">
              {/* Large opening quote */}
              <div className="font-display text-7xl leading-none text-blue/15 mb-4 font-bold select-none">&ldquo;</div>
              <p className="text-body-lg text-navy leading-relaxed flex-1 mb-8">
                {q.quote}
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-blue flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-white text-sm">{q.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-display font-semibold text-navy text-sm">{q.name}</p>
                  <p className="text-text-muted text-xs">{q.role}</p>
                </div>
                <span className="ml-auto text-xs font-medium text-amber font-display">{q.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
