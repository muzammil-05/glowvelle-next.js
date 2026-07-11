"use server"

import { revalidatePath, revalidateTag } from "next/cache"

import { requireAdmin } from "@/lib/auth/admin"
import { createAdminClient } from "@/lib/supabase/admin"
import { generateUniqueSlug, slugify } from "@/lib/utils/slugify"
import type { ProductStatus } from "@/types/database"

export type ActionResult<T = void> = {
  success: boolean
  error?: string
  data?: T
}

export type ProductInput = {
  name: string
  slug?: string
  brandId: string
  categoryId: string
  description?: string | null
  ingredients?: string | null
  rating?: number | null
  reviewCount?: number
  badge?: string | null
  badgeColor?: string | null
  status: ProductStatus
}

export type VariantInput = {
  name: string
  sku?: string | null
  isDefault?: boolean
  sortOrder?: number
}

const PRODUCT_IMAGES_BUCKET = "product-images"

function revalidateProductData(slug?: string) {
  revalidatePath("/admin/products")
  revalidateTag("products", "max")
  revalidateTag("categories", "max")
  revalidateTag("brands", "max")

  if (slug) {
    revalidateTag(`product:${slug}`, "max")
    revalidatePath(`/products/${slug}`)
  }
}

async function slugIsAvailable(
  slug: string,
  excludeId?: string,
): Promise<boolean> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from("products")
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
  return generateUniqueSlug(base || "product", (s) => slugIsAvailable(s, excludeId))
}

export async function createProduct(
  data: ProductInput,
): Promise<ActionResult<{ id: string; slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Product name is required." }
  }
  if (!data.brandId || !data.categoryId) {
    return { success: false, error: "Brand and category are required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveSlug(data.name, data.slug)

  const { data: row, error } = await supabase
    .from("products")
    .insert({
      name: data.name.trim(),
      slug,
      brand_id: data.brandId,
      category_id: data.categoryId,
      description: data.description?.trim() || null,
      ingredients: data.ingredients?.trim() || null,
      rating: data.rating ?? null,
      review_count: data.reviewCount ?? 0,
      badge: data.badge?.trim() || null,
      badge_color: data.badgeColor?.trim() || null,
      status: data.status,
    })
    .select("id, slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create product." }
  }

  revalidateProductData(row.slug)
  return { success: true, data: { id: row.id, slug: row.slug } }
}

export async function updateProduct(
  id: string,
  data: ProductInput,
): Promise<ActionResult<{ slug: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Product name is required." }
  }

  const supabase = createAdminClient()
  const slug = await resolveSlug(data.name, data.slug, id)

  const { data: row, error } = await supabase
    .from("products")
    .update({
      name: data.name.trim(),
      slug,
      brand_id: data.brandId,
      category_id: data.categoryId,
      description: data.description?.trim() || null,
      ingredients: data.ingredients?.trim() || null,
      rating: data.rating ?? null,
      review_count: data.reviewCount ?? 0,
      badge: data.badge?.trim() || null,
      badge_color: data.badgeColor?.trim() || null,
      status: data.status,
    })
    .eq("id", id)
    .select("slug")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to update product." }
  }

  revalidateProductData(row.slug)
  return { success: true, data: { slug: row.slug } }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidateProductData(product?.slug)
  return { success: true }
}

