import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AdminProductEdit } from "@/components/admin/admin-product-edit"
import {
  getActiveBrandsForAdmin,
  getActiveCategoriesForAdmin,
  getAdminAffiliateStores,
  getAdminProductById,
} from "@/lib/data/admin-read"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const product = await getAdminProductById(id)

  return {
    title: product ? `Edit: ${product.name}` : "Edit Product",
  }
}

export default async function AdminEditProductPage({ params }: PageProps) {
  const { id } = await params

  const [product, brands, categories, stores] = await Promise.all([
    getAdminProductById(id),
    getActiveBrandsForAdmin(),
    getActiveCategoriesForAdmin(),
    getAdminAffiliateStores(),
  ])

  if (!product) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminProductEdit
        product={product}
        brands={brands}
        categories={categories}
        stores={stores}
      />
    </div>
  )
}
