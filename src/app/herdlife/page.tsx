import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BrowserFrame from "@/components/BrowserFrame";
import GrainOverlay from "@/components/GrainOverlay";
import Footer from "@/components/Footer";
import SavingsCalculator from "./SavingsCalculator";

import ProofStrip from "@/components/ProofStrip";
import MobileActionBar from "@/components/MobileCallButton";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";
const EMAIL = "erik@elmadigital.io";
const SMS_BODY = encodeURIComponent(
  "Hi Erik — I'd like to learn more about HerdLife for my dairy.",
);

export const metadata: Metadata = {
  title: "HerdLife — Custom Dairy Herd Management Software | Elma Digital",
  description:
    "Custom-built dairy herd management software. Open data, role-based access, inspector-ready reports. Replaces $75k+ AfiFarm installs at a fraction of the cost. Built by Elma Digital in Grays Harbor, WA.",
  openGraph: {
    title: "HerdLife — Escape the $75,000 AfiFarm Trap",
    description:
      "Full herd management. Open data. Any device. Built around how your dairy actually runs — for a fraction of what AfiFarm quotes.",
    type: "website",
  },
};

const FEATURES = [
  {
    n: "01",
    title: "Cow lifecycle tracking",
    body: "Every animal tracked from birth — breeding, calving, days in milk, lactations, dry periods, medications, vet checks. Reproduction status auto-calculated from actual events, never a stale checkbox.",
  },
  {
    n: "02",
    title: "Role-based access",
    body: "Admin, Worker, Vet, Viewer — each role sees only what it should. Workers log daily activity from their phones. Vets record pregnancy checks. Inspectors get read-only access to the reports they need. Secure invite links, no shared passwords.",
  },
  {
    n: "03",
    title: "Inspector-ready in seconds",
    body: "Expected calvings, medicine logs, herd status. CSV or PDF, with a full audit trail — who entered what, when, and why. When inspectors show up, you don't scramble.",
  },
  {
    n: "04",
    title: "Works on any device",
    body: "Web-based. Check your herd from your phone in the barn, your tablet in the office, or your laptop at home. Your workers and vets use their own devices. No dedicated tower computer. No single point of failure.",
  },
  {
    n: "05",
    title: "Bilingual",
    body: "English and Spanish, in the same interface. Critical for crews that include Spanish-first workers.",
  },
  {
    n: "06",
    title: "Your data is yours",
    body: "Open standard database. Full export anytime. No proprietary format. If you ever want to switch software, your data goes with you. That's the whole point.",
  },
];

const COMPARISON = [
  ["Initial cost", "$75,000 – $150,000+", "Fraction of the cost"],
  ["Ongoing fees", "~$130 per cow per year", "Flat monthly maintenance"],
  ["Required hardware", "Proprietary sensors + dedicated PC", "Any device with a browser"],
  ["Data format", "Proprietary (locked)", "Open (standard database)"],
  ["Where it runs", "One machine in your office", "Anywhere, any device, any team member"],
  ["Data portability", "Limited API — can't even export health events", "Full export, your data is yours"],
  ["Backup strategy", "Their cloud, their software required", "Standard backups, no vendor dependency"],
];

