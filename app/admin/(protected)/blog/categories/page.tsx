import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { AdminBlogCategoriesManager } from "@/components/admin/admin-blog-categories-manager"
import { Button } from "@/components/ui/button"
import { getAdminBlogCategoriesList } from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "Blog Categories",
}

export default async function AdminBlogCategoriesPage() {
  const { items, source } = await getAdminBlogCategoriesList()

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        size="sm"
        render={<Link href="/admin/blog" />}
        nativeButton={false}
      >
        <ArrowLeft />
        Back to posts
      </Button>

      <AdminBlogCategoriesManager
        items={items}
        isPlaceholder={source === "placeholder"}
      />
    </div>
  )
}
