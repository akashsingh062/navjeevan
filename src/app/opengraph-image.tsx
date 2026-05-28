import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Nav Jeevan Public School – NJPS Khabharabhar | Best School in Kushinagar, UP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(212, 98, 26, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "rgba(26, 107, 69, 0.15)",
            display: "flex",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #D4621A, #1A6B45, #D4621A)",
            display: "flex",
          }}
        />

        {/* NJPS Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: 20,
            background: "linear-gradient(135deg, #D4621A, #B8521A)",
            marginBottom: 28,
            boxShadow: "0 8px 32px rgba(212, 98, 26, 0.4)",
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 900,
              color: "white",
              letterSpacing: -1,
            }}
          >
            NJ
          </span>
        </div>

        {/* School Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: "white",
              letterSpacing: -1,
              lineHeight: 1.1,
              textAlign: "center",
            }}
          >
            Nav Jeevan Public School
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#D4621A",
              letterSpacing: 4,
              textTransform: "uppercase" as const,
              marginTop: 4,
            }}
          >
            NJPS Khabharabhar
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 4,
            borderRadius: 4,
            background: "linear-gradient(90deg, #D4621A, #1A6B45)",
            marginTop: 24,
            marginBottom: 20,
            display: "flex",
          }}
        />

        {/* Tagline */}
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "rgba(255,255,255,0.75)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Best CBSE-Pattern School in Kaptanganj, Kushinagar, Uttar Pradesh
        </span>

        {/* Location badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 28,
            padding: "10px 24px",
            borderRadius: 50,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <span style={{ fontSize: 16, color: "rgba(255,255,255,0.6)" }}>
            📍 Khabharabhar, Kaptanganj, Kushinagar, UP 274301
          </span>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #1A6B45, #D4621A, #1A6B45)",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
