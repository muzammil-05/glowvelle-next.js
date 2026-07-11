"use server"

import { revalidatePath, revalidateTag } from "next/cache"

import { requireAdmin } from "@/lib/auth/admin"
import { createAdminClient } from "@/lib/supabase/admin"
import { generateUniqueSlug, slugify } from "@/lib/utils/slugify"
import type { BlogPostStatus } from "@/types/database"

export type ActionResult<T = void> = {
  success: boolean
  error?: string
  data?: T
}

export type BlogPostInput = {
  title: string
  slug?: string
  excerpt?: string | null
  authorId: string
  blogCategoryId: string
  featuredImageUrl?: string | null
  content: unknown
  readTimeMinutes?: number | null
  publishedAt?: string | null
  isFeatured?: boolean
  status: BlogPostStatus
  metaDescription?: string | null
}

export type BlogCategoryInput = {
  name: string
  slug?: string
  description?: string | null
  sortOrder?: number
}

export type BlogAuthorInput = {
  name: string
  slug?: string
  avatarUrl?: string | null
  bio?: string | null
}

const BLOG_IMAGES_BUCKET = "blog-images"

function revalidateBlogData(slug?: string) {
  revalidatePath("/admin/blog")
  revalidatePath("/admin/blog/categories")
  revalidateTag("blog", "max")
  revalidateTag("blog-posts", "max")
  revalidateTag("blog-categories", "max")
  revalidatePath("/blog")

  if (slug) {
    revalidateTag(`blog-post:${slug}`, "max")
    revalidatePath(`/blog/${slug}`)
  }
}

function parseContentJson(raw: string): { ok: true; value: unknown } | { ok: false; error: string } {
  const trimmed = raw.trim()
  if (!trimmed) {
    return { ok: true, value: { sections: [], faq: [], tags: [], paragraphs: [] } }
  }

  try {
    const parsed = JSON.parse(trimmed) as unknown
    return { ok: true, value: parsed }
  } catch {
    return { ok: false, error: "Content must be valid JSON." }
  }
}

async function blogSlugIsAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()

  if (error) return false
  if (!data) return true
  return excludeId != null && data.id === excludeId
}

async function resolveBlogSlug(
  title: string,
  provided?: string,
  excludeId?: string,
): Promise<string> {
  const base = provided?.trim() ? slugify(provided) : slugify(title)
  return generateUniqueSlug(base || "post", (s) => blogSlugIsAvailable(s, excludeId))
}

async function blogCategorySlugIsAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("blog_categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()

  if (error) return false
  if (!data) return true
  return excludeId != null && data.id === excludeId
}

async function resolveBlogCategorySlug(
  name: string,
  provided?: string,
  excludeId?: string,
): Promise<string> {
  const base = provided?.trim() ? slugify(provided) : slugify(name)
  return generateUniqueSlug(base || "category", (s) =>
    blogCategorySlugIsAvailable(s, excludeId),
  )
}

