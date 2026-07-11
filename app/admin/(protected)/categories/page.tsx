import type { Metadata } from "next"

import { AdminCategoriesTable } from "@/components/admin/admin-categories-table"
import { getAdminCategories } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Categories",
}

export default async function AdminCategoriesPage() {
  const { items, source } = await getAdminCategories()

  return (
    <AdminCategoriesTable
      items={items}
      isPlaceholder={source === "placeholder"}
    />
  )
}
