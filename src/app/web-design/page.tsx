import type { Metadata } from "next";
import Link from "next/link";
import BrowserFrame from "@/components/BrowserFrame";
import ProofStrip from "@/components/ProofStrip";
import MobileActionBar from "@/components/MobileCallButton";

/**
 * /web-design — the landing page for the "Grays Harbor Web Design" ad theme.
 *
 * Deliberately lighter than /paintmate and /herdlife: no GSAP, no Lenis, no
 * calculator. This is a $750–$1,500 sale arriving from a phone; the page has
 * one job — repeat what they searched for, show one real local site, and get
 * them to the phone. Message-match to the ad headline is intentional and
 * literal (the H1 IS the ad headline).
 */

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";
const SMS_BODY = encodeURIComponent(
  "Hi Erik — I'm interested in a website for my business. Can we chat?",
);

export const metadata: Metadata = {
  title: "Grays Harbor Web Design — Websites for Local Businesses | Elma Digital",
  description:
    "Custom websites for small businesses in Aberdeen, Elma, Hoquiam, Montesano and across Grays Harbor County. Built locally, from $750, with a CMS you can update yourself. Not a template.",
  alternates: { canonical: "https://www.elmadigital.io/web-design" },
  openGraph: {
    title: "Grays Harbor Web Design — Elma Digital",
    description:
      "Real websites for Grays Harbor businesses. Built in Elma, WA. From $750.",
    type: "website",
    url: "https://www.elmadigital.io/web-design",
  },
};

const TOWNS = ["Aberdeen", "Elma", "Hoquiam", "Montesano", "McCleary", "Ocean Shores", "Westport", "Cosmopolis"];

const INCLUDED = [
  ["Built for you, not from a template", "Your business, your words, your photos. Nothing your competitor's site also uses."],
  ["Found on Google", "Set up so people searching your trade in your town actually find you — page titles, local schema, speed, mobile."],
  ["A CMS you can use", "Change your hours, add a photo, post a special. Without calling anyone."],
  ["Fast on a phone", "Most of your customers will see it on a phone in a truck. It loads fast there."],
  ["Call, text, and directions built in", "The buttons that make the phone ring, above the fold, on every page."],
  ["Local, in person", "I'm in Elma. We meet, I look at how you work, then I build. Questions get answered by the person who built it."],
];

const PRICING = [
  { name: "Single-page site + CMS", price: "from $750", note: "Most trades and service businesses. Everything on one fast page." },
  { name: "Multi-page site + CMS", price: "from $1,500", note: "Services, gallery, about, contact — for businesses with more to show." },
  { name: "Monthly care", price: "optional", note: "Hosting, updates, small changes. Month to month, no contract." },
];

const FAQ = [
  ["How long does it take?", "A single-page site is usually live in one to two weeks from our first conversation. Multi-page runs two to four."],
  ["Do I own it?", "Yes. The domain, the site, the content — all yours. If you ever want to leave, everything goes with you."],
  ["What do you need from me?", "About an hour of your time, your logo if you have one, and any photos of your work. I handle the rest."],
  ["I already have a site. Can you fix it?", "Sometimes. If it's built on something reasonable I can. If it's a locked-in builder, it's often faster to rebuild — I'll tell you straight which it is."],
];

