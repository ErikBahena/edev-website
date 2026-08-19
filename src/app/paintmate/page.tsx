import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BrowserFrame from "@/components/BrowserFrame";
import GrainOverlay from "@/components/GrainOverlay";
import Footer from "@/components/Footer";

import ProofStrip from "@/components/ProofStrip";
import MobileActionBar from "@/components/MobileCallButton";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";
const EMAIL = "erik@elmadigital.io";
const SMS_BODY = encodeURIComponent(
  "Hi Erik — I'd like to learn more about PaintMate for my crew.",
);

export const metadata: Metadata = {
  title: "PaintMate — Custom Software for Painters & Contractors | Elma Digital",
  description:
    "Phone clock-in, supplier integration, one-click invoicing for painting contractors and trades. Built around how your crew actually runs. Made by Elma Digital in Grays Harbor, WA.",
  openGraph: {
    title: "PaintMate — Get Your Evenings Back",
    description:
      "Custom job-cost software for painters and contractors. Phone clock-in, Sherwin-Williams automation, invoicing in 5 minutes instead of an evening.",
    type: "website",
  },
};

const FEATURES = [
  {
    n: "01",
    title: "Phone clock-in for the crew",
    body: "Your guys clock in and out from their phones, select the project and labor type, and the system records everything by job, role, and date. No more end-of-day texts asking what they worked on. No more guessing on payroll.",
  },
  {
    n: "02",
    title: "Sherwin-Williams (and any supplier) automation",
    body: "Sherwin-Williams doesn't offer an integration. We built one. The system logs into your account, pulls invoices, extracts every line item from the PDFs, and auto-matches purchases to projects by PO number — including the misspellings cashiers introduce. What used to take 30+ minutes per project happens with one click.",
  },
  {
    n: "03",
    title: "Invoicing in 5 minutes",
    body: "When you're ready to bill, everything's already there. Labor pre-calculated at the right rate per labor type. Materials pulled in with markup applied. Tax computed. You review, click send, your client gets a professional PDF invoice by email.",
  },
  {
    n: "04",
    title: "Automated biweekly payroll",
    body: "Payroll runs off the same clocked hours. No manual math. No reconciling spreadsheets against texts. The crew gets paid on the hours they actually worked, on the jobs they actually worked on.",
  },
  {
    n: "05",
    title: "Built for multi-job, multi-crew operations",
    body: "If your crew is across multiple job sites in a day — and most of them are — the system handles it. Workers tag time to the project. Materials tag to the project. Your P&L by job is real instead of \"close enough.\"",
  },
  {
    n: "06",
    title: "Your software, your business",
    body: "Custom-built for how your operation actually runs. Add a customer portal, scheduling, equipment tracking, or subcontractor management over time. Owned, not rented. No annual lock-in like Procore or BuildOps.",
  },
];

const BEFORE_AFTER = [
  ["Daily hours collection", "Texts + Google Sheets every evening", "Auto-recorded from phone clock-in"],
  ["Sherwin-Williams reconciliation", "30+ min per project, manual", "1 click — automated PO matching"],
  ["Invoicing a multi-phase job", "An entire evening", "5-minute review"],
  ["Payroll math", "Manual every two weeks", "Calculated automatically"],
  ["Project P&L visibility", "Whenever you sit down to add it up", "Real-time"],
  ["Software cost", "Procore: $30–60k/year forever", "One-time build + light monthly maintenance"],
];

