"use client";

import { useEffect, useState } from "react";

const PHONE = "3608435566";
const DEFAULT_SMS = "Hi Erik, I'd like to learn more about your services.";

/**
 * Sticky call/text bar for phones. Slides in after the hero scrolls away so
 * the primary action never leaves the screen — on mobile, once the hero CTA
 * is gone it's gone. `smsBody` lets each landing page prefill its own text.
 *
 * `formHref` makes the form the primary action where a page has one. Ads
 * reported four tel: "conversions" that were dialer-opens, not calls — so on
 * pages with a form the bar leads with it and keeps Call as the secondary.
 * Pages without a form fall back to the original Call + Text pair.
 */
export default function MobileActionBar({
  smsBody = DEFAULT_SMS,
  formHref,
}: { smsBody?: string; formHref?: string } = {}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
      show ? "translate-y-0" : "translate-y-full"
    }`}
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="flex gap-3 px-4 py-3">
        <a href={`tel:${PHONE}`}
          className={`${formHref ? "" : "flex-1"} flex items-center justify-center gap-2 ${formHref ? "px-5" : ""} py-3.5 rounded-lg font-display font-semibold text-sm text-navy border border-border`}
          aria-label="Call Elma Digital">
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
            <path d="M14 10.667c-1.067 0-2.1-.167-3.067-.467a.967.967 0 0 0-1 .234l-1.9 1.9A12.067 12.067 0 0 1 2.667 5.967l1.9-1.9c.266-.267.35-.634.233-1A9.897 9.897 0 0 1 2.333 2C2.333 1.4 1.933 1 1.333 1H1C.4 1 0 1.4 0 2c0 7.733 6.267 14 14 14 .6 0 1-.4 1-1v-.333c0-.6-.4-1-1-1z"/>
          </svg>
          {formHref ? "" : "Call"}
        </a>
        {formHref ? (
          <a href={formHref}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-lg font-display font-semibold text-sm text-white"
            style={{ background: "var(--navy)" }}>
            Tell me what you need
          </a>
        ) : (
          <a href={`sms:${PHONE}?body=${encodeURIComponent(smsBody)}`}
            className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-lg font-display font-semibold text-sm text-white"
            style={{ background: "var(--navy)" }}>
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v7A1.5 1.5 0 0 1 14.5 12H9l-3 3v-3H1.5A1.5 1.5 0 0 1 0 10.5v-7z"/>
            </svg>
            Text us
          </a>
        )}
      </div>
    </div>
  );
}
