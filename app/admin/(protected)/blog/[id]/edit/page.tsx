import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { BlogPostForm } from "@/components/admin/blog-post-form"
import {
  getAdminBlogAuthors,
  getAdminBlogCategories,
  getAdminBlogPostById,
} from "@/lib/data/admin-read"

type PageProps = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getAdminBlogPostById(id)

  return {
    title: post ? `Edit: ${post.title}` : "Edit Blog Post",
  }
}

export default async function AdminEditBlogPostPage({ params }: PageProps) {
  const { id } = await params

  const [post, authors, categories] = await Promise.all([
    getAdminBlogPostById(id),
    getAdminBlogAuthors(),
    getAdminBlogCategories(),
  ])

  if (!post) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-3xl">
      <BlogPostForm post={post} authors={authors} categories={categories} />
    </div>
  )
}
