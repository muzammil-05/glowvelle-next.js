"use server"

import { revalidatePath } from "next/cache"

import { requireAdmin } from "@/lib/auth/admin"
import { createAdminClient } from "@/lib/supabase/admin"

export type ActionResult<T = void> = {
  success: boolean
  error?: string
  data?: T
}

export type SiteSettingsInput = {
  siteName: string
  siteDescription: string
  twitterHandle: string
  defaultOgImage: string
}

const SETTING_KEYS = {
  siteName: "site_name",
  siteDescription: "site_description",
  twitterHandle: "twitter_handle",
  defaultOgImage: "default_og_image",
} as const

function revalidateSettingsData() {
  revalidatePath("/admin/settings")
  revalidatePath("/admin")
}

export async function saveSiteSettings(
  data: SiteSettingsInput,
): Promise<ActionResult> {
  await requireAdmin()

  if (!data.siteName.trim()) {
    return { success: false, error: "Site name is required." }
  }

  const supabase = createAdminClient()

  const rows = [
    { key: SETTING_KEYS.siteName, value: data.siteName.trim() },
    { key: SETTING_KEYS.siteDescription, value: data.siteDescription.trim() },
    { key: SETTING_KEYS.twitterHandle, value: data.twitterHandle.trim() },
    { key: SETTING_KEYS.defaultOgImage, value: data.defaultOgImage.trim() },
  ]

  for (const row of rows) {
    const { error } = await supabase.from("site_settings").upsert(
      {
        key: row.key,
        value: JSON.stringify(row.value),
      },
      { onConflict: "key" },
    )

    if (error) {
      return { success: false, error: error.message }
    }
  }

  revalidateSettingsData()
  return { success: true }
}
