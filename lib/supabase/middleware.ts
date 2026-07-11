import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { isAdminUser } from "@/lib/auth/admin-utils"

import { getSupabaseEnv } from "./env"

function isPublicAdminPath(pathname: string): boolean {
  return pathname === "/admin/login" || pathname.startsWith("/admin/auth/")
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const { url, anonKey } = getSupabaseEnv()

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value)
        })

        supabaseResponse = NextResponse.next({
          request,
        })

        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options)
        })
      },
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isAdminArea = pathname.startsWith("/admin")

  if (isAdminArea && !isPublicAdminPath(pathname)) {
    if (!user) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      loginUrl.searchParams.set("redirectTo", pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!isAdminUser(user)) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = "/admin/login"
      loginUrl.searchParams.set("error", "unauthorized")
      return NextResponse.redirect(loginUrl)
    }
  }

  if (pathname === "/admin/login" && user && isAdminUser(user)) {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = "/admin"
    adminUrl.search = ""
    return NextResponse.redirect(adminUrl)
  }

  return supabaseResponse
}
