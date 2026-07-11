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

export type BrandInput = {
  name: string
  slug?: string
  tagline?: string | null
  description?: string | null
  founded?: string | null
  country?: string | null
  imageUrl?: string | null
  website?: string | null
  instagramFollowers?: string | null
  status: ReferenceStatus
}

function revalidateBrandData(slug?: string) {
  revalidatePath("/admin/brands")
  revalidateTag("brands", "max")
  revalidatePath("/brands")

  if (slug) {
    revalidateTag(`brand:${slug}`, "max")
    revalidatePath(`/brands/${slug}`)
  }
}

async function slugIsAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("brands")
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
  return generateUniqueSlug(base || "brand", (s) => slugIsAvailable(s, excludeId))
}

export async function createBrand(
  data: BrandInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Brand name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveSlug(data.name, data.slug)

  const { data: row, error } = await supabase
    .from("brands")
    .insert({
      name: data.name.trim(),
      slug,
      tagline: data.tagline?.trim() || null,
      description: data.description?.trim() || null,
      founded: data.founded?.trim() || null,
      country: data.country?.trim() || null,
      image_url: data.imageUrl?.trim() || null,
      website: data.website?.trim() || null,
      instagram_followers: data.instagramFollowers?.trim() || null,
      status: data.status,
    })
    .select("id, slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create brand." }
  }

  revalidateBrandData(row.slug)
  return { success: true, data: { id: row.id, slug: row.slug } }
}

export async function updateBrand(
  id: string,
  data: BrandInput,
): Promise<ActionResult<{ slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Brand name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveSlug(data.name, data.slug, id)

  const { data: row, error } = await supabase
    .from("brands")
    .update({
      name: data.name.trim(),
      slug,
      tagline: data.tagline?.trim() || null,
      description: data.description?.trim() || null,
      founded: data.founded?.trim() || null,
      country: data.country?.trim() || null,
      image_url: data.imageUrl?.trim() || null,
      website: data.website?.trim() || null,
      instagram_followers: data.instagramFollowers?.trim() || null,
      status: data.status,
    })
    .eq("id", id)
    .select("slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to update brand." }
  }

  revalidateBrandData(row.slug)
  return { success: true, data: { slug: row.slug } }
}

export async function deleteBrand(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: brand } = await supabase
    .from("brands")
    .select("slug")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("brands").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateBrandData(brand?.slug)
  return { success: true }
}
