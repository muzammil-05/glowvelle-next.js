"use server"

import { redirect } from "next/navigation"

import { isAdminUser } from "@/lib/auth/admin-utils"
import { createClient } from "@/lib/supabase/server"

export type AdminSignInResult = {
  success: boolean
  error?: string
}

export async function signIn(formData: FormData): Promise<AdminSignInResult> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const redirectTo = String(formData.get("redirectTo") ?? "/admin").trim()

  if (!email || !password) {
    return {
      success: false,
      error: "Email and password are required.",
    }
  }

  const safeRedirect =
    redirectTo.startsWith("/admin") && !redirectTo.startsWith("/admin/login")
      ? redirectTo
      : "/admin"

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    return {
      success: false,
      error: "Invalid email or password.",
    }
  }

  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut()
    return {
      success: false,
      error: "You are not authorized to access the admin area.",
    }
  }

  redirect(safeRedirect)
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
