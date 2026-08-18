"use client";

import { useMemo, useState } from "react";

const AFIFARM_PER_COW_PER_YEAR = 130; // ongoing software/management fees
const AFIFARM_INSTALL_LOW = 75_000;
const HERDLIFE_BUILD_ANCHOR = 35_000; // representative one-time build
const HERDLIFE_MAINTENANCE_PER_MONTH = 400; // representative monthly

const dollar = (n: number) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function SavingsCalculator() {
  const [cows, setCows] = useState(200);
  const [years, setYears] = useState(5);

  const numbers = useMemo(() => {
    const afiOngoing = cows * AFIFARM_PER_COW_PER_YEAR * years;
    const afiTotal = AFIFARM_INSTALL_LOW + afiOngoing;
    const herdlifeOngoing = HERDLIFE_MAINTENANCE_PER_MONTH * 12 * years;
    const herdlifeTotal = HERDLIFE_BUILD_ANCHOR + herdlifeOngoing;
    const savings = afiTotal - herdlifeTotal;
    return { afiTotal, herdlifeTotal, savings, afiOngoing, herdlifeOngoing };
  }, [cows, years]);

  return (
    <div
      className="rounded-2xl p-6 md:p-10 max-w-3xl mx-auto"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <label className="block">
          <span
            className="text-label block mb-3"
            style={{ color: "rgba(var(--accent-rgb),0.85)" }}
          >
            Your herd size
          </span>
          <div className="flex items-baseline gap-3">
            <input
              type="range"
              min={50}
              max={1000}
              step={10}
              value={cows}
              onChange={(e) => setCows(Number(e.target.value))}
              className="flex-1 accent-yellow-500"
              aria-label="Herd size in cows"
            />
            <span
              className="font-display font-bold text-white whitespace-nowrap"
              style={{ fontSize: "1.5rem", minWidth: "5.5ch", textAlign: "right" }}
            >
              {cows} cows
            </span>
          </div>
        </label>

        <label className="block">
          <span
            className="text-label block mb-3"
            style={{ color: "rgba(var(--accent-rgb),0.85)" }}
          >
            Time horizon
          </span>
          <div className="flex items-baseline gap-3">
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="flex-1 accent-yellow-500"
              aria-label="Years to compare"
            />
            <span
              className="font-display font-bold text-white whitespace-nowrap"
              style={{ fontSize: "1.5rem", minWidth: "5.5ch", textAlign: "right" }}
            >
              {years} {years === 1 ? "year" : "years"}
            </span>
          </div>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div
          className="rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <p
            className="text-label mb-3"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            AfiFarm path
          </p>
          <p
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1 }}
          >
            {dollar(numbers.afiTotal)}
          </p>
          <p
            className="mt-3 text-xs"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            ~{dollar(AFIFARM_INSTALL_LOW)} install + {dollar(numbers.afiOngoing)}{" "}
            in per-cow fees over {years} {years === 1 ? "year" : "years"}
          </p>
        </div>

        <div
          className="rounded-xl p-5"
          style={{
            background: "rgba(var(--accent-rgb),0.05)",
            border: "1px solid rgba(var(--accent-rgb),0.25)",
          }}
        >
          <p
            className="text-label mb-3"
            style={{ color: "rgba(var(--accent-rgb),0.9)" }}
          >
            HerdLife path
          </p>
          <p
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1 }}
          >
            {dollar(numbers.herdlifeTotal)}
          </p>
          <p
            className="mt-3 text-xs"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            ~{dollar(HERDLIFE_BUILD_ANCHOR)} one-time build + {dollar(numbers.herdlifeOngoing)}{" "}
            in maintenance over {years} {years === 1 ? "year" : "years"}
          </p>
        </div>
      </div>

      <div
        className="mt-6 rounded-xl p-5 text-center"
        style={{
          background: "rgba(var(--accent-rgb),0.1)",
          border: "1px solid rgba(var(--accent-rgb),0.4)",
        }}
      >
        <p
          className="text-label mb-2"
          style={{ color: "rgba(var(--accent-rgb),0.95)" }}
        >
          You keep
        </p>
        <p
          className="font-display font-bold"
          style={{
            color: "var(--accent)",
            fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
          }}
        >
          {dollar(numbers.savings)}
        </p>
        <p
          className="mt-3 text-sm"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Estimated over {years} {years === 1 ? "year" : "years"} — and you own the
          platform.
        </p>
      </div>

      <p
        className="mt-6 text-xs text-center"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        Rough estimate. AfiFarm anchors based on published install costs (~$75k+)
        and ~$130/cow/year ongoing fees. HerdLife numbers shown are representative
        — exact scope is quoted per dairy after a free discovery call.
      </p>
    </div>
  );
}
