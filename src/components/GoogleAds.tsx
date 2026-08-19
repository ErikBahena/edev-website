"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Google Ads tag + conversion events.
 *
 * The campaign's goal is "Phone calls", but nothing was telling Google when a
 * call happened — so it optimised blind. This does two things:
 *
 *  1. Loads the global site tag (gtag.js) for the Ads account, so Google can
 *     attribute visits to ad clicks (the `gclid` handshake) and build
 *     remarketing audiences.
 *
 *  2. Fires a conversion on every call / text tap, site-wide, via one
 *     delegated click listener. We don't instrument 26 anchors by hand — any
 *     <a href="tel:…"> or <a href="sms:…"> anywhere on the site counts, now
 *     and in the future. Tapping is the honest conversion for click-to-call:
 *     the page can't know whether the call connected, and Google treats
 *     "clicked to call" as its own conversion category.
 *
 * Config is env-driven so the IDs never live in source:
 *   NEXT_PUBLIC_GOOGLE_ADS_ID          AW-XXXXXXXXXX            (required)
 *   NEXT_PUBLIC_ADS_CONV_CALL          AW-XXXXXXXXXX/AbCdEf…   (call tap)
 *   NEXT_PUBLIC_ADS_CONV_TEXT          AW-XXXXXXXXXX/GhIjKl…   (text tap)
 *   NEXT_PUBLIC_ADS_CONV_EMAIL         AW-XXXXXXXXXX/MnOpQr…   (email tap, optional)
 *
 * If NEXT_PUBLIC_GOOGLE_ADS_ID is unset the component renders nothing, so
 * local dev and preview builds don't pollute the live account.
 */

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CONV = {
  call: process.env.NEXT_PUBLIC_ADS_CONV_CALL,
  text: process.env.NEXT_PUBLIC_ADS_CONV_TEXT,
  email: process.env.NEXT_PUBLIC_ADS_CONV_EMAIL,
} as const;

type Kind = keyof typeof CONV;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function kindOf(href: string): Kind | null {
  if (href.startsWith("tel:")) return "call";
  if (href.startsWith("sms:")) return "text";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

/** Best-effort label for which CTA fired, so reports can tell hero vs footer. */
function placementOf(el: HTMLElement): string {
  const section = el.closest("section, header, footer, nav");
  const id = section?.id;
  if (id) return id;
  const tag = section?.tagName.toLowerCase();
  if (tag && tag !== "section") return tag;
  // fall back to the element's own text, trimmed
  return (el.textContent || "").trim().slice(0, 40) || "unknown";
}

export default function GoogleAds() {
  useEffect(() => {
    if (!ADS_ID) return;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const kind = kindOf(a.getAttribute("href") || "");
      if (!kind) return;

      const sendTo = CONV[kind];
      const page = window.location.pathname;
      const placement = placementOf(a);

      // Always record the interaction as a plain event (useful in GA4 later,
      // and harmless if only Ads is listening).
      window.gtag?.("event", `${kind}_click`, { page, placement });

      // Fire the Ads conversion if one is configured for this kind.
      if (sendTo) {
        window.gtag?.("event", "conversion", {
          send_to: sendTo,
          // pass the page so the same conversion can be segmented by landing page
          event_label: page,
        });
      }
      // Don't preventDefault — the dialer / Messages app must still open.
      // tel:/sms: leave the page via the OS, not navigation, so the hit has
      // time to send; no transport_url/event_callback dance needed.
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!ADS_ID) return null;

  return (
    <>
      <Script
        id="gtag-src"
        src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${ADS_ID}', { allow_enhanced_conversions: true });
        `}
      </Script>
    </>
  );
}
