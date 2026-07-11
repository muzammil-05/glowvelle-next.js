"use server"

import { revalidatePath } from "next/cache"

import { requireAdmin } from "@/lib/auth/admin"
import { createAdminClient } from "@/lib/supabase/admin"

export type ActionResult<T = void> = {
  success: boolean
  error?: string
  data?: T
}

function revalidateNewsletterData() {
  revalidatePath("/admin/newsletter")
}

export async function unsubscribeSubscriber(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { error } = await supabase
    .from("newsletter_subscribers")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateNewsletterData()
  return { success: true }
}

export async function deleteSubscriber(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()
  const { error } = await supabase
    .from("newsletter_subscribers")
    .delete()
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateNewsletterData()
  return { success: true }
}
