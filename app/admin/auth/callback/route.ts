import { NextResponse } from "next/server"

import { isAdminUser } from "@/lib/auth/admin-utils"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/admin"

  const safeNext =
    next.startsWith("/admin") && !next.startsWith("/admin/login") ? next : "/admin"

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user && isAdminUser(data.user)) {
      return NextResponse.redirect(`${origin}${safeNext}`)
    }

    if (!error && data.user && !isAdminUser(data.user)) {
      await supabase.auth.signOut()
      return NextResponse.redirect(`${origin}/admin/login?error=unauthorized`)
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=auth`)
}
