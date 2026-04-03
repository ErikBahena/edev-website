"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 240, prefix: "", suffix: "+", label: "Hours saved per client per year" },
  { value: 75, prefix: "$", suffix: "K+", label: "In legacy software costs replaced" },
  { value: 2, prefix: "", suffix: "", label: "Local businesses transformed" },
];

function AnimatedCounter({ value, prefix = "", suffix = "", triggered }: {
  value: number; prefix?: string; suffix?: string; triggered: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power2.out",
      onUpdate: () => setDisplay(Math.round(obj.val)),
    });
  }, [triggered, value]);

  return (
    <span className="stat-number font-display">
      {prefix}{display}{suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => setTriggered(true),
      once: true,
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-6 md:px-10 bg-bg-elevated">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <AnimatedCounter {...stat} triggered={triggered} />
              <p className="text-text-muted mt-3 text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
