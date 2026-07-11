import type { Metadata } from "next"

import { AdminProductsTable } from "@/components/admin/admin-products-table"
import { getAdminProducts } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Products",
}

export default async function AdminProductsPage() {
  const { items, source } = await getAdminProducts()

  return (
    <AdminProductsTable
      items={items}
      isPlaceholder={source === "placeholder"}
    />
  )
}
