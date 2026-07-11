import { createStaticClient } from "@/lib/supabase/static";
import type { BlogCategoryRow } from "@/types/database";
import type { BlogCategory } from "@/types";

import { handleDbError, safeQuery } from "./errors";
import type { PublicBlogCategory } from "./types";

export function mapBlogCategoryRow(row: BlogCategoryRow): BlogCategory {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
  };
}

/** Public read: all blog categories ordered by sort_order. */
export async function getBlogCategories(): Promise<PublicBlogCategory[]> {
  return safeQuery("getBlogCategories", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (handleDbError("getBlogCategories", error)) return [];

    if (!data?.length) return [];

    return (data as BlogCategoryRow[]).map(mapBlogCategoryRow);
  }, []);
}
