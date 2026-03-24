import { NextResponse } from "next/server";

import { getDirectoryResults } from "@/lib/directory";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") ?? "All";
  const rawLimit = Number.parseInt(searchParams.get("limit") ?? "24", 10);
  const limit = Number.isFinite(rawLimit) ? Math.min(Math.max(rawLimit, 1), 120) : 24;

  return NextResponse.json(getDirectoryResults(query, limit, { category }));
}
