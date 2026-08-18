import type { Metadata } from "next";
import GrainOverlay from "@/components/GrainOverlay";
import Footer from "@/components/Footer";
import Link from "next/link";
import { notFound } from "next/navigation";
import SignForm from "./SignForm";
import { verifyReserveToken } from "@/lib/reserve-token";

export const metadata: Metadata = {
  title: "Reserve a Build Slot — Sign Your EDEV Engagement | Elma Digital",
  description:
    "Sign a binding letter of engagement to reserve a custom software build with EDEV. Pre-populated terms, electronic signature, deposit invoice issued via Stripe within 5 business days.",
  robots: { index: false, follow: true },
};

type PageProps = { searchParams: Promise<{ t?: string }> };

/**
 * Invite-only. Erik generates a signed link from the admin after a discovery
 * call; without a valid token this page is a 404, indistinguishable from a
 * route that doesn't exist. Never linked from nav or sitemap.
 */
export default async function ReservePage({ searchParams }: PageProps) {
  const { t } = await searchParams;
  const claims = verifyReserveToken(t);
  if (!claims || !t) notFound();

  return (
    <>
      <GrainOverlay />

      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[4.5rem] flex items-center px-6 md:px-14 backdrop-blur-md print:hidden"
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
      </nav>

      <main className="bg-navy text-white pt-24 md:pt-32 pb-20 px-6 md:px-14 print:pt-0 print:bg-white print:text-black">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-label mb-4"
            style={{ color: "rgba(var(--accent-rgb),0.85)" }}
          >
            Engagement Letter · EDEV
          </p>
          <h1
            className="font-display font-bold mb-6 print:text-black"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            Reserve a build slot.
          </h1>
          <p
            className="text-body-lg mb-10"
            style={{
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
            }}
          >
            This page is a working letter of engagement. The terms below are
            Erik&rsquo;s side of the agreement — already signed by Erik Bahena
            on behalf of EDEV by publishing this offer. Fill in the form
            beneath the terms, type your name as your electronic signature,
            and you and EDEV are bound. Erik will reach out within 24 hours
            to schedule a kickoff and issue the deposit invoice.
          </p>

          <section
            className="rounded-2xl p-7 md:p-10 mb-12"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              className="font-display font-bold mb-6 print:text-black"
              style={{
                fontSize: "1.5rem",
                color: "white",
                letterSpacing: "-0.01em",
              }}
            >
              Engagement terms
            </h2>

            <dl className="space-y-6 text-sm">
              <Item term="1. Parties">
                EDEV / Elma Digital (&ldquo;EDEV&rdquo;) — Erik Bahena, sole proprietor,
                based in Elma, Washington — and the company named in the
                signature block below (&ldquo;Client&rdquo;).
              </Item>
              <Item term="2. Scope">
                EDEV will design, build, deliver, and launch custom business
                software fitting Client&rsquo;s operational workflow as
                described in Client&rsquo;s &ldquo;What we&rsquo;re building&rdquo;
                paragraph in the signature block. Full scope is finalized in a
                one-page addendum produced after a free on-site or video
                discovery session scheduled within 10 business days of this
                signing.
              </Item>
              <Item term="3. Investment">
                The total engagement fee is the dollar amount selected by
                Client in the signature block. The fee covers discovery,
                design, build, training, launch, and stabilization.
                Maintenance after launch is billed separately at a monthly
                rate disclosed in the addendum (typically $300–$600/month,
                month-to-month, no annual lock-in).
              </Item>
              <Item term="4. Payment schedule">
                30% deposit at signing (invoiced via Stripe within 5 business
                days of this signing). 30% on approval of wireframes. 30% on
                delivery of feature-complete preview. 10% on launch sign-off.
              </Item>
              <Item term="5. Timeline">
                Typical build runs 10–14 weeks from signed addendum to launch.
                Actual schedule is committed in the addendum.
              </Item>
              <Item term="6. Ownership">
                Client owns the data and the codebase outright at delivery.
                EDEV retains the right to reference the engagement publicly
                (with Client&rsquo;s reasonable approval of any specific
                wording).
              </Item>
              <Item term="7. Out of scope">
                Hardware procurement, payroll provider replacement, native
                mobile binaries (iOS/Android), and public-facing marketing
                websites unless explicitly added to the addendum. EDEV will
                identify hardware needs but not purchase on Client&rsquo;s
                behalf.
              </Item>
              <Item term="8. Cancellation & refund">
                Either party may terminate before discovery session by written
                notice; in that case, the deposit is fully refunded minus any
                work-product Client wishes to retain. After the addendum is
                signed, the deposit is non-refundable but work product to date
                is delivered to Client. EDEV may terminate if Client is
                materially non-responsive for more than 30 consecutive days.
              </Item>
              <Item term="9. Confidentiality">
                Each party will treat the other&rsquo;s non-public information
                with reasonable confidentiality. EDEV will execute a standard
                mutual NDA on request.
              </Item>
              <Item term="10. Governing law">
                This agreement is governed by the laws of the State of
                Washington. Disputes will be resolved first by good-faith
                conversation between Erik Bahena and Client, then if
                necessary by mediation in Grays Harbor County, WA.
              </Item>
              <Item term="11. Counterparts & electronic signature">
                This letter may be signed in counterparts and may be signed
                electronically. Client&rsquo;s typed signature in the field
                below, together with checking the affirmation box, constitutes
                Client&rsquo;s binding signature under the U.S. federal ESIGN
                Act and Washington&rsquo;s UETA. EDEV&rsquo;s side is
                pre-executed by Erik Bahena&rsquo;s publication of these terms
                at elmadigital.io/reserve.
              </Item>
            </dl>

            <div
              className="mt-8 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p
                className="text-label mb-3"
                style={{ color: "rgba(var(--accent-rgb),0.85)" }}
              >
                EDEV — pre-executed signature
              </p>
              <p
                className="font-display italic"
                style={{
                  fontSize: "1.5rem",
                  color: "white",
                  letterSpacing: "0.02em",
                }}
              >
                /s/ Erik Bahena
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Erik Bahena · Founder, EDEV / Elma Digital · Elma, WA · Effective
                upon Client signature of this letter
              </p>
            </div>
          </section>

          <section>
            <h2
              className="font-display font-bold mb-4 print:text-black"
              style={{
                fontSize: "1.75rem",
                color: "white",
                letterSpacing: "-0.015em",
              }}
            >
              Your signature
            </h2>
            <p
              className="mb-8 text-sm"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Fill in below and type your name as your electronic signature.
              Once submitted, you and EDEV are bound under the terms above.
            </p>

            <SignForm token={t} />
          </section>

          <p
            className="mt-12 text-xs text-center print:text-black"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Not ready to sign?{" "}
            <a
              href="/herdlife"
              className="underline"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              Visit /herdlife
            </a>
            ,{" "}
            <a
              href="/paintmate"
              className="underline"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              /paintmate
            </a>
            , or book a free 20-minute discovery call by calling{" "}
            <a
              href="tel:3608435566"
              className="underline"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              (360) 843-5566
            </a>
            .
          </p>
        </div>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}

function Item({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt
        className="font-display font-semibold mb-1 print:text-black"
        style={{ color: "white", fontSize: "0.95rem" }}
      >
        {term}
      </dt>
      <dd
        style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}
        className="print:text-black"
      >
        {children}
      </dd>
    </div>
  );
}
