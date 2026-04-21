"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";
const EMAIL = "erik@elmadigital.io";
const SMS_INTRO = "Hi Erik, I'd like to chat about a project.";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".cta-reveal"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      }
    );
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section bg-navy relative overflow-hidden"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 30% 50%, rgba(var(--blue-rgb),0.22) 0%, transparent 70%)",
        }}
      />

      {/* Constrained inner so the two halves can each have real column width
          instead of the old [1fr_auto] that left the cards cramped and the
          left side floating in empty space. */}
      <div className="max-w-6xl mx-auto relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* ─── Left: statement ─── */}
          <div>
            <p
              className="cta-reveal text-label mb-6 opacity-0"
              style={{ color: "var(--accent)" }}
            >
              Contact &middot; Elma, WA
            </p>
            <h2 className="cta-reveal text-heading font-display text-white mb-6 opacity-0">
              Let&apos;s talk about
              <br />
              your business.
            </h2>
            <p
              className="cta-reveal text-body-lg opacity-0 max-w-md mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Logo this week or software that runs your whole operation —
              reach out and we&apos;ll figure out what fits. No pitch, just a
              real conversation.
            </p>

            {/* Trust chips */}
            <div className="cta-reveal opacity-0 flex flex-wrap gap-x-6 gap-y-2">
              {[
                "Free consultation",
                "No pressure",
                "Locally owned",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 text-xs font-display font-medium"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* ─── Right: action stack ─── */}
          <div className="flex flex-col gap-3">
            {/* Phone */}
            <a
              href={`tel:${PHONE}`}
              className="cta-reveal opacity-0 group flex items-center gap-5 p-5 md:p-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-12 h-12 rounded-lg bg-blue flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.04]">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M14 10.667c-1.067 0-2.1-.167-3.067-.467a.967.967 0 0 0-1 .234l-1.9 1.9A12.067 12.067 0 0 1 2.667 5.967l1.9-1.9c.266-.267.35-.634.233-1A9.897 9.897 0 0 1 2.333 2C2.333 1.4 1.933 1 1.333 1H1C.4 1 0 1.4 0 2c0 7.733 6.267 14 14 14 .6 0 1-.4 1-1v-.333c0-.6-.4-1-1-1z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[0.7rem] font-semibold mb-1 tracking-[0.15em] uppercase"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Call or Text
                </p>
                <p className="font-display font-semibold text-white text-lg md:text-xl">
                  {PHONE_DISPLAY}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            {/* Email */}
            <a
              href={`mailto:${EMAIL}`}
              className="cta-reveal opacity-0 group flex items-center gap-5 p-5 md:p-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-[1.04]"
                style={{ background: "rgba(var(--accent-rgb),0.22)" }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: "var(--accent)" }}
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[0.7rem] font-semibold mb-1 tracking-[0.15em] uppercase"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Email
                </p>
                <p className="font-display font-semibold text-white text-lg md:text-xl truncate">
                  {EMAIL}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>

            {/* Primary action — SMS prefilled. The accent color stands out
                on navy and is on-brand (used throughout the site). */}
            <a
              href={`sms:${PHONE}?body=${encodeURIComponent(SMS_INTRO)}`}
              className="cta-reveal opacity-0 inline-flex items-center justify-center gap-2 mt-1 px-6 py-4 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "var(--accent)",
                color: "var(--navy)",
                boxShadow: "0 8px 24px -8px rgba(var(--accent-rgb),0.4)",
              }}
            >
              Start a Text Conversation
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
