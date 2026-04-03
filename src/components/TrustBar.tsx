const trust = [
  { icon: "📍", label: "Locally owned in Elma, WA" },
  { icon: "⚡", label: "Fast turnaround" },
  { icon: "🤝", label: "Relationship-first" },
  { icon: "🏆", label: "2 businesses transformed" },
  { icon: "📞", label: "Real person, real answers" },
];

export default function TrustBar() {
  return (
    <div className="bg-blue py-4 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {trust.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-base leading-none">{item.icon}</span>
            <span className="text-white/90 text-sm font-medium font-display whitespace-nowrap">
              {item.label}
            </span>
            {i < trust.length - 1 && (
              <span className="hidden md:block text-white/25 ml-8">·</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
