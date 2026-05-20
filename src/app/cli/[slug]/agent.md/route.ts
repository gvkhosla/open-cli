import { NextResponse } from "next/server";

import { clis, getCliBySlug } from "@/data/clis";
import { buildAgentPack } from "@/lib/agent-pack";

type AgentPackRouteProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return clis.map((cli) => ({ slug: cli.slug }));
}

export async function GET(_request: Request, { params }: AgentPackRouteProps) {
  const { slug } = await params;
  const cli = getCliBySlug(slug);

  if (!cli) {
    return new NextResponse("Agent pack not found", { status: 404 });
  }

  return new NextResponse(buildAgentPack(cli), {
    headers: {
      "content-type": "text/markdown; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
