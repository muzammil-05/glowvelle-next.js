import { createStaticClient } from "@/lib/supabase/static";
import type { CategoryRow } from "@/types/database";
import type { Category } from "@/types";

import { handleDbError, safeQuery } from "./errors";
import type { PublicCategory } from "./types";

const FALLBACK_IMAGE = "photo-1779056904689-ff99fd0045a4";

export function normalizeCategoryImage(imageUrl: string | null): string {
  if (!imageUrl) return FALLBACK_IMAGE;

  if (imageUrl.startsWith("http")) {
    const match = imageUrl.match(/photo-[a-zA-Z0-9-]+/);
    if (match) return match[0];
    return imageUrl;
  }

  return imageUrl;
}

export function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    icon: row.icon ?? "✨",
    image: normalizeCategoryImage(row.image_url),
    count: row.product_count,
    description: row.description,
  };
}

/** Public read: active categories ordered by sort_order. */
export async function getActiveCategories(): Promise<PublicCategory[]> {
  return safeQuery("getActiveCategories", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("status", "active")
      .order("sort_order", { ascending: true });

    if (handleDbError("getActiveCategories", error)) return [];
    if (!data?.length) return [];

    return (data as CategoryRow[]).map(mapCategoryRow);
  }, []);
}

/** Public read: single active category by slug. */
export async function getCategoryBySlug(
  slug: string
): Promise<PublicCategory | null> {
  return safeQuery("getCategoryBySlug", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("status", "active")
      .eq("slug", slug.toLowerCase())
      .maybeSingle();

    if (handleDbError("getCategoryBySlug", error)) return null;
    if (!data) return null;

    return mapCategoryRow(data as CategoryRow);
  }, null);
}