export async function uploadProductImage(
  productId: string,
  formData: FormData,
): Promise<ActionResult<{ imageId: string; imageUrl: string }>> {
  await requireAdmin()

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { success: false, error: "No file provided." }
  }

  const supabase = createAdminClient()
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg"
  const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`
  const storagePath = `${productId}/${filename}`

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(storagePath, file, {
      contentType: file.type || undefined,
      upsert: false,
    })

  if (uploadError) {
    return { success: false, error: uploadError.message }
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(storagePath)

  const { count } = await supabase
    .from("product_images")
    .select("id", { count: "exact", head: true })
    .eq("product_id", productId)

  const sortOrder = count ?? 0
  const isPrimary = sortOrder === 0

  const { data: imageRow, error: insertError } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      image_url: publicUrl,
      sort_order: sortOrder,
      is_primary: isPrimary,
    })
    .select("id, image_url")
    .single()

  if (insertError || !imageRow) {
    return {
      success: false,
      error: insertError?.message ?? "Failed to save image record.",
    }
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return {
    success: true,
    data: { imageId: imageRow.id, imageUrl: imageRow.image_url },
  }
}

export async function deleteProductImage(imageId: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: image } = await supabase
    .from("product_images")
    .select("product_id, image_url")
    .eq("id", imageId)
    .maybeSingle()

  if (!image) {
    return { success: false, error: "Image not found." }
  }

  const { error } = await supabase
    .from("product_images")
    .delete()
    .eq("id", imageId)

  if (error) {
    return { success: false, error: error.message }
  }

  const urlPath = image.image_url.split(`${PRODUCT_IMAGES_BUCKET}/`)[1]
  if (urlPath) {
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([urlPath])
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", image.product_id)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true }
}

export async function setPrimaryProductImage(
  imageId: string,
  productId: string,
): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  await supabase
    .from("product_images")
    .update({ is_primary: false })
    .eq("product_id", productId)

  const { error } = await supabase
    .from("product_images")
    .update({ is_primary: true })
    .eq("id", imageId)
    .eq("product_id", productId)

  if (error) {
    return { success: false, error: error.message }
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true }
}

export async function createVariant(
  productId: string,
  data: VariantInput,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin()

  if (!data.name.trim()) {
    return { success: false, error: "Variant name is required." }
  }

  const supabase = createAdminClient()

  if (data.isDefault) {
    await supabase
      .from("product_variants")
      .update({ is_default: false })
      .eq("product_id", productId)
  }

  const { data: row, error } = await supabase
    .from("product_variants")
    .insert({
      product_id: productId,
      name: data.name.trim(),
      sku: data.sku?.trim() || null,
      is_default: data.isDefault ?? false,
      sort_order: data.sortOrder ?? 0,
    })
    .select("id")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to create variant." }
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true, data: { id: row.id } }
}

export async function updateVariant(
  id: string,
  data: VariantInput,
): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: variant } = await supabase
    .from("product_variants")
    .select("product_id")
    .eq("id", id)
    .maybeSingle()

  if (!variant) {
    return { success: false, error: "Variant not found." }
  }

  if (data.isDefault) {
    await supabase
      .from("product_variants")
      .update({ is_default: false })
      .eq("product_id", variant.product_id)
  }

  const { error } = await supabase
    .from("product_variants")
    .update({
      name: data.name.trim(),
      sku: data.sku?.trim() || null,
      is_default: data.isDefault ?? false,
      sort_order: data.sortOrder ?? 0,
    })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", variant.product_id)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true }
}

export async function deleteVariant(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: variant } = await supabase
    .from("product_variants")
    .select("product_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("product_variants").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  if (variant) {
    const { data: product } = await supabase
      .from("products")
      .select("slug")
      .eq("id", variant.product_id)
      .maybeSingle()

    revalidateProductData(product?.slug)
  }

  return { success: true }
}

export async function addProductTag(
  productId: string,
  tag: string,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin()

  const trimmed = tag.trim()
  if (!trimmed) {
    return { success: false, error: "Tag cannot be empty." }
  }

  const supabase = createAdminClient()

  const { data: row, error } = await supabase
    .from("product_tags")
    .insert({ product_id: productId, tag: trimmed })
    .select("id")
    .single()

  if (error || !row) {
    return { success: false, error: error?.message ?? "Failed to add tag." }
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true, data: { id: row.id } }
}

export async function removeProductTag(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: tag } = await supabase
    .from("product_tags")
    .select("product_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("product_tags").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  if (tag) {
    const { data: product } = await supabase
      .from("products")
      .select("slug")
      .eq("id", tag.product_id)
      .maybeSingle()

    revalidateProductData(product?.slug)
  }

  return { success: true }
}

export async function upsertAffiliateLink(
  productId: string,
  storeId: string,
  url: string,
  externalProductId?: string | null,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin()

  const trimmedUrl = url.trim()
  if (!trimmedUrl) {
    return { success: false, error: "Affiliate URL is required." }
  }

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from("affiliate_links")
    .select("id")
    .eq("product_id", productId)
    .eq("store_id", storeId)
    .is("variant_id", null)
    .maybeSingle()

  let linkId: string

  if (existing) {
    const { data: updated, error } = await supabase
      .from("affiliate_links")
      .update({
        affiliate_url: trimmedUrl,
        external_product_id: externalProductId?.trim() || null,
        is_active: true,
      })
      .eq("id", existing.id)
      .select("id")
      .single()

    if (error || !updated) {
      return { success: false, error: error?.message ?? "Failed to update link." }
    }
    linkId = updated.id
  } else {
    const { data: inserted, error } = await supabase
      .from("affiliate_links")
      .insert({
        product_id: productId,
        store_id: storeId,
        affiliate_url: trimmedUrl,
        external_product_id: externalProductId?.trim() || null,
        is_active: true,
      })
      .select("id")
      .single()

    if (error || !inserted) {
      return { success: false, error: error?.message ?? "Failed to create link." }
    }
    linkId = inserted.id
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true, data: { id: linkId } }
}

export async function upsertProductPrice(
  productId: string,
  storeId: string,
  price: number,
  originalPrice: number | null,
  inStock: boolean,
  isPrime: boolean,
): Promise<ActionResult<{ id: string }>> {
  await requireAdmin()

  if (price < 0) {
    return { success: false, error: "Price must be non-negative." }
  }

  const supabase = createAdminClient()

  const { data: existing } = await supabase
    .from("product_prices")
    .select("id")
    .eq("product_id", productId)
    .eq("store_id", storeId)
    .is("variant_id", null)
    .maybeSingle()

  let priceId: string

  if (existing) {
    const { data: updated, error } = await supabase
      .from("product_prices")
      .update({
        price,
        original_price: originalPrice,
        in_stock: inStock,
        is_prime: isPrime,
        last_checked_at: new Date().toISOString(),
      })
      .eq("id", existing.id)
      .select("id")
      .single()

    if (error || !updated) {
      return { success: false, error: error?.message ?? "Failed to update price." }
    }
    priceId = updated.id
  } else {
    const { data: inserted, error } = await supabase
      .from("product_prices")
      .insert({
        product_id: productId,
        store_id: storeId,
        price,
        original_price: originalPrice,
        in_stock: inStock,
        is_prime: isPrime,
        last_checked_at: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (error || !inserted) {
      return { success: false, error: error?.message ?? "Failed to create price." }
    }
    priceId = inserted.id
  }

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", productId)
    .maybeSingle()

  revalidateProductData(product?.slug)
  return { success: true, data: { id: priceId } }
}

export async function deleteAffiliateLink(id: string): Promise<ActionResult> {
  await requireAdmin()

  const supabase = createAdminClient()

  const { data: link } = await supabase
    .from("affiliate_links")
    .select("product_id")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("affiliate_links").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  if (link) {
    const { data: product } = await supabase
      .from("products")
      .select("slug")
      .eq("id", link.product_id)
      .maybeSingle()

    revalidateProductData(product?.slug)
  }

  return { success: true }
}
