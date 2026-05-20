import { NextResponse } from "next/server";

import { buildSuperchargeRecommendation } from "@/lib/supercharge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const capability = searchParams.get("capability") ?? undefined;

  if (!q.trim() && !capability) {
    return NextResponse.json({ error: "Missing q query parameter" }, { status: 400 });
  }

  return NextResponse.json({ recommendation: buildSuperchargeRecommendation(q, capability) });
}
