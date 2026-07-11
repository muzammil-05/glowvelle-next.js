import type { Metadata } from "next"

import { AdminNewsletterTable } from "@/components/admin/admin-newsletter-table"
import { getAdminNewsletterSubscribers } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Newsletter",
}

export default async function AdminNewsletterPage() {
  const { items, source } = await getAdminNewsletterSubscribers()

  return (
    <AdminNewsletterTable
      items={items}
      isPlaceholder={source === "placeholder"}
    />
  )
}
