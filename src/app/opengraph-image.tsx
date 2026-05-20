import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Open CLI — Describe the work. Get the CLI stack.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function BrandMark() {
  return (
    <div style={{ width: 54, height: 54, borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", background: "#1E1E1D" }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M7 6.5L13 14L7 21.5" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 20H21" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", alignItems: "center", height: 40, padding: "0 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.1)", background: "#1E1E1D", color: "#AFAEAC", fontSize: 18 }}>{children}</div>;
}

function StackRow({ index, cli, role }: { index: string; cli: string; role: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderTop: index === "1" ? "0" : "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.06)", color: "#868684", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{index}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ color: "#FFFFFF", fontSize: 22, fontFamily: "ui-monospace, monospace" }}>{cli}</div>
          <div style={{ color: "#868684", fontSize: 16 }}>{role}</div>
        </div>
      </div>
      <div style={{ color: "#217EFF", fontSize: 16 }}>agent pack</div>
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#121212", color: "#FFFFFF", position: "relative", overflow: "hidden", fontFamily: "Inter, system-ui, sans-serif", padding: 44 }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 72% 48%, rgba(33,126,255,0.22), transparent 28%)" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <BrandMark />
            <div style={{ fontSize: 28, fontWeight: 500 }}>Open CLI</div>
          </div>
          <div style={{ color: "#868684", fontSize: 20 }}>{siteConfig.url.replace(/^https?:\/\//, "")}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, width: 650 }}>
            <div style={{ fontSize: 74, lineHeight: 0.96, letterSpacing: "-0.055em", fontWeight: 500 }}>
              Describe the work.
              <br />
              Get the CLI stack.
            </div>
            <div style={{ color: "#868684", fontSize: 28, lineHeight: 1.35 }}>
              Agent-ready command-line stacks with install commands, verify checks, alternatives, and copyable guardrails.
            </div>
          </div>

          <div style={{ width: 380, borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)", background: "#1E1E1D", boxShadow: "rgba(33,126,255,0.5) 0px 0px 32px 8px", overflow: "hidden" }}>
            <div style={{ padding: "16px 18px", color: "#868684", fontSize: 16 }}>Recommended stack</div>
            <StackRow index="1" cli="firecrawl" role="Collect sources" />
            <StackRow index="2" cli="poppler" role="Extract PDFs" />
            <StackRow index="3" cli="rg" role="Search corpus" />
            <StackRow index="4" cli="pandoc" role="Write report" />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Pill>172+ CLIs</Pill>
          <Pill>Claude Code</Pill>
          <Pill>Pi</Pill>
          <Pill>Codex</Pill>
          <Pill>Amp</Pill>
        </div>
      </div>
    </div>,
    size,
  );
}
