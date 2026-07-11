"use server"

import { revalidatePath, revalidateTag } from "next/cache"

import { requireAdmin } from "@/lib/auth/admin"
import { createAdminClient } from "@/lib/supabase/admin"
import { generateUniqueSlug, slugify } from "@/lib/utils/slugify"
import type { ReferenceStatus } from "@/types/database"

export type ActionResult<T = void> = {
  success: boolean
  error?: string
  data?: T
}

export type CategoryInput = {
  name: string
  slug?: string
  icon?: string | null
  imageUrl?: string | null
  description?: string | null
  sortOrder?: number
  productCount?: number
  status: ReferenceStatus
}

function revalidateCategoryData(slug?: string) {
  revalidatePath("/admin/categories")
  revalidateTag("categories", "max")
  revalidatePath("/shop")

  if (slug) {
    revalidateTag(`category:${slug}`, "max")
  }
}

async function slugIsAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()

  if (error) return false
  if (!data) return true
  return excludeId != null && data.id === excludeId
}

async function resolveSlug(
  name: string,
  provided?: string,
  excludeId?: string,
): Promise<string> {
  const base = provided?.trim() ? slugify(provided) : slugify(name)
  return generateUniqueSlug(base || "category", (s) => slugIsAvailable(s, excludeId))
}

export async function createCategory(
  data: CategoryInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Category name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveSlug(data.name, data.slug)

  const { data: row, error } = await supabase
    .from("categories")
    .insert({
      name: data.name.trim(),
      slug,
      icon: data.icon?.trim() || null,
      image_url: data.imageUrl?.trim() || null,
      description: data.description?.trim() || null,
      sort_order: data.sortOrder ?? 0,
      product_count: data.productCount ?? 0,
      status: data.status,
    })
    .select("id, slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create category." }
  }

  revalidateCategoryData(row.slug)
  return { success: true, data: { id: row.id, slug: row.slug } }
}

export async function updateCategory(
  id: string,
  data: CategoryInput,
): Promise<ActionResult<{ slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Category name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveSlug(data.name, data.slug, id)

  const { data: row, error } = await supabase
    .from("categories")
    .update({
      name: data.name.trim(),
      slug,
      icon: data.icon?.trim() || null,
      image_url: data.imageUrl?.trim() || null,
      description: data.description?.trim() || null,
      sort_order: data.sortOrder ?? 0,
      product_count: data.productCount ?? 0,
      status: data.status,
    })
    .eq("id", id)
    .select("slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to update category." }
  }

  revalidateCategoryData(row.slug)
  return { success: true, data: { slug: row.slug } }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: category } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateCategoryData(category?.slug)
  return { success: true }
}
