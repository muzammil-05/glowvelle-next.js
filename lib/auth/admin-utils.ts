import type { User } from "@supabase/supabase-js"

function parseAdminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS ?? ""
  return new Set(
    raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  )
}

export function isAdminUser(user: User | null | undefined): boolean {
  if (!user) {
    return false
  }

  if (user.app_metadata?.role === "admin") {
    return true
  }

  const email = user.email?.trim().toLowerCase()
  if (!email) {
    return false
  }

  return parseAdminEmails().has(email)
}
