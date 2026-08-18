import { ImageResponse } from "next/og";

export const alt = "PaintMate — Get Your Evenings Back";
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
            PaintMate · Custom Software for Trades
          </div>

          <div
            style={{
              color: "white",
              fontSize: "96px",
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 24px",
            }}
          >
            <span>Get your</span>
            <span style={{ color: "#EAB308" }}>evenings</span>
            <span>back.</span>
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
            Custom job-cost software for painting contractors and trades.
            Phone clock-in, supplier automation, invoicing in 5 minutes.
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
          <span>elmadigital.io/paintmate</span>
          <span>Built in Grays Harbor, WA</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
