import { createStaticClient } from "@/lib/supabase/static"

import { handleDbError, safeQuery } from "./errors"

export type AdminDashboardStats = {
  publishedProducts: number
  activeBrands: number
  activeCategories: number
  publishedBlogPosts: number
  newsletterSubscribers: number | null
  source: "live" | "placeholder"
}

const PLACEHOLDER_STATS: AdminDashboardStats = {
  publishedProducts: 128,
  activeBrands: 24,
  activeCategories: 8,
  publishedBlogPosts: 12,
  newsletterSubscribers: 340,
  source: "placeholder",
}

async function countTable(
  context: string,
  table: string,
  filters?: { column: string; value: string }[]
): Promise<number | null> {
  const supabase = createStaticClient()
  let query = supabase.from(table).select("*", { count: "exact", head: true })

  for (const filter of filters ?? []) {
    query = query.eq(filter.column, filter.value)
  }

  const { count, error } = await query

  if (handleDbError(context, error)) return null
  return count ?? 0
}

/** Read-only dashboard counts for admin overview cards. */
export async function getAdminDashboardStats(): Promise<AdminDashboardStats> {
  return safeQuery(
    "getAdminDashboardStats",
    async () => {
      const [
        publishedProducts,
        activeBrands,
        activeCategories,
        publishedBlogPosts,
        newsletterSubscribers,
      ] = await Promise.all([
        countTable("getAdminDashboardStats.products", "products", [
          { column: "status", value: "published" },
        ]),
        countTable("getAdminDashboardStats.brands", "brands", [
          { column: "status", value: "active" },
        ]),
        countTable("getAdminDashboardStats.categories", "categories", [
          { column: "status", value: "active" },
        ]),
        countTable("getAdminDashboardStats.blog", "blog_posts", [
          { column: "status", value: "published" },
        ]),
        countTable("getAdminDashboardStats.newsletter", "newsletter_subscribers"),
      ])

      if (
        publishedProducts === null ||
        activeBrands === null ||
        activeCategories === null ||
        publishedBlogPosts === null
      ) {
        return PLACEHOLDER_STATS
      }

      return {
        publishedProducts,
        activeBrands,
        activeCategories,
        publishedBlogPosts,
        newsletterSubscribers,
        source: "live",
      }
    },
    PLACEHOLDER_STATS
  )
}
