import type { Metadata } from "next"

import { AdminBlogTable } from "@/components/admin/admin-blog-table"
import { getAdminBlogPosts } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Blog",
}

export default async function AdminBlogPage() {
  const { items, source } = await getAdminBlogPosts()

  return (
    <AdminBlogTable items={items} isPlaceholder={source === "placeholder"} />
  )
}
