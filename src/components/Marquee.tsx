"use client";

const items = [
  "Custom Software",
  "Web Design",
  "Logo Design",
  "Local Business",
  "Grays Harbor",
  "Elma, WA",
  "Built Around You",
  "No Spreadsheets",
];

export default function Marquee() {
  const track = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 px-4">
      <span className="text-lg md:text-xl font-display font-semibold text-navy/30 whitespace-nowrap tracking-tight">
        {item}
      </span>
      <span className="text-blue text-xs">◆</span>
    </span>
  ));

  return (
    <div className="py-6 border-y border-border overflow-hidden bg-bg-elevated">
      <div className="marquee-track">
        {track}
        {track}
      </div>
    </div>
  );
}
