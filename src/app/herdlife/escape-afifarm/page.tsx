import type { Metadata } from "next";
import Link from "next/link";
import GrainOverlay from "@/components/GrainOverlay";
import Footer from "@/components/Footer";
import SavingsCalculator from "../SavingsCalculator";

const PHONE = "3608435566";
const PHONE_DISPLAY = "(360) 843-5566";

export const metadata: Metadata = {
  title:
    "AfiFarm Alternative: Why Family Dairies Are Replacing It in 2026 | HerdLife",
  description:
    "AfiFarm's $75,000+ install cost, proprietary data lock-in, and $130/cow/year fees don't fit how family dairies actually run. Here's what a custom AfiFarm alternative looks like — and what it really costs.",
  alternates: {
    canonical: "https://elmadigital.io/herdlife/escape-afifarm",
  },
  openGraph: {
    title: "Why Dairies Are Escaping AfiFarm",
    description:
      "A field guide to AfiFarm pricing, lock-in, and the custom alternatives reshaping family dairy operations in the Pacific Northwest.",
    type: "article",
  },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Family Dairies Are Replacing AfiFarm in 2026",
  description:
    "A field guide to AfiFarm's true cost, proprietary lock-in, and the custom alternatives that fit family dairies better.",
  author: {
    "@type": "Person",
    name: "Erik Bahena",
    url: "https://elmadigital.io",
  },
  publisher: {
    "@type": "Organization",
    name: "Elma Digital",
    url: "https://elmadigital.io",
  },
  datePublished: "2026-05-22",
  dateModified: "2026-05-22",
  mainEntityOfPage: "https://elmadigital.io/herdlife/escape-afifarm",
};

