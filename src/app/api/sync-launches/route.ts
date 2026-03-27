import { NextResponse } from "next/server";

import { getBuilderLaunches, upsertBuilderLaunches } from "@/lib/builder-launches";
import { buildSyncedLaunches } from "@/lib/launch-sync";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;

  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

async function runSync() {
  const currentLaunches = await getBuilderLaunches();
  const syncedLaunches = await buildSyncedLaunches(currentLaunches);
  const result = await upsertBuilderLaunches(syncedLaunches);

  return NextResponse.json({
    ok: result.ok,
    error: result.ok ? null : result.error,
    launches: syncedLaunches,
  });
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return runSync();
}

export async function POST() {
  return runSync();
}
