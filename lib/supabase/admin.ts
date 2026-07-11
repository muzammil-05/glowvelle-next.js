import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { SupabaseClient } from "@supabase/supabase-js"

import { getSupabaseEnv } from "./env"

let adminClient: SupabaseClient | undefined

function getServiceRoleKey(): string {
  const value = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!value || value.trim() === "") {
    throw new Error(
      "Missing required environment variable: SUPABASE_SERVICE_ROLE_KEY. " +
        "Add it to .env.local (see .env.example). " +
        "Never expose this key to the client.",
    )
  }

  return value
}

/**
 * Service-role Supabase client for admin server actions only.
 * Bypasses RLS — always pair with requireAdmin() before mutations.
 */
export function createAdminClient() {
  if (adminClient) {
    return adminClient
  }

  const { url } = getSupabaseEnv()
  adminClient = createSupabaseClient(url, getServiceRoleKey(), {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return adminClient
}
