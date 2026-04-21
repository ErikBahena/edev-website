"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BrowserFrame from "./BrowserFrame";

gsap.registerPlugin(ScrollTrigger);

const PHONE = "3608435566";

type LogoProject = {
  kind: "logo";
  src: string;
  alt: string;
  width: number;
  height: number;
  client: string;
  sub: string;
};

type SiteProject = {
  kind: "site" | "software";
  src: string;
  alt: string;
  width: number;
  height: number;
  appName: string;
  client: string;
  sub: string;
};

type Project = LogoProject | SiteProject;

type Service = {
  n: string;
  title: string;
  shortTitle: string; // Short label used in the chip
  smsBody: string;
  description: string;
  pricing: { name: string; price: string }[];
  projects: Project[];
};

const services: Service[] = [
  {
    n: "01",
    title: "Logo & Print Design",
    shortTitle: "Logo & Print",
    smsBody: "Hi Erik, I'm interested in Logo & Print Design. Can we chat?",
    description:
      "A logo that makes your business look like it takes itself seriously. Flyers, menus, business cards — everything that puts your name in front of customers. Fast turnaround, flat pricing, no surprises.",
    pricing: [
      { name: "Logo Design", price: "from $50" },
      { name: "Flyer / Print Design", price: "from $25" },
      { name: "Business Cards", price: "from $25" },
    ],
    projects: [
      {
        kind: "logo",
        src: "/stripe-logo.png",
        alt: "Elma Digital logo mark",
        width: 1200,
        height: 300,
        client: "Elma Digital",
        sub: "Our own brand · Elma, WA",
      },
    ],
  },
  {
    n: "02",
    title: "Website Design",
    shortTitle: "Websites",
    smsBody: "Hi Erik, I'm interested in getting a website built. Can we chat?",
    description:
      "A real website built for your business — not a $20/month template someone else's customers are also using. We build it, add a CMS so you can update it yourself, and make sure Google can actually find you.",
    pricing: [
      { name: "Single-page + CMS", price: "from $750" },
      { name: "Multi-page + CMS", price: "from $1,500" },
      { name: "Monthly maintenance", price: "ask us" },
    ],
    projects: [
      {
        kind: "site",
        src: "/dynamic-stylz.png",
        alt: "Dynamic Stylz Salon — hair salon website",
        width: 1600,
        height: 1041,
        appName: "dynamicstylz.com",
        client: "Dynamic Stylz Salon",
        sub: "Hair salon · Elma, WA",
      },
    ],
  },
  {
    n: "03",
    title: "Custom Software",
    shortTitle: "Custom Software",
    smsBody:
      "Hi Erik, I'm interested in Custom Software for my business. Can we chat?",
    description:
      "When your business has outgrown spreadsheets and generic tools. Every engagement starts with a free on-site visit — we sit with you, learn how your operation actually works, and only then do we build. Employee tracking, invoicing, inventory, reporting — whatever the bottleneck is.",
    pricing: [
      { name: "Custom build", price: "from $5,000" },
      { name: "Monthly support", price: "from $200/mo" },
      { name: "On-site discovery", price: "complimentary" },
    ],
    projects: [
      {
        kind: "software",
        src: "/paintmate-dashboard.png",
        alt: "PaintMate work entries dashboard",
        width: 3024,
        height: 1546,
        appName: "PaintMate",
        client: "Alberto's Residential Painting",
        sub: "Painting contractor · Elma, WA",
      },
      {
        kind: "software",
        src: "/herdlife-dashboard.png",
        alt: "HerdLife herd management dashboard",
        width: 2586,
        height: 1144,
        appName: "HerdLife",
        client: "Torres Dairy",
        sub: "Dairy farm · Grays Harbor, WA",
      },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-triggered reveal on first view
  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(
      sectionRef.current.querySelectorAll(".svc-reveal"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      }
    );
  }, []);

  // Fade the content area when switching tabs
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [active]);

  const service = services[active];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section bg-white"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="svc-reveal opacity-0 flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <p className="text-label text-accent mb-3">What We Do</p>
            <h2 className="text-heading font-display text-navy leading-[1.05]">
              Every digital need,
              <br />
              one local team.
            </h2>
          </div>
          <p className="text-body-lg text-text-muted max-w-xs md:text-right leading-relaxed hidden md:block">
            Start with a logo. End with software that runs your whole
            operation.
          </p>
        </div>

        {/* Tab chips */}
        <div className="svc-reveal opacity-0 flex flex-wrap gap-2 md:gap-3 pb-6 md:pb-8 border-b border-border mb-8 md:mb-10">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="group inline-flex items-center gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full font-display text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? "var(--navy)" : "transparent",
                  color: isActive ? "white" : "var(--navy)",
                  border: isActive
                    ? "1px solid var(--navy)"
                    : "1px solid var(--border-strong)",
                }}
              >
                <span
                  className="text-label"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,0.45)"
                      : "var(--text-dim)",
                  }}
                >
                  {s.n}
                </span>
                <span>{s.shortTitle}</span>
                <span
                  className="font-display font-medium text-xs"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,0.6)"
                      : "var(--accent)",
                  }}
                >
                  {s.pricing[0].price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active service content */}
        <div ref={contentRef} className="flex-1">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 md:gap-10 lg:gap-14 items-start">
            {/* Text + pricing + CTAs */}
            <div>
              <h3 className="font-display font-bold text-navy mb-4 leading-[1.1]" style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}>
                {service.title}
              </h3>
              <p className="text-body-lg text-text-muted leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mb-6 rounded-lg overflow-hidden border border-border">
                {service.pricing.map((tier, j) => (
                  <div
                    key={j}
                    className="bg-white px-4 py-3 sm:px-5 sm:py-4"
                  >
                    <p className="text-xs font-medium text-text-muted mb-1">
                      {tier.name}
                    </p>
                    <p className="font-display font-bold text-lg text-navy">
                      {tier.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`sms:${PHONE}?body=${encodeURIComponent(service.smsBody)}`}
                  className="btn-primary px-6 py-3 text-sm flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7A1.5 1.5 0 0 1 14.5 12H9l-3 3v-3H1.5A1.5 1.5 0 0 1 0 10.5v-7z" />
                  </svg>
                  Text us about this
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="btn-outline-dark px-6 py-3 text-sm"
                >
                  Call (360) 843-5566
                </a>
              </div>
            </div>

            {/* Showcase */}
            <ProjectShowcase projects={service.projects} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center bg-bg">
        <p className="text-sm font-display font-medium text-text-muted">
          Featured work coming soon.
        </p>
      </div>
    );
  }

  const columns = projects.length === 1 ? "grid-cols-1" : "sm:grid-cols-2";

  return (
    <div className={`grid ${columns} gap-5 md:gap-6`}>
      {projects.map((p, i) => (
        <ProjectCard key={i} project={p} />
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  if (project.kind === "logo") {
    return (
      <figure>
        <div
          className="rounded-xl flex items-center justify-center px-6 py-10 md:py-14"
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
          }}
        >
          <Image
            src={project.src}
            alt={project.alt}
            width={project.width}
            height={project.height}
            className="max-w-[70%] h-auto w-auto"
            sizes="(max-width: 768px) 60vw, 400px"
            quality={90}
          />
        </div>
        <figcaption className="mt-3">
          <p className="font-display font-semibold text-navy text-sm">
            {project.client}
          </p>
          <p className="text-text-muted text-xs mt-0.5">{project.sub}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure>
      <BrowserFrame
        src={project.src}
        alt={project.alt}
        width={project.width}
        height={project.height}
        appName={project.appName}
        sizes="(max-width: 768px) 100vw, 400px"
        quality={85}
        aspectRatio={project.kind === "site" ? "2 / 1" : undefined}
      />
      <figcaption className="mt-3">
        <p className="font-display font-semibold text-navy text-sm">
          {project.client}
        </p>
        <p className="text-text-muted text-xs mt-0.5">{project.sub}</p>
      </figcaption>
    </figure>
  );
}