export default function PaintMatePage() {
  return (
    <>
      <GrainOverlay />

      {/* Minimal landing-page nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[4.5rem] flex items-center px-6 md:px-14 backdrop-blur-md"
        style={{
          background: "rgba(var(--navy-rgb), 0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link href="/" className="flex items-baseline gap-1 flex-shrink-0 mr-auto">
          <span
            className="font-display font-bold tracking-tight leading-none"
            style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)", color: "var(--blue)" }}
          >
            Elma
          </span>
          <span
            className="font-display font-bold tracking-tight leading-none text-white"
            style={{ fontSize: "clamp(1.4rem, 2vw, 1.75rem)" }}
          >
            Digital
          </span>
        </Link>
        <a
          href={`tel:${PHONE}`}
          className="hidden md:inline-flex font-display font-medium text-sm text-white/55 hover:text-white transition-colors mr-6"
        >
          {PHONE_DISPLAY}
        </a>
        <a href="#talk" className="btn-primary px-5 py-2.5 text-sm">
          Book a Call
        </a>
      </nav>

      <main className="bg-navy">
        {/* ─── Hero ─── */}
        <section className="section section--hero relative overflow-hidden bg-navy">
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          <div
            className="absolute top-0 right-0 w-[70%] h-[70%] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(var(--accent-rgb),0.18) 0%, transparent 65%)",
            }}
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
              {/* Left — copy */}
              <div>
                <p
                  className="text-label mb-6"
                  style={{ color: "rgba(var(--accent-rgb),0.85)" }}
                >
                  PaintMate · Custom Software for Trades
                </p>

                <h1
                  className="font-display font-bold text-white pb-2"
                  style={{
                    fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Get your{" "}
                  <span style={{ color: "var(--accent)" }}>evenings</span> back.
                </h1>

                <p
                  className="text-body-lg max-w-lg mt-6 mb-8"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  Custom job-cost software for painting contractors and trades.
                  Phone clock-in for your crew. Automated supplier reconciliation.
                  Invoices that build themselves. Built around how your crew
                  actually works — not around a spreadsheet.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href={`tel:${PHONE}`} className="btn-primary px-7 py-4 text-sm">
                    Call for a free 20-min chat
                  </a>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    or text{" "}
                    <a
                      href={`sms:${PHONE}?&body=${SMS_BODY}`}
                      className="font-display font-semibold underline underline-offset-4"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      (360) 843-5566
                    </a>
                  </span>
                </div>

                <ProofStrip
                  builtFor="Alberto&rsquo;s Residential Painting, Elma"
                  personName="Luis Cruz"
                  personRole="Owner"
                  avatarSrc="/headshot-luis.jpg"
                  facts={["In daily use since 2025", "Built in Grays Harbor, WA"]}
                />
              </div>

              {/* Right — dashboard preview */}
              <div
                className="relative w-full"
                style={{ filter: "drop-shadow(0 28px 56px rgba(0,0,0,0.55))" }}
              >
                <div
                  className="absolute inset-0 -z-10 blur-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.22) 0%, transparent 70%)",
                  }}
                />
                <BrowserFrame
                  src="/paintmate-dashboard.png"
                  alt="PaintMate dashboard"
                  width={3024}
                  height={1546}
                  appName="PaintMate"
                  sizes="(max-width: 768px) 90vw, 540px"
                  priority
                />
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </section>

        {/* ─── Problem ─── */}
        <section className="section bg-navy-mid relative">
          <div className="max-w-5xl mx-auto w-full">
            <p
              className="text-label mb-6"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              The Problem
            </p>
            <h2
              className="text-heading text-white mb-10"
              style={{ letterSpacing: "-0.025em" }}
            >
              You&rsquo;re running a real business{" "}
              <span style={{ color: "var(--accent)" }}>on Google Sheets</span>{" "}
              and texts.
            </h2>

            <p
              className="text-body-lg mb-10"
              style={{ color: "rgba(255,255,255,0.72)", maxWidth: "60ch" }}
            >
              Before PaintMate, this is what an evening at Alberto&rsquo;s
              Residential Painting looked like:
            </p>

            <ul className="space-y-5">
              {[
                "Track down each employee. \"What did you work on today? How many hours? Which job?\" Type it into Google Sheets.",
                "Pull Sherwin-Williams invoices one at a time. Match each PO to a project. Add up the line items. Fix the cashier-typed misspellings.",
                "Build the invoice. Calculate labor × rate by labor type. Add materials with markup. Apply tax. Type it into a Word doc. Save as PDF.",
                "Run biweekly payroll math by hand. Reconcile against the spreadsheet. Pay the guys.",
                "Hope you didn't make a mistake. You'll find out next quarter when you do taxes.",
              ].map((line) => (
                <li
                  key={line}
                  className="flex gap-4 text-white/75"
                  style={{ fontSize: "1.05rem", lineHeight: 1.6 }}
                >
                  <span
                    className="flex-shrink-0 mt-1.5 inline-block w-2 h-2 rounded-full"
                    style={{ background: "var(--accent)" }}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <p
              className="mt-12 font-display font-semibold text-white"
              style={{ fontSize: "1.4rem", letterSpacing: "-0.01em" }}
            >
              That&rsquo;s not a business. That&rsquo;s a second job after the
              first one ends.
            </p>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section className="section bg-navy relative">
          <div className="max-w-6xl mx-auto w-full">
            <p
              className="text-label mb-6"
              style={{ color: "rgba(var(--accent-rgb),0.85)" }}
            >
              What PaintMate Does
            </p>
            <h2
              className="text-heading text-white mb-12"
              style={{ letterSpacing: "-0.025em", maxWidth: "20ch" }}
            >
              Built around how your crew actually works.
            </h2>

            <div className="grid md:grid-cols-2 gap-10 md:gap-14">
              {FEATURES.map((f) => (
                <div key={f.n}>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span
                      className="text-label"
                      style={{ color: "rgba(var(--accent-rgb),0.7)" }}
                    >
                      {f.n}
                    </span>
                    <h3
                      className="font-display font-semibold text-white"
                      style={{ fontSize: "1.35rem", letterSpacing: "-0.01em" }}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.62)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Before / After ─── */}
        <section id="numbers" className="section bg-navy-mid relative">
          <div className="max-w-5xl mx-auto w-full">
            <p
              className="text-label mb-6"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              What Changes
            </p>
            <h2
              className="text-heading text-white mb-10"
              style={{ letterSpacing: "-0.025em" }}
            >
              Before vs. After
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-white">
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  >
                    <th
                      className="py-4 pr-6 font-display font-semibold text-sm uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      &nbsp;
                    </th>
                    <th
                      className="py-4 px-6 font-display font-semibold text-sm uppercase tracking-wider"
                      style={{ color: "rgba(255,255,255,0.45)" }}
                    >
                      Before
                    </th>
                    <th
                      className="py-4 pl-6 font-display font-semibold text-sm uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      With PaintMate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BEFORE_AFTER.map(([label, before, after]) => (
                    <tr
                      key={label}
                      className="border-b"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <td
                        className="py-5 pr-6 font-display font-semibold"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {label}
                      </td>
                      <td
                        className="py-5 px-6"
                        style={{ color: "rgba(255,255,255,0.55)" }}
                      >
                        {before}
                      </td>
                      <td
                        className="py-5 pl-6"
                        style={{ color: "white", fontWeight: 500 }}
                      >
                        {after}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Testimonial ─── */}
        <section className="section bg-navy relative">
          <div className="max-w-4xl mx-auto w-full">
            <p
              className="text-label mb-8"
              style={{ color: "rgba(var(--accent-rgb),0.85)" }}
            >
              How Luis Runs It Now
            </p>

            <p
              className="font-display font-semibold text-white mb-10"
              style={{
                fontSize: "clamp(1.4rem, 2.6vw, 2.25rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
              }}
            >
              Luis&rsquo;s crew clocks in on their phones. Every job, every hour, every material run is already logged by the time he sits down to invoice. What used to take an evening of spreadsheets now takes about five minutes.
            </p>

            <div className="flex items-center gap-4">
              <div
                className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Image
                  src="/headshot-luis.jpg"
                  alt="Luis Cruz"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <div
                  className="font-display font-semibold text-white"
                  style={{ fontSize: "1.05rem" }}
                >
                  Luis Cruz
                </div>
                <div
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Owner, Alberto&rsquo;s Residential Painting
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section
          id="talk"
          className="section bg-navy-mid relative overflow-hidden"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(var(--accent-rgb),0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto w-full text-center">
            <p
              className="text-label mb-6"
              style={{ color: "rgba(var(--accent-rgb),0.85)" }}
            >
              Free Consultation
            </p>
            <h2
              className="text-heading text-white mb-6"
              style={{ letterSpacing: "-0.025em" }}
            >
              The conversation costs nothing.
            </h2>
            <p
              className="text-body-lg mb-10"
              style={{
                color: "rgba(255,255,255,0.65)",
                maxWidth: "50ch",
                margin: "0 auto",
              }}
            >
              20 minutes on the phone or in person. No pitch. I&rsquo;ll ask
              what your back office looks like today and what about it makes
              you wince. If there&rsquo;s a fit, I&rsquo;ll come back with a
              one-page proposal. If not, you&rsquo;ve still got a free
              consultation from a local engineer.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
              <a
                href={`tel:${PHONE}`}
                className="btn-primary px-6 py-4 text-sm w-full"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href={`mailto:${EMAIL}?subject=PaintMate%20-%20Discovery%20Call`}
                className="btn-ghost px-6 py-4 text-sm w-full"
              >
                Email Erik
              </a>
              <a
                href={`sms:${PHONE}?&body=${SMS_BODY}`}
                className="btn-ghost px-6 py-4 text-sm w-full"
              >
                Text
              </a>
            </div>

            <div
              className="mb-12 max-w-2xl mx-auto p-5 rounded-xl"
              style={{
                background: "rgba(var(--accent-rgb),0.06)",
                border: "1px solid rgba(var(--accent-rgb),0.3)",
              }}
            >
              <p
                className="text-sm mb-3"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <strong style={{ color: "var(--accent)" }}>
                  Ready to skip the call?
                </strong>{" "}
                Reserve a build slot directly. Sign a binding letter of
                engagement online — Erik pre-signed his side; you sign yours;
                Erik schedules discovery and issues a Stripe deposit invoice
                within 5 business days.
              </p>
              <a
                href="/reserve"
                className="inline-flex items-center gap-2 font-display font-semibold text-sm"
                style={{ color: "var(--accent)" }}
              >
                Reserve a slot · sign online
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              Or just{" "}
              <Link
                href="/"
                className="underline"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                visit the main Elma Digital site
              </Link>{" "}
              to learn about other things we build.
            </p>
          </div>
        </section>
      </main>
      <MobileActionBar smsBody="Hi Erik — I'd like to learn more about PaintMate for my crew." />


      <Footer />
    </>
  );
}
