import type { Metadata } from "next"

import { BlogPostForm } from "@/components/admin/blog-post-form"
import {
  getAdminBlogAuthors,
  getAdminBlogCategories,
} from "@/lib/data/admin-read"

export const metadata: Metadata = {
  title: "New Blog Post",
}

export default async function AdminNewBlogPostPage() {
  const [authors, categories] = await Promise.all([
    getAdminBlogAuthors(),
    getAdminBlogCategories(),
  ])

  return (
    <div className="mx-auto max-w-3xl">
      <BlogPostForm authors={authors} categories={categories} />
    </div>
  )
}
