import type { Metadata } from "next"

import { ProductForm } from "@/components/admin/product-form"
import {
  getActiveBrandsForAdmin,
  getActiveCategoriesForAdmin,
} from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "New Product",
}

export default async function AdminNewProductPage() {
  const [brands, categories] = await Promise.all([
    getActiveBrandsForAdmin(),
    getActiveCategoriesForAdmin(),
  ])

  return (
    <div className="mx-auto max-w-3xl">
      <ProductForm brands={brands} categories={categories} />
    </div>
  )
}
