export default function TrustBar() {
  return (
    <div className="bg-blue px-6 md:px-14 py-3.5 flex items-center justify-between gap-6 overflow-hidden">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-1.5">
        {["Locally owned in Elma, WA", "Serving all of Grays Harbor County", "Real person — no runaround", "Fast turnaround"].map((item, i) => (
          <span key={i} className="flex items-center gap-2.5 text-white/80 text-xs font-medium font-display whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-amber inline-block flex-shrink-0" />
            {item}
          </span>
        ))}
      </div>
      <a href="tel:3608435566" className="hidden md:flex items-center gap-2 text-white font-display font-semibold text-sm whitespace-nowrap hover:text-amber transition-colors flex-shrink-0">
        (360) 843-5566
      </a>
    </div>
  );
}
