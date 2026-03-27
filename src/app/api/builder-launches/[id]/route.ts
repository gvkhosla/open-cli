import { NextResponse } from "next/server";

import { updateBuilderLaunchStatus } from "@/lib/builder-launches";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = (await request.json()) as { status?: "pending" | "approved" | "rejected" };

  if (!body.status || !["pending", "approved", "rejected"].includes(body.status)) {
    return NextResponse.json({ ok: false, error: "Invalid status" }, { status: 400 });
  }

  const result = await updateBuilderLaunchStatus(id, body.status);
  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
