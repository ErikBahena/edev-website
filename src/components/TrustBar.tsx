const items = [
  "Custom Software", "Elma, WA", "Logo Design", "Grays Harbor County",
  "Website Design", "No Spreadsheets", "Flyer & Print", "Locally Owned",
  "Custom Software", "Elma, WA", "Logo Design", "Grays Harbor County",
  "Website Design", "No Spreadsheets", "Flyer & Print", "Locally Owned",
];

export default function TrustBar() {
  return (
    <div className="border-y border-border overflow-hidden bg-bg py-4">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-5">
            <span className="font-display font-semibold text-sm whitespace-nowrap tracking-tight"
              style={{ color: "rgba(13,27,62,0.28)" }}>
              {item}
            </span>
            <span className="text-blue/40 text-xs flex-shrink-0">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
