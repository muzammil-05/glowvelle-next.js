import type { Metadata } from "next"

import { BrandForm } from "@/components/admin/brand-form"

export const metadata: Metadata = {
  title: "New Brand",
}

export default function AdminNewBrandPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <BrandForm />
    </div>
  )
}
