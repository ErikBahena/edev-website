"use client";

const items = [
  "Save Time",
  "Custom Software",
  "Automate Workflows",
  "Reduce Stress",
  "Modern Solutions",
  "Local Businesses",
  "Built for You",
  "Remove the Boring",
];

export default function Marquee() {
  const track = items.map((item, i) => (
    <span key={i} className="flex items-center gap-8 px-4">
      <span className="text-xl md:text-2xl font-display font-medium text-text-dim whitespace-nowrap">
        {item}
      </span>
      <span className="text-accent text-sm">◆</span>
    </span>
  ));

  return (
    <div className="py-8 border-y border-border overflow-hidden">
      <div className="marquee-track">
        {track}
        {track}
      </div>
    </div>
  );
}
