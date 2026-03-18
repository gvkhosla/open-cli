import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Open CLI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#08090b",
          color: "#f8f8f8",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.16) 0.8px, transparent 1px), radial-gradient(rgba(183,182,233,0.12) 0.8px, transparent 1px), radial-gradient(rgba(238,176,140,0.12) 0.8px, transparent 1px)",
            backgroundSize: "28px 28px, 48px 48px, 68px 68px",
            backgroundPosition: "0 0, 10px 14px, 22px 30px",
            opacity: 0.25,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 520,
            height: 520,
            borderRadius: 999,
            background: "rgba(238,176,140,0.12)",
            filter: "blur(80px)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "54px 64px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: "#eeb08c",
                boxShadow: "0 0 24px rgba(183,182,233,0.35)",
              }}
            />
            <div
              style={{
                fontSize: 20,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
              }}
            >
              {siteConfig.name}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 880 }}>
            <div
              style={{
                fontSize: 18,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.42)",
              }}
            >
              The open CLI ecosystem
            </div>
            <div
              style={{
                fontSize: 82,
                lineHeight: 1,
                letterSpacing: "-0.06em",
                fontWeight: 600,
              }}
            >
              Find terminal apps you can install in seconds and use right away.
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.5,
                color: "rgba(255,255,255,0.6)",
                maxWidth: 860,
              }}
            >
              Discover useful CLIs, compare momentum, and copy the first command to run.
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                gap: 16,
                color: "rgba(255,255,255,0.46)",
                fontSize: 18,
              }}
            >
              <div>Directory</div>
              <div>Leaderboard</div>
              <div>Install guides</div>
            </div>
            <div style={{ color: "rgba(255,255,255,0.42)", fontSize: 18 }}>
              From the team at Khosla Lab
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
