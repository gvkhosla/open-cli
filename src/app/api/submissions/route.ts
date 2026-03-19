import { NextResponse } from "next/server";

import { saveLaunchSubmission, type LaunchSubmission } from "@/lib/builder-launches";

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<LaunchSubmission>;

  if (!payload.name || !payload.creator || !payload.tagline || !payload.installCommand || !payload.href) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required fields.",
      },
      { status: 400 },
    );
  }

  const result = await saveLaunchSubmission({
    name: payload.name,
    creator: payload.creator,
    creatorUrl: payload.creatorUrl,
    tagline: payload.tagline,
    installCommand: payload.installCommand,
    href: payload.href,
    released: payload.released ?? "New",
    notes: payload.notes,
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
