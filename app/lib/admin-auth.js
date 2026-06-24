import { cookies } from "next/headers";

const sessionCookie = "td_admin_session";

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "TrueDesigns@123",
    token: process.env.ADMIN_SESSION_TOKEN || "true-designs-admin-session",
  };
}

export async function isAdminLoggedIn() {
  const cookieStore = await cookies();
  return cookieStore.get(sessionCookie)?.value === getAdminCredentials().token;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie, getAdminCredentials().token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(sessionCookie);
}
