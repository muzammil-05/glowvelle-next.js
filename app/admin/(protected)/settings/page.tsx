import type { Metadata } from "next"

import { AdminSettingsForm } from "@/components/admin/admin-settings-form"
import { getSiteSettings } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Settings",
}

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""

  return (
    <div className="mx-auto max-w-2xl">
      <AdminSettingsForm settings={settings} supabaseUrl={supabaseUrl} />
    </div>
  )
}