export default function EscapeAfiFarmPost() {
  return (
    <>
      <GrainOverlay />

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
            style={{
              fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
              color: "var(--blue)",
            }}
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
        <a href="/herdlife" className="btn-primary px-5 py-2.5 text-sm">
          See HerdLife
        </a>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="bg-navy text-white">
        <article
          className="max-w-3xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-20"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75 }}
        >
          <p
            className="text-label mb-6"
            style={{ color: "rgba(var(--accent-rgb),0.85)" }}
          >
            Published 2026-05-22 · Elma Digital
          </p>

          <h1
            className="font-display font-bold mb-8"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Why family dairies are replacing AfiFarm in 2026
          </h1>

          <p
            className="mb-8 text-xl"
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            AfiFarm has been the default dairy management platform in the
            United States for two decades. For a family operation pricing a new
            install or staring down a renewal quote, &ldquo;default&rdquo; can
            feel like &ldquo;trapped.&rdquo; Here&rsquo;s what the math actually
            looks like — and what the alternative is.
          </p>

          <div
            className="mb-12 mt-12 h-px"
            style={{ background: "rgba(255,255,255,0.1)" }}
          />

          <Prose>
            <h2>What AfiFarm actually costs</h2>
            <p>
              When a family dairy starts pricing AfiFarm — either for a new
              install, a recovery after a hardware failure, or a renewal — the
              quotes consistently surface the same numbers. Published industry
              estimates and farmer-reported quotes put a typical install at{" "}
              <strong>$75,000 to $150,000+</strong> for hardware, software, and
              wiring. Ongoing fees run roughly <strong>$130 per cow per year</strong>.
              For a 300-cow operation over five years, that&rsquo;s nearly{" "}
              <strong>$200,000 in software-related spend alone</strong> on top
              of the install.
            </p>

            <p>
              The hardware is proprietary. The data format is proprietary. The
              software runs on a dedicated tower computer in the office, and if
              that tower dies — power surge, hard drive failure, lightning —
              the records, kept in AfiFarm&rsquo;s file format, are unreadable
              without their software. We&rsquo;ve seen exactly this: a Pacific
              Northwest dairy lost everything to a power surge and was quoted
              over $75,000 to get back online.
            </p>

            <h2>The hidden cost: lock-in</h2>
            <p>
              The financial number is only half the picture. The deeper cost is
              the lock-in:
            </p>
            <ul>
              <li>
                <strong>Proprietary file formats.</strong> Your records exist
                only in a format their software can read. The data &mdash; the
                breeding history, the milk records, the medication logs &mdash;
                is yours in name only.
              </li>
              <li>
                <strong>Sensor lock-in.</strong> Their meters and identification
                hardware only work with their software. Swap software, and the
                hardware comes off the wall.
              </li>
              <li>
                <strong>Limited API export.</strong> Operators report being
                unable to export health events or exit records even through
                AfiFarm&rsquo;s own API. The portability that makes data
                useful elsewhere is exactly what gets restricted.
              </li>
              <li>
                <strong>Cloud backup dependency.</strong> Cloud backups are
                stored in the vendor&rsquo;s format and can only be restored
                through their software. A &ldquo;backup&rdquo; you can&rsquo;t
                use without re-engaging the vendor isn&rsquo;t really a backup.
              </li>
              <li>
                <strong>On-site technician requirement.</strong> Maintenance
                and calibration require their technicians, on their schedule,
                at their rate.
              </li>
            </ul>

            <p>
              For a multi-generational dairy thinking about succession, this
              is the part that hurts most: handing the farm to the next
              generation means handing them the vendor relationship too. The
              software stops being a tool and starts being a co-owner.
            </p>

            <h2>What a custom alternative looks like</h2>
            <p>
              We built one of those alternatives for Torres Dairy in 2025. It&rsquo;s
              called <a href="/herdlife"><strong>HerdLife</strong></a>, and it
              does what AfiFarm does — herd lifecycle tracking, breeding,
              calvings, lactations, medications, vet records, inspector reports
              — without the architecture that creates the trap.
            </p>

            <ul>
              <li>
                <strong>Web-based, multi-device.</strong> Any phone, tablet, or
                laptop with a browser. No dedicated tower in the office. No
                single point of failure.
              </li>
              <li>
                <strong>Role-based access.</strong> Admin, Worker, Vet, Viewer —
                each role sees exactly what they need. Workers log daily
                activities from their phones. Vets record pregnancy checks
                from their own laptops. Inspectors get read-only access to the
                exact reports they request.
              </li>
              <li>
                <strong>Inspector-ready in seconds.</strong> Expected calvings,
                medicine logs, herd status — CSV or PDF, with full audit trail.
                The operator doesn&rsquo;t scramble when state inspectors show
                up.
              </li>
              <li>
                <strong>Bilingual.</strong> English and Spanish in the same
                interface. Most West Coast dairy crews need this; most off-the-
                shelf platforms don&rsquo;t prioritize it.
              </li>
              <li>
                <strong>Standard database, open formats.</strong> The data
                lives in a standard relational database the farm can query,
                back up, and export. If the operator ever wants to switch
                tools, the data goes with them. That&rsquo;s the whole point.
              </li>
            </ul>

            <h2>What does it actually cost?</h2>
            <p>
              The honest answer: it depends on the dairy. Most engagements
              we&rsquo;ve scoped at this size land in the $25,000 to $50,000
              range for the one-time build, plus a small monthly maintenance
              fee. That&rsquo;s a one-time custom build, owned by the operator,
              with maintenance month-to-month — not annual contracts, not
              per-cow fees, not vendor lock-in.
            </p>

            <p>
              Use the calculator below to see your own numbers. Move the
              herd-size and time-horizon sliders to your dairy&rsquo;s actual
              shape. The savings number isn&rsquo;t a sales pitch — it&rsquo;s
              just arithmetic against the AfiFarm anchor.
            </p>
          </Prose>

          <div className="my-12">
            <SavingsCalculator />
          </div>

          <Prose>
            <h2>Who this is right for</h2>
            <p>
              This isn&rsquo;t for everyone. Custom dairy software makes sense
              when:
            </p>
            <ul>
              <li>
                <strong>You&rsquo;re a family-run operation</strong> with
                50–500 head — too small for AfiFarm&rsquo;s install cost to make
                ROI sense, too large for a spreadsheet to actually work.
              </li>
              <li>
                <strong>You have a specific workflow your software
                doesn&rsquo;t support.</strong> Common examples: organic-
                transition reporting, bilingual crew needs, integration with a
                specific milk-buyer&rsquo;s data formats, multi-location herd
                management.
              </li>
              <li>
                <strong>You think long-term.</strong> A custom build pays for
                itself faster the longer the time horizon. Year one, you might
                be roughly even with AfiFarm. By year three, you&rsquo;re
                meaningfully ahead. By year five, you&rsquo;ve typically saved
                six figures and you own the platform.
              </li>
            </ul>

            <p>
              If you&rsquo;re a 2,000-cow industrial operation with an in-house
              IT team, AfiFarm&rsquo;s industrial-grade product probably is
              right for you. If you&rsquo;re a 50-head hobby farm, a $20
              spreadsheet template probably is. Most dairies are in between.
              That&rsquo;s where custom shines.
            </p>

            <h2>What &ldquo;custom&rdquo; doesn&rsquo;t mean</h2>
            <p>
              Custom doesn&rsquo;t mean &ldquo;built from scratch every time,
              forever.&rdquo; The reusable patterns — cow lifecycle, breeding
              events, role-based access, inspector reports, audit trails — are
              already built. What gets customized is everything that touches
              <em> how your dairy actually runs</em>: your milk-buyer&rsquo;s
              data formats, your inspectors&rsquo; preferred reports, your
              veterinary workflow, your team structure, your bilingual needs.
            </p>

            <p>
              The build is fast because the core platform is already proven.
              Most engagements run 10–12 weeks from discovery to live.
            </p>

            <h2>How to know it&rsquo;s the right call</h2>
            <p>
              Two questions to ask yourself:
            </p>
            <ol>
              <li>
                <strong>If your current vendor went out of business tomorrow,
                what would you do?</strong> If the answer involves a panic, a
                six-figure quote, or losing data, you have a software-risk
                problem regardless of the daily features.
              </li>
              <li>
                <strong>If you had to retrain your office staff next month
                because your software changed, how hard would it be?</strong>
                Custom software is built around how your team already works.
                Off-the-shelf software requires your team to work around how
                the software was built.
              </li>
            </ol>

            <h2>The 20-minute conversation</h2>
            <p>
              We do a free 20-minute discovery call — phone or in person if
              you&rsquo;re in the Pacific Northwest. There&rsquo;s no pitch on
              the first call. We ask what software runs your herd today, what
              about it makes you wince, and whether there&rsquo;s a fit worth
              quoting. If yes, you get a one-page proposal. If not, you&rsquo;ve
              still spent 20 minutes with a local engineer who builds this
              stuff for a living, which is more than most vendors will give you
              free.
            </p>
          </Prose>

          <div
            className="mt-16 p-8 rounded-2xl"
            style={{
              background: "rgba(var(--accent-rgb),0.06)",
              border: "1px solid rgba(var(--accent-rgb),0.25)",
            }}
          >
            <h3
              className="font-display font-bold mb-4"
              style={{ fontSize: "1.5rem", color: "white" }}
            >
              Worth a 20-minute call?
            </h3>
            <p
              className="mb-6"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Free, no pitch on the first call. If there&rsquo;s a fit, we
              come back with a one-page proposal you can keep.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${PHONE}`}
                className="btn-primary px-6 py-3 text-sm"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a href="/herdlife" className="btn-ghost px-6 py-3 text-sm">
                See the HerdLife page
              </a>
            </div>
          </div>

          <div
            className="mt-12 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              Erik Bahena is the founder of Elma Digital, a software shop in
              Grays Harbor County, Washington, building custom operations
              platforms for local businesses — including HerdLife (dairy),
              PaintMate (trades), and others. He worked directly with Torres
              Dairy on the HerdLife platform discussed here.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="prose-edev"
      style={
        {
          // Inline styles for nested elements — keeps the markup readable in
          // the body of the article above. Tailwind 4 typography plugin
          // isn't installed; this is a hand-rolled equivalent.
          ["--prose-color" as string]: "rgba(255,255,255,0.78)",
          ["--prose-heading" as string]: "white",
          ["--prose-link" as string]: "rgb(var(--accent-rgb))",
          color: "var(--prose-color)",
        } as React.CSSProperties
      }
    >
      {children}
      <style>{`
        .prose-edev h2 {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 700;
          font-size: clamp(1.5rem, 3vw, 2rem);
          letter-spacing: -0.02em;
          color: var(--prose-heading);
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .prose-edev h3 {
          font-family: var(--font-space-grotesk), sans-serif;
          font-weight: 600;
          font-size: 1.25rem;
          color: var(--prose-heading);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .prose-edev p { margin-bottom: 1.25rem; }
        .prose-edev ul, .prose-edev ol {
          margin: 1rem 0 1.5rem 1.25rem;
          padding-left: 1rem;
        }
        .prose-edev ul { list-style: disc; }
        .prose-edev ol { list-style: decimal; }
        .prose-edev li { margin-bottom: 0.6rem; }
        .prose-edev strong {
          color: white;
          font-weight: 600;
        }
        .prose-edev em { color: rgba(255,255,255,0.9); }
        .prose-edev a {
          color: var(--prose-link);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .prose-edev a:hover { color: var(--accent); }
      `}</style>
    </div>
  );
}
