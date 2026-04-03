"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".about-reveal"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-bg">
      <div className="max-w-7xl mx-auto">
        {/* Large quote / intro */}
        <div className="mb-16 about-reveal opacity-0">
          <p className="text-label text-amber mb-6">Who&apos;s Behind This</p>
          <blockquote className="text-heading font-display text-navy max-w-4xl">
            &ldquo;I&apos;m a software engineer from Elma. I started this because I know what local business owners are up against.&rdquo;
          </blockquote>
        </div>

        {/* Two-column */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-12 md:gap-20 pt-12 border-t border-border">
          {/* Left */}
          <div className="space-y-5 about-reveal opacity-0">
            <p className="text-body-lg text-text-muted leading-relaxed">
              My name is Erik. I grew up here in Elma, and I started Elma Digital because I watched local business owners — people who are genuinely great at what they do — lose hours every week to admin work that should be handled by software.
            </p>
            <p className="text-body-lg text-text-muted leading-relaxed">
              I&apos;ve built a full invoicing and payroll platform for a local painting company. I&apos;ve built a herd management system for a dairy farm that replaced a $75,000 industry product. Both owners are people I know personally. That&apos;s how we work — close, specific, and for the long term.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-5 about-reveal opacity-0">
            <p className="text-body-lg text-text-muted leading-relaxed">
              Whether you need a $50 logo or a full business platform, you&apos;re talking to me directly. No outsourcing, no runaround, no agency markup. Just someone who knows this community and wants to see it win.
            </p>

            {/* Credentials bar */}
            <div className="pt-6 grid grid-cols-2 gap-4">
              {[
                { value: "2", label: "Local businesses built" },
                { value: "Elma", label: "Based right here" },
                { value: "$75K+", label: "In costs replaced" },
                { value: "240+", label: "Hours saved per client" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-lg bg-bg-warm border border-border">
                  <p className="font-display font-bold text-xl text-navy">{stat.value}</p>
                  <p className="text-xs text-text-muted mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
