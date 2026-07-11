import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CategoryForm } from "@/components/admin/category-form"
import { getAdminCategoryById } from "@/lib/data/admin-read"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const category = await getAdminCategoryById(id)

  return {
    title: category ? `Edit: ${category.name}` : "Edit Category",
  }
}

export default async function AdminEditCategoryPage({ params }: PageProps) {
  const { id } = await params
  const category = await getAdminCategoryById(id)

  if (!category) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <CategoryForm category={category} />
    </div>
  )
}
