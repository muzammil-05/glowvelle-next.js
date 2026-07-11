import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BrandForm } from "@/components/admin/brand-form"
import { getAdminBrandById } from "@/lib/data/admin-read"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const brand = await getAdminBrandById(id)

  return {
    title: brand ? `Edit: ${brand.name}` : "Edit Brand",
  }
}

export default async function AdminEditBrandPage({ params }: PageProps) {
  const { id } = await params
  const brand = await getAdminBrandById(id)

  if (!brand) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <BrandForm brand={brand} />
    </div>
  )
}
