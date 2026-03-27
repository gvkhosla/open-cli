import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Open CLI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function BrandMark() {
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#151D26",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 6.5L13 14L7 21.5" stroke="#F5F7FA" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 20H21" stroke="#F5F7FA" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: 42,
        padding: "0 18px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(245,247,250,0.72)",
        fontSize: 18,
      }}
    >
      {children}
    </div>
  );
}

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#0F141B",
          color: "#F5F7FA",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Inter, Geist, system-ui, sans-serif",
          padding: 36,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            borderRadius: 32,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "#131B24",
            padding: "42px 46px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <BrandMark />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontSize: 18,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(245,247,250,0.52)",
                }}
              >
                Open CLI
              </div>
              <div style={{ fontSize: 22, color: "rgba(245,247,250,0.78)" }}>
                Minimal guides for choosing the right command-line tool.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 900 }}>
            <div
              style={{
                fontSize: 82,
                lineHeight: 0.98,
                letterSpacing: "-0.06em",
                fontWeight: 600,
              }}
            >
              Choose the right CLI.
              <br />
              Start safely.
            </div>

            <div
              style={{
                fontSize: 28,
                lineHeight: 1.45,
                color: "rgba(245,247,250,0.68)",
                maxWidth: 860,
              }}
            >
              {siteConfig.description}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Pill>Task-first directory</Pill>
              <Pill>Trust signals</Pill>
              <Pill>Install + verify</Pill>
            </div>

            <div
              style={{
                fontSize: 18,
                color: "rgba(245,247,250,0.44)",
              }}
            >
              {siteConfig.url.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
