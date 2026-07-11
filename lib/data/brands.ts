import { FEATURED_BRAND_SLUGS } from "@/lib/brands/utils";
import { createStaticClient } from "@/lib/supabase/static";
import type { BrandRow } from "@/types/database";
import type { BrandData } from "@/types";

import { handleDbError, safeQuery } from "./errors";
import type { PublicBrand } from "./types";

const FALLBACK_IMAGE = "photo-1631730486572-226d1f595b68";

export function normalizeBrandImage(imageUrl: string | null): string {
  if (!imageUrl) return FALLBACK_IMAGE;

  if (imageUrl.startsWith("http")) {
    const match = imageUrl.match(/photo-[a-zA-Z0-9-]+/);
    if (match) return match[0];
    return imageUrl;
  }

  return imageUrl;
}

export function mapBrandRow(row: BrandRow): BrandData {
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    founded: row.founded ?? "",
    country: row.country ?? "",
    image: normalizeBrandImage(row.image_url),
    website: row.website ?? "",
    instagramFollowers: row.instagram_followers ?? "",
    productCount: 0,
  };
}

/** Public read: all active brands ordered by name. */
export async function getActiveBrands(): Promise<PublicBrand[]> {
  return safeQuery("getActiveBrands", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("status", "active")
      .order("name", { ascending: true });

    if (handleDbError("getActiveBrands", error)) return [];
    if (!data?.length) return [];

    return (data as BrandRow[]).map(mapBrandRow);
  }, []);
}

/** Public read: single active brand by slug. */
export async function getBrandBySlug(slug: string): Promise<PublicBrand | null> {
  return safeQuery("getBrandBySlug", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("status", "active")
      .eq("slug", slug.toLowerCase())
      .maybeSingle();

    if (handleDbError("getBrandBySlug", error)) return null;
    if (!data) return null;

    return mapBrandRow(data as BrandRow);
  }, null);
}

/** Public read: curated featured brands with fallback to top active brands. */
export async function getFeaturedBrands(limit = 3): Promise<PublicBrand[]> {
  return safeQuery("getFeaturedBrands", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .eq("status", "active")
      .in("slug", [...FEATURED_BRAND_SLUGS]);

    if (handleDbError("getFeaturedBrands", error)) {
      const brands = await getActiveBrands();
      return brands.slice(0, limit);
    }

    if (data?.length) {
      const mapped = (data as BrandRow[]).map(mapBrandRow);
      const ordered = FEATURED_BRAND_SLUGS.map((featuredSlug) =>
        mapped.find((brand) => brand.slug === featuredSlug)
      ).filter((brand): brand is BrandData => brand !== undefined);

      if (ordered.length > 0) {
        return ordered.slice(0, limit);
      }
    }

    const brands = await getActiveBrands();
    return brands.slice(0, limit);
  }, []);
}

/** Public read: brands excluding the current slug. */
export async function getRelatedBrands(
  currentSlug: string,
  limit = 3
): Promise<PublicBrand[]> {
  const brands = await getActiveBrands();
  return brands.filter((brand) => brand.slug !== currentSlug).slice(0, limit);
}

/** SSG helper: slugs for active brands. */
export async function getBrandStaticParams(): Promise<{ slug: string }[]> {
  return safeQuery("getBrandStaticParams", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("brands")
      .select("slug")
      .eq("status", "active");

    if (handleDbError("getBrandStaticParams", error)) return [];
    if (!data?.length) return [];

    return data.map((row) => ({ slug: row.slug }));
  }, []);
}
