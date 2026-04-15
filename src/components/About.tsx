"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "2", label: "businesses built" },
  { value: "$100K+", label: "in costs replaced" },
  { value: "240+", label: "hours saved / yr" },
  { value: "0", label: "outsourced" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current.querySelectorAll(".about-reveal"),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-14 bg-bg-warm">
      <div className="max-w-7xl mx-auto">

        {/* Quote + photo */}
        <div className="mb-16 about-reveal opacity-0">
          <p className="text-label text-amber mb-8">Who&apos;s Behind This</p>
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">
            <blockquote className="text-heading font-display text-navy max-w-3xl">
              &ldquo;I&apos;m a software engineer from Elma. I started this
              because I know what local business owners are up
              against.&rdquo;
            </blockquote>
            <div className="flex-shrink-0 relative">
              {/* Decorative ring */}
              <div
                className="absolute rounded-full pointer-events-none hidden md:block"
                style={{
                  width: "clamp(280px, 22vw, 360px)",
                  height: "clamp(280px, 22vw, 360px)",
                  border: "2px solid var(--amber)",
                  opacity: 0.15,
                  top: "-28px",
                  right: "-32px",
                }}
              />
              <div
                className="rounded-2xl overflow-hidden relative z-10"
                style={{
                  width: "clamp(180px, 16vw, 260px)",
                  aspectRatio: "3 / 4",
                  boxShadow: "0 8px 30px -8px rgba(0,0,0,0.12)",
                }}
              >
                <Image
                  src="/erik.jpg"
                  alt="Erik Bahena, founder of Elma Digital"
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                  quality={85}
                />
              </div>
              <p className="font-display font-semibold text-navy text-sm mt-4 text-center">Erik Bahena</p>
              <p className="text-text-muted text-xs text-center">Founder &middot; Elma, WA</p>
            </div>
          </div>
        </div>

        {/* Rule + two col */}
        <div className="pt-12 border-t border-border grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-start">
          <div className="space-y-5">
            <p className="about-reveal opacity-0 text-body-lg text-text-muted leading-relaxed">
              My name is Erik. I grew up here and started Elma Digital because local business owners — people who are genuinely great at what they do — lose hours every week to admin work that should be handled by software.
            </p>
            <p className="about-reveal opacity-0 text-body-lg text-text-muted leading-relaxed">
              Whether you need a $50 logo or a full business platform, you&apos;re talking to me directly. No outsourcing, no runaround. Just someone who knows this community and wants to see it win.
            </p>
          </div>

          {/* Stats */}
          <div className="about-reveal opacity-0 grid grid-cols-2 gap-x-12 gap-y-8 flex-shrink-0">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-display font-bold text-3xl md:text-4xl text-navy leading-none mb-1">{s.value}</p>
                <p className="text-xs text-text-muted font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
