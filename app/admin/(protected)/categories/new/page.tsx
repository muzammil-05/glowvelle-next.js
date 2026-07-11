import type { Metadata } from "next"

import { CategoryForm } from "@/components/admin/category-form"

export const metadata: Metadata = {
  title: "New Category",
}

export default function AdminNewCategoryPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <CategoryForm />
    </div>
  )
}
