import { ImageResponse } from "next/og";

export const alt = "Why Family Dairies Are Replacing AfiFarm in 2026";
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
          padding: "64px 80px",
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
              marginBottom: "20px",
            }}
          >
            Field Guide · 2026
          </div>

          <div
            style={{
              color: "white",
              fontSize: "72px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Why family dairies are</span>
            <span>
              <span>replacing </span>
              <span style={{ color: "#EAB308" }}>AfiFarm</span>
              <span> in 2026</span>
            </span>
          </div>

          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "26px",
              marginTop: "28px",
              maxWidth: "920px",
              lineHeight: 1.45,
            }}
          >
            What AfiFarm actually costs, the real lock-in trap, and what a
            custom alternative looks like for a 50–500-head family dairy.
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
          <span>elmadigital.io/herdlife/escape-afifarm</span>
          <span>Written by Erik Bahena</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
