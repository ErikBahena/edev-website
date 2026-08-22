"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";

/**
 * Microsoft Clarity — session replay, heatmaps, rage/dead-click detection.
 *
 * Installed via the npm package rather than the raw snippet so we can drive
 * the parts that make it useful rather than merely on:
 *
 *  - ROUTE GUARD. /admin is the CRM: client names, emails, phone numbers,
 *    invoice amounts, Stripe links. /reserve is a signed engagement letter.
 *    Neither is ever recorded — Clarity is not initialised on those routes,
 *    and consent is revoked if a session navigates into one after starting.
 *    (src/app/admin/layout.tsx additionally marks that subtree
 *    data-clarity-mask, so even a mistake here records redacted content.)
 *
 *  - TAGS. Every session is tagged with its landing page and, when a gclid is
 *    present, its traffic source. That makes "show me only sessions that came
 *    from the Google Ad and landed on /web-design" a filter, not a guess.
 *
 *  - EVENTS + UPGRADE. A call/text/email tap fires a Clarity event AND calls
 *    upgrade(), which prioritises that session for recording. The sessions
 *    worth watching — the ones that converted, and the ones that got close —
 *    are the ones that survive sampling.
 *
 * Config: NEXT_PUBLIC_CLARITY_PROJECT_ID. Unset renders nothing, so local dev
 * and previews never pollute the real project.
 */

const PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

/** Never record these. Prefix match, so /admin/clients/<id> is covered. */
const PRIVATE_PREFIXES = ["/admin", "/reserve"];

function isPrivate(path: string): boolean {
  return PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

function kindOf(href: string): "call" | "text" | "email" | null {
  if (href.startsWith("tel:")) return "call";
  if (href.startsWith("sms:")) return "text";
  if (href.startsWith("mailto:")) return "email";
  return null;
}

export default function ClarityAnalytics() {
  const pathname = usePathname();
  const started = useRef(false);
  const revoked = useRef(false);

  // Start (or deliberately refuse to start) based on the route.
  useEffect(() => {
    if (!PROJECT_ID) return;

    if (isPrivate(pathname)) {
      // Navigated into the CRM mid-session — stop collecting.
      if (started.current && !revoked.current) {
        Clarity.consent(false);
        revoked.current = true;
      }
      return;
    }

    if (!started.current) {
      Clarity.init(PROJECT_ID);
      started.current = true;

      // Landing page = the page the visitor actually arrived on.
      Clarity.setTag("landing_page", pathname);

      const params = new URLSearchParams(window.location.search);
      if (params.has("gclid")) {
        Clarity.setTag("traffic_source", "google_ads");
      } else if (document.referrer && !document.referrer.includes("elmadigital.io")) {
        Clarity.setTag("traffic_source", "referral");
      } else if (!document.referrer) {
        Clarity.setTag("traffic_source", "direct");
      }
    }
  }, [pathname]);

  // One delegated listener for every call/text/email CTA on the site.
  useEffect(() => {
    if (!PROJECT_ID) return;

    const onClick = (e: MouseEvent) => {
      if (!started.current || revoked.current) return;
      const a = (e.target as HTMLElement | null)?.closest?.(
        "a[href]",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const kind = kindOf(a.getAttribute("href") || "");
      if (!kind) return;

      Clarity.event(`${kind}_tap`);
      Clarity.setTag("converted", kind);
      // Make sure this session survives sampling — it's one worth watching.
      Clarity.upgrade(`${kind}_tap`);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
