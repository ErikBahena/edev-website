import { ImageResponse } from "next/og";

export const alt = "HerdLife — Escape the $75,000 AfiFarm Trap";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0D1B3E 0%, #162852 60%, #0D1B3E 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Yellow accent glow top-right */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(234,179,8,0.30) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "6px",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#034CB2" }}>Elma</span>
          <span style={{ color: "white" }}>Digital</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "rgba(234,179,8,0.9)",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            HerdLife · Custom Dairy Software
          </div>

          <div
            style={{
              color: "white",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 20px",
            }}
          >
            <span>Escape the</span>
            <span style={{ color: "#EAB308" }}>$75,000</span>
            <span>AfiFarm trap.</span>
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "28px",
              marginTop: "32px",
              maxWidth: "880px",
              lineHeight: 1.4,
            }}
          >
            Custom-built dairy herd management. Open data. Any device. A
            fraction of the AfiFarm quote.
          </div>
        </div>

        <div
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>elmadigital.io/herdlife</span>
          <span>Built in Grays Harbor, WA</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
