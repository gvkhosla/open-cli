import Image from "next/image";

// Wordmarks from agentskills.io/images/logos. Codex: Lobe Icons' Codex mark.
// Hermes: NousResearch/hermes-agent website/static/img/favicon.svg, resized locally.
const marks = [
  ["Claude Code", "claude-code.svg", 99], ["Pi", "pi.svg", 21],
  ["Codex", "codex.svg", 23], ["Amp", "amp.svg", 40],
  ["OpenCode", "opencode.svg", 73], ["OpenClaw", "openclaw.svg", 75],
  ["Hermes", "hermes.webp", 23],
] as const;

export function AgentMarks() {
  return <ul className="agent-marks" aria-label="Agent clients">{marks.map(([name, file, width]) => {
    const caption = name === "Hermes" || name === "Codex";
    return <li key={file}><Image unoptimized src={`/agents/${file}`} alt={caption ? "" : name} width={width} height={24} style={{width, height:24, objectFit:"contain"}} />{caption && name}</li>;
  })}</ul>;
}
