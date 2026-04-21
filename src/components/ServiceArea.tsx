"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  "Elma", "Aberdeen", "Hoquiam", "Montesano", "McCleary",
  "Ocean Shores", "Westport", "Cosmopolis", "Oakville",
  "Satsop", "Brady", "Porter",
];

export default function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".city-pill"),
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-6 md:px-14 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
        <div className="flex-shrink-0">
          <p className="text-label text-accent mb-2">Where We Work</p>
          <p className="font-display text-xl font-bold text-navy">Grays Harbor County</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {cities.map((city) => (
            <span key={city} className="city-pill opacity-0 px-4 py-2 rounded-full bg-white border border-border text-navy text-xs font-semibold font-display hover:border-blue hover:text-blue transition-colors">
              {city}
            </span>
          ))}
          <span className="city-pill opacity-0 px-4 py-2 rounded-full bg-blue-light border border-blue/25 text-blue text-xs font-semibold font-display">
            + surrounding areas
          </span>
        </div>
      </div>
    </section>
  );
}
