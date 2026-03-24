import { NextResponse } from "next/server";

import { buildSuperchargeRecommendation } from "@/lib/supercharge";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const prompt = searchParams.get("q") ?? "";
  const capability = searchParams.get("capability") ?? undefined;

  return NextResponse.json({ recommendation: buildSuperchargeRecommendation(prompt, capability) });
}