export default function HerdLifePage() {
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
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
          {/* Accent radial glow */}
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
                  HerdLife · Custom Dairy Software
                </p>

                <h1
                  className="font-display font-bold text-white pb-2"
                  style={{
                    fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
                    lineHeight: 0.98,
                    letterSpacing: "-0.03em",
                  }}
                >
                  Escape the{" "}
                  <span
                    style={{
                      color: "var(--accent)",
                      WebkitTextStroke: "0",
                    }}
                  >
                    $75,000
                  </span>{" "}
                  AfiFarm trap.
                </h1>

                <p
                  className="text-body-lg max-w-lg mt-6 mb-8"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  Custom-built dairy herd management software. Same capability
                  as the industry standard — without the proprietary lock-in,
                  the dedicated tower computer, or the six-figure quote. Your
                  data, your devices, your dairy.
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
                  builtFor="Torres Dairy, Lewis County"
                  personName="Jose Torres"
                  personRole="Owner"
                  avatarSrc="/headshot-jose.jpg"
                  facts={["In daily use since 2025", "Built in Grays Harbor, WA"]}
                />
              </div>

              {/* Right — dashboard preview */}
              <div
                className="relative w-full"
                style={{
                  filter: "drop-shadow(0 28px 56px rgba(0,0,0,0.55))",
                }}
              >
                <div
                  className="absolute inset-0 -z-10 blur-3xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb),0.22) 0%, transparent 70%)",
                  }}
                />
                <BrowserFrame
                  src="/herdlife-dashboard.png"
                  alt="HerdLife dashboard"
                  width={2586}
                  height={1144}
                  appName="HerdLife"
                  sizes="(max-width: 768px) 90vw, 540px"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Bottom rule */}
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
              The industry standard is{" "}
              <span style={{ color: "var(--accent)" }}>a hostage situation</span>,
              not software.
            </h2>

            <p
              className="text-body-lg mb-10"
              style={{ color: "rgba(255,255,255,0.72)", maxWidth: "60ch" }}
            >
              Talk to almost any dairy running AfiFarm or DairyComp 305 and the
              story is the same:
            </p>

            <ul className="space-y-5">
              {[
                "$75,000–$150,000+ for a new system install (hardware + software + wiring).",
                "~$130 per cow per year in ongoing fees — forever.",
                "Proprietary data format — your records are unreadable without their software.",
                "One dedicated tower computer running everything. One power surge and it's gone.",
                "On-site technician visits required for maintenance and calibration.",
                "Limited data export — their own API can't even transfer health events or exit records.",
                "Cloud backups can only be restored through their software.",
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
              For a family-run dairy, that&rsquo;s not software — it&rsquo;s a trap.
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
              What HerdLife Does
            </p>
            <h2
              className="text-heading text-white mb-12"
              style={{ letterSpacing: "-0.025em", maxWidth: "20ch" }}
            >
              Everything AfiFarm does. Nothing AfiFarm forces on you.
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

        {/* ─── Comparison ─── */}
        <section id="compare" className="section bg-navy-mid relative">
          <div className="max-w-5xl mx-auto w-full">
            <p
              className="text-label mb-6"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              The Numbers
            </p>
            <h2
              className="text-heading text-white mb-10"
              style={{ letterSpacing: "-0.025em" }}
            >
              AfiFarm vs. HerdLife
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
                      AfiFarm
                    </th>
                    <th
                      className="py-4 pl-6 font-display font-semibold text-sm uppercase tracking-wider"
                      style={{ color: "var(--accent)" }}
                    >
                      HerdLife
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(([label, afi, herd]) => (
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
                        {afi}
                      </td>
                      <td
                        className="py-5 pl-6"
                        style={{ color: "white", fontWeight: 500 }}
                      >
                        {herd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Savings calculator ─── */}
        <section className="section bg-navy relative">
          <div className="max-w-6xl mx-auto w-full">
            <p
              className="text-label mb-6 text-center"
              style={{ color: "rgba(var(--accent-rgb),0.85)" }}
            >
              Run Your Own Numbers
            </p>
            <h2
              className="text-heading text-white mb-4 text-center"
              style={{ letterSpacing: "-0.025em" }}
            >
              Your dairy. Your numbers.
            </h2>
            <p
              className="text-body-lg mb-12 text-center mx-auto"
              style={{ color: "rgba(255,255,255,0.62)", maxWidth: "60ch" }}
            >
              Slide your herd size and time horizon to see what staying on
              AfiFarm actually costs over the next several years.
            </p>
            <SavingsCalculator />
          </div>
        </section>

        {/* ─── Testimonial ─── */}
        <section className="section bg-navy relative">
          <div className="max-w-4xl mx-auto w-full">
            <p
              className="text-label mb-8"
              style={{ color: "rgba(var(--accent-rgb),0.85)" }}
            >
              How Jose Runs It Now
            </p>

            <p
              className="font-display font-semibold text-white mb-10"
              style={{
                fontSize: "clamp(1.4rem, 2.6vw, 2.25rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
              }}
            >
              Jose checks his herd from his phone in the barn. His vets log in from their own devices to record preg checks. When an inspector shows up, the report is ready in seconds. And the data lives in a standard database that belongs to him.
            </p>

            <div className="flex items-center gap-4">
              <div
                className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
                style={{ border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Image
                  src="/headshot-jose.jpg"
                  alt="Jose Torres"
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
                  Jose Torres
                </div>
                <div
                  className="text-sm"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Owner, Torres Dairy
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
              style={{ color: "rgba(255,255,255,0.65)", maxWidth: "50ch", margin: "0 auto" }}
            >
              20 minutes on the phone or in person. No pitch. I&rsquo;ll ask
              what software runs your herd today and what about it makes you
              wince. If there&rsquo;s a fit, I&rsquo;ll come back with a
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
                href={`mailto:${EMAIL}?subject=HerdLife%20-%20Discovery%20Call`}
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

            <p
              className="text-sm"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
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
      <MobileActionBar smsBody="Hi Erik — I'd like to learn more about HerdLife for my dairy." />


      <Footer />
    </>
  );
}
