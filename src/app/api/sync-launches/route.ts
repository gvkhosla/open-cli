import { NextResponse } from "next/server";

import { getBuilderLaunches, upsertBuilderLaunches } from "@/lib/builder-launches";
import { buildSyncedLaunches } from "@/lib/launch-sync";

export async function POST() {
  const currentLaunches = await getBuilderLaunches();
  const syncedLaunches = await buildSyncedLaunches(currentLaunches);
  const result = await upsertBuilderLaunches(syncedLaunches);

  return NextResponse.json({
    ok: result.ok,
    error: result.ok ? null : result.error,
    launches: syncedLaunches,
  });
}
