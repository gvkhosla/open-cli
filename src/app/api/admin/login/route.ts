import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ADMIN_COOKIE = "opencli_admin";

export async function POST(request: Request) {
  const body = (await request.json()) as { username?: string; password?: string };

  if (
    body.username !== process.env.ADMIN_USERNAME ||
    body.password !== process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  return NextResponse.json({ ok: true });
}
