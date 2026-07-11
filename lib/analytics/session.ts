import { randomUUID } from "crypto";

import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME = "gv_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export async function getOrCreateSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (existing?.trim()) {
    return existing.trim();
  }

  const sessionId = randomUUID();

  cookieStore.set(SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  return sessionId;
}
