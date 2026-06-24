import { NextResponse } from "next/server";
import { getAdminCredentials, setAdminSession } from "../../../lib/admin-auth";

export async function POST(request) {
  const { username, password } = await request.json();
  const credentials = getAdminCredentials();

  if (username !== credentials.username || password !== credentials.password) {
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
