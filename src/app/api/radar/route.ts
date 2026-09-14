import { NextResponse } from "next/server";

import { getRadarCandidates } from "@/lib/radar";

export function GET() {
  const candidates = getRadarCandidates({ excludePromoted: true }).map((candidate) => ({
    slug: candidate.slug,
    name: candidate.name,
    description: candidate.description,
    category: candidate.detectedCategory,
    installCommand: candidate.detectedInstallCommand,
    firstCommand: candidate.detectedFirstCommand ?? candidate.detectedInstallCommand,
    whyFound: candidate.whyFound,
    beatsIncumbent: candidate.beatsIncumbent ?? null,
    verdict: candidate.verdict ?? "wait",
    sourceUrl: candidate.sourceUrl,
    agentReadinessGuess: candidate.agentReadinessGuess,
    stars: candidate.signals.stars,
  }));

  return NextResponse.json(
    {
      schemaVersion: "opencli.radar.v1",
      total: candidates.length,
      candidates,
    },
    {
      headers: {
        "cache-control": "public, max-age=1800, s-maxage=3600",
      },
    },
  );
}