export async function createBlogPost(
  data: BlogPostInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin()

  if (!data.title.trim()) {
    return { success: false, error: "Title is required." }
  }
  if (!data.authorId || !data.blogCategoryId) {
    return { success: false, error: "Author and category are required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveBlogSlug(data.title, data.slug)

  const { data: row, error } = await supabase
    .from("blog_posts")
    .insert({
      title: data.title.trim(),
      slug,
      excerpt: data.excerpt?.trim() || null,
      author_id: data.authorId,
      blog_category_id: data.blogCategoryId,
      featured_image_url: data.featuredImageUrl?.trim() || null,
      content: data.content ?? { sections: [], faq: [], tags: [], paragraphs: [] },
      read_time_minutes: data.readTimeMinutes ?? null,
      published_at: data.publishedAt || null,
      is_featured: data.isFeatured ?? false,
      status: data.status,
      meta_description: data.metaDescription?.trim() || null,
    })
    .select("id, slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create blog post." }
  }

  revalidateBlogData(row.slug)
  return { success: true, data: { id: row.id, slug: row.slug } }
}

export async function updateBlogPost(
  id: string,
  data: BlogPostInput,
): Promise<ActionResult<{ slug: string }>> {
  await requireAdmin()

  if (!data.title.trim()) {
    return { success: false, error: "Title is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveBlogSlug(data.title, data.slug, id)

  const { data: row, error } = await supabase
    .from("blog_posts")
    .update({
      title: data.title.trim(),
      slug,
      excerpt: data.excerpt?.trim() || null,
      author_id: data.authorId,
      blog_category_id: data.blogCategoryId,
      featured_image_url: data.featuredImageUrl?.trim() || null,
      content: data.content ?? { sections: [], faq: [], tags: [], paragraphs: [] },
      read_time_minutes: data.readTimeMinutes ?? null,
      published_at: data.publishedAt || null,
      is_featured: data.isFeatured ?? false,
      status: data.status,
      meta_description: data.metaDescription?.trim() || null,
    })
    .eq("id", id)
    .select("slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to update blog post." }
  }

  revalidateBlogData(row.slug)
  return { success: true, data: { slug: row.slug } }
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateBlogData(post?.slug)
  return { success: true }
}

export async function parseBlogContentJson(
  raw: string,
): Promise<ActionResult<{ content: unknown }>> {
  await requireAdmin()
  const result = parseContentJson(raw)
  if (!result.ok) {
    return { success: false, error: result.error }
  }
  return { success: true, data: { content: result.value } }
}

export async function createBlogCategory(
  data: BlogCategoryInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Category name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveBlogCategorySlug(data.name, data.slug)

  const { data: row, error } = await supabase
    .from("blog_categories")
    .insert({
      name: data.name.trim(),
      slug,
      description: data.description?.trim() || null,
      sort_order: data.sortOrder ?? 0,
    })
    .select("id, slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create blog category." }
  }

  revalidateBlogData()
  return { success: true, data: { id: row.id, slug: row.slug } }
}

export async function updateBlogCategory(
  id: string,
  data: BlogCategoryInput,
): Promise<ActionResult<{ slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Category name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveBlogCategorySlug(data.name, data.slug, id)

  const { data: row, error } = await supabase
    .from("blog_categories")
    .update({
      name: data.name.trim(),
      slug,
      description: data.description?.trim() || null,
      sort_order: data.sortOrder ?? 0,
    })
    .eq("id", id)
    .select("slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to update blog category." }
  }

  revalidateBlogData()
  return { success: true, data: { slug: row.slug } }
}

export async function deleteBlogCategory(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()
  const { error } = await supabase.from("blog_categories").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateBlogData()
  return { success: true }
}

export async function createBlogAuthor(
  data: BlogAuthorInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Author name is required." }
  }

  const supabase = createAdminClient()
  const base = data.slug?.trim() ? slugify(data.slug) : slugify(data.name)
  const slug = base || "author"

  const { data: row, error } = await supabase
    .from("blog_authors")
    .insert({
      name: data.name.trim(),
      slug,
      avatar_url: data.avatarUrl?.trim() || null,
      bio: data.bio?.trim() || null,
    })
    .select("id, slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create blog author." }
  }

  revalidateBlogData()
  return { success: true, data: { id: row.id, slug: row.slug } }
}

export async function updateBlogAuthor(
  id: string,
  data: BlogAuthorInput,
): Promise<ActionResult> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Author name is required." }
  }

  const supabase = createAdminClient()
  const slug = data.slug?.trim() ? slugify(data.slug) : slugify(data.name)

  const { error } = await supabase
    .from("blog_authors")
    .update({
      name: data.name.trim(),
      slug: slug || "author",
      avatar_url: data.avatarUrl?.trim() || null,
      bio: data.bio?.trim() || null,
    })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateBlogData()
  return { success: true }
}

export async function uploadBlogFeaturedImage(
  formData: FormData,
): Promise<ActionResult<{ imageUrl: string }>> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "No file provided." }
  }

  const supabase = createAdminClient()
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
  const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`
  const storagePath = `featured/${filename}`

  const { error: uploadError } = await supabase.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(storagePath, file, {
      contentType: file.type || undefined,
      upsert: false,
    })

  if (uploadError) {
    return { success: false, error: uploadError.message }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(storagePath)

  return { success: true, data: { imageUrl: publicUrl } }
}
