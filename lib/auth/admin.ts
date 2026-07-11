import { redirect } from "next/navigation"

import { isAdminUser } from "@/lib/auth/admin-utils"
import { createClient } from "@/lib/supabase/server"

export { isAdminUser } from "./admin-utils"

export async function getAdminSession() {
  const supabase = await createClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user || !isAdminUser(user)) {
    return null
  }

  return user
}

export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login?redirectTo=/admin")
  }

  if (!isAdminUser(user)) {
    redirect("/admin/login?error=unauthorized")
  }

  return user
}
