"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  "Elma", "Aberdeen", "Hoquiam", "Montesano",
  "McCleary", "Ocean Shores", "Westport", "Cosmopolis",
  "Oakville", "Satsop", "Brady", "Porter",
];

export default function ServiceArea() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".city-tag"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 px-6 md:px-10 bg-bg border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <p className="text-label text-amber mb-2">Service Area</p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy">
              Serving all of<br />Grays Harbor County
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {cities.map((city) => (
              <span
                key={city}
                className="city-tag opacity-0 px-4 py-2 rounded-full border border-border bg-white text-navy text-sm font-medium font-display hover:border-blue hover:text-blue transition-colors"
              >
                {city}
              </span>
            ))}
            <span className="city-tag opacity-0 px-4 py-2 rounded-full border border-blue/30 bg-blue-light text-blue text-sm font-medium font-display">
              + surrounding areas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
