import type { Metadata } from "next"

import { AdminBrandsTable } from "@/components/admin/admin-brands-table"
import { getAdminBrands } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Brands",
}

export default async function AdminBrandsPage() {
  const { items, source } = await getAdminBrands()

  return (
    <AdminBrandsTable items={items} isPlaceholder={source === "placeholder"} />
  )
}
