"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" } }
    );
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 md:px-10 bg-bg-elevated">
      <div className="max-w-7xl mx-auto">
        <div ref={contentRef} className="opacity-0 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Avatar placeholder */}
          <div className="flex justify-center md:justify-start">
            <div className="relative">
              <div
                className="w-64 h-64 md:w-80 md:h-80 rounded-2xl flex items-center justify-center font-display font-bold text-8xl text-white"
                style={{ background: "linear-gradient(135deg, var(--blue) 0%, var(--navy) 100%)" }}
              >
                E
              </div>
              {/* Tag */}
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl px-4 py-3 shadow-lg border border-border">
                <p className="text-xs text-text-muted font-medium">Based in</p>
                <p className="text-sm font-display font-bold text-navy">Elma, WA 🦅</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-label text-amber mb-4">Who We Are</p>
            <h2 className="text-section-heading font-display text-navy mb-6">
              A local business,<br />building for local businesses.
            </h2>
            <div className="space-y-4 text-text-muted text-base leading-relaxed">
              <p>
                My name is Erik. I&apos;m a software engineer from right here in Elma —
                and I started Elma Digital because I saw what local business owners were
                up against. Great at their trade. Buried in admin.
              </p>
              <p>
                I&apos;ve built software for a painting company that eliminated hours of
                manual invoicing. I built a farm management platform that replaced a
                $75,000 system a dairy farmer was being pressured to buy. Both owners are
                people I know personally. That&apos;s how we work — close, specific, and
                for the long term.
              </p>
              <p>
                Whether you need a $50 logo or a full business platform, you&apos;re
                talking to me directly. No outsourcing, no runaround. Just someone who
                knows this community and wants to see it win.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a href="#contact" className="btn-primary px-7 py-3 text-sm">
                Let&apos;s Talk
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
