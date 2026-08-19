/**
 * Trust signals placed adjacent to the primary CTA — the highest-leverage
 * spot on a service landing page. Kept honest by design: it renders only what
 * is passed in, so nothing here claims a review count or rating we don't have.
 * When real Google reviews exist, pass `rating` + `reviewCount` and the star
 * row appears; until then it shows the verifiable proof we do have.
 */
type Props = {
  builtFor: string;          // "Alberto's Residential Painting · Elma, WA"
  personName?: string;       // "Luis Cruz"
  personRole?: string;       // "Owner"
  avatarSrc?: string;
  facts?: string[];          // short verifiable chips: "Live since 2025", "3 crews"
  rating?: number;           // e.g. 5
  reviewCount?: number;      // e.g. 4
  onDark?: boolean;
};

export default function ProofStrip({
  builtFor, personName, personRole, avatarSrc, facts = [], rating, reviewCount, onDark = true,
}: Props) {
  const fg = onDark ? "rgba(255,255,255,0.78)" : "var(--text)";
  const muted = onDark ? "rgba(255,255,255,0.45)" : "var(--text-muted)";
  const line = onDark ? "rgba(255,255,255,0.12)" : "var(--border)";
  const showStars = typeof rating === "number" && typeof reviewCount === "number" && reviewCount > 0;

  return (
    <div
      className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm"
      style={{ color: fg }}
      aria-label="Proof"
    >
      {showStars && (
        <span className="inline-flex items-center gap-2">
          <span aria-hidden="true" style={{ color: "var(--accent)", letterSpacing: "0.05em" }}>
            {"★".repeat(Math.round(rating!))}
          </span>
          <span className="font-display font-semibold">{rating!.toFixed(1)}</span>
          <span style={{ color: muted }}>· {reviewCount} Google reviews</span>
        </span>
      )}

      <span className="inline-flex items-center gap-3">
        {avatarSrc && (
          <span
            className="relative inline-block h-8 w-8 overflow-hidden rounded-full flex-shrink-0"
            style={{ border: `1px solid ${line}` }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatarSrc} alt={personName ?? ""} className="h-full w-full object-cover" />
          </span>
        )}
        <span>
          <span className="font-display font-semibold">Built for {builtFor}</span>
          {personName && (
            <span style={{ color: muted }}>
              {" "}· {personName}{personRole ? `, ${personRole}` : ""}
            </span>
          )}
        </span>
      </span>

      {facts.map((f) => (
        <span
          key={f}
          className="inline-flex items-center rounded-full px-3 py-1 text-xs font-display font-medium"
          style={{ border: `1px solid ${line}`, color: muted }}
        >
          {f}
        </span>
      ))}
    </div>
  );
}