export default function WebDesignPage() {
  return (
    <>
      <main className="bg-bg text-text">
        {/* Nav — minimal, on purpose */}
        <header className="border-b border-border bg-white">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-display font-bold text-navy text-lg">
              Elma<span style={{ color: "var(--blue)" }}> Digital</span>
            </Link>
            <a href={`tel:${PHONE}`} className="font-display font-semibold text-sm text-navy">
              {PHONE_DISPLAY}
            </a>
          </div>
        </header>

        {/* Hero — H1 is the ad headline, verbatim */}
        <section className="relative overflow-hidden bg-navy">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-[1.05fr_1fr] gap-12 items-center">
            <div>
              <p className="text-label mb-4" style={{ color: "var(--accent)" }}>
                Elma, WA · Serving all of Grays Harbor County
              </p>
              <h1
                className="font-display font-bold text-white"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.25rem)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
              >
                Grays Harbor <span style={{ color: "var(--accent)" }}>Web Design</span>
              </h1>
              <p className="text-body-lg max-w-lg mt-6 mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
                A real website for your business — built by one local person, from $750,
                with a CMS you can update yourself. Not a $20-a-month template.
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
                    {PHONE_DISPLAY}
                  </a>
                </span>
              </div>

              <ProofStrip
                builtFor="Dynamic Stylz Salon, Elma"
                personName="Amber"
                personRole="Owner"
                facts={["Live at dynamicstylz.com", "Built in Grays Harbor, WA"]}
              />
            </div>

            <div style={{ filter: "drop-shadow(0 28px 56px rgba(0,0,0,0.5))" }}>
              <BrowserFrame
                src="/dynamic-stylz.png"
                alt="Dynamic Stylz Salon website, built by Elma Digital"
                width={1600}
                height={1041}
                appName="dynamicstylz.com"
                priority
              />
              <p className="mt-3 text-xs text-center" style={{ color: "rgba(255,255,255,0.4)" }}>
                Dynamic Stylz Salon · Main St, Elma — a real site for a real local business
              </p>
            </div>
          </div>
        </section>

        {/* Towns strip — the geo signal, in words a person and Google both read */}
        <section className="border-b border-border bg-white">
          <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
            <span className="font-display font-semibold text-navy">Where we work:</span>
            {TOWNS.map((t) => <span key={t}>{t}</span>)}
            <span>and the rest of Grays Harbor County</span>
          </div>
        </section>

        {/* What's included */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <p className="text-label text-accent mb-3">What you get</p>
          <h2 className="text-heading font-display text-navy mb-10">
            A website that does a job — getting your phone to ring.
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUDED.map(([h, b]) => (
              <div key={h} className="bg-white rounded-2xl border border-border p-6">
                <h3 className="font-display font-semibold text-navy mb-2">{h}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing — the number is right there; no "call for quote" */}
        <section className="bg-white border-y border-border">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
            <p className="text-label text-accent mb-3">Straight pricing</p>
            <h2 className="text-heading font-display text-navy mb-3">No quote dance.</h2>
            <p className="text-text-muted max-w-2xl mb-10">
              Flat project price. You know the number before we start. Most local sites land in the first tier.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {PRICING.map((p) => (
                <div key={p.name} className="rounded-2xl border border-border p-6 bg-bg">
                  <p className="font-display font-semibold text-navy">{p.name}</p>
                  <p className="font-display font-bold text-3xl text-navy mt-2 mb-3">{p.price}</p>
                  <p className="text-sm text-text-muted">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why local */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20 grid md:grid-cols-[1fr_1.2fr] gap-10 items-start">
          <div>
            <p className="text-label text-accent mb-3">Why a local builder</p>
            <h2 className="text-heading font-display text-navy">
              You&rsquo;re not a ticket in a queue.
            </h2>
          </div>
          <div className="space-y-4 text-text-muted leading-relaxed">
            <p>
              I&rsquo;m Erik. I grew up here and I build software and websites for Grays Harbor businesses —
              painters, farms, salons, contractors. When you call, I answer. When something needs changing,
              I&rsquo;m the person who changes it.
            </p>
            <p>
              No agency markup, no offshore hand-off, no account manager between you and the work. Just a
              website that&rsquo;s actually yours, built by someone you can meet for coffee in Elma.
            </p>
            <p className="text-sm">
              Also build custom business software?{" "}
              <Link href="/paintmate" className="text-blue font-display font-semibold">See PaintMate</Link>
              {" "}·{" "}
              <Link href="/herdlife" className="text-blue font-display font-semibold">See HerdLife</Link>
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white border-t border-border">
          <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
            <p className="text-label text-accent mb-3">Questions</p>
            <h2 className="text-heading font-display text-navy mb-8">The ones everyone asks.</h2>
            <dl className="space-y-6">
              {FAQ.map(([q, a]) => (
                <div key={q}>
                  <dt className="font-display font-semibold text-navy">{q}</dt>
                  <dd className="text-text-muted mt-1 leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Final CTA */}
        <section id="talk" className="bg-navy">
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 text-center">
            <h2 className="font-display font-bold text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}>
              Twenty minutes. No pitch. Just what you need.
            </h2>
            <p className="mt-4 mb-8" style={{ color: "rgba(255,255,255,0.6)" }}>
              Tell me about your business. I&rsquo;ll tell you what a site would cost and how long it takes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${PHONE}`} className="btn-primary px-8 py-4 text-sm">Call {PHONE_DISPLAY}</a>
              <a href={`sms:${PHONE}?&body=${SMS_BODY}`} className="btn-ghost px-8 py-4 text-sm">Text instead</a>
            </div>
          </div>
        </section>

        <footer className="bg-navy border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>Elma Digital · Elma, WA · erik@elmadigital.io</span>
            <Link href="/" className="hover:text-white">elmadigital.io</Link>
          </div>
        </footer>
      </main>
      <MobileActionBar smsBody="Hi Erik — I'm interested in a website for my business. Can we chat?" />
    </>
  );
}
