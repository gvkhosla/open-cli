import { NextResponse } from "next/server";

import { clis } from "@/data/clis";
import { capabilityDefinitions } from "@/lib/capabilities";
import { siteConfig } from "@/lib/site";

export function GET() {
  const featured = clis
    .filter((cli) => cli.agentFriendly || cli.supportsJsonOutput || cli.supportsNonInteractive)
    .slice(0, 80)
    .map((cli) => `- ${cli.name}: /cli/${cli.slug}/agent.md — ${cli.tagline}`)
    .join("\n");

  const capabilities = capabilityDefinitions
    .map((capability) => `- ${capability.label}: ${capability.blurb}`)
    .join("\n");

  const body = `# ${siteConfig.name}\n\n${siteConfig.description}\n\nOpenCLI helps agents and humans choose command-line tools by task, verify setup, and start with safer commands.\n\n## Agent entry points\n- Home/task search: /\n- CLI pages: /cli/{slug}\n- Agent packs: /cli/{slug}/agent.md\n- Machine index: /llms.txt\n- JSON recommendation API: /api/recommend?q={work-description}\n\n## How agents should use OpenCLI\n1. Search or choose a CLI for the user's task.\n2. Open the CLI's /agent.md pack.\n3. Install only if missing.\n4. Run the verify command before task commands.\n5. Start read-only. Ask before destructive, paid, deploy, merge, delete, or secret-exposing actions.\n\n## Capability areas\n${capabilities}\n\n## Agent-ready CLI packs\n${featured}\n`;

  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
