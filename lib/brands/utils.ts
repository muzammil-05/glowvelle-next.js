import type { BrandData } from "@/types";

export const FEATURED_BRAND_SLUGS = [
  "charlotte-tilbury",
  "fenty-beauty",
  "la-mer",
] as const;

export const ALPHABET_FILTER_LETTERS = [
  "All",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
] as const;

export type AlphabetFilterLetter = (typeof ALPHABET_FILTER_LETTERS)[number];

export function getBrandSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

export function getBrandHref(brand: Pick<BrandData, "name" | "slug">): string {
  return `/brands/${brand.slug ?? getBrandSlug(brand.name)}`;
}

export function getFeaturedBrandsFromList(
  brands: BrandData[],
  limit = 3
): BrandData[] {
  const featuredSlugs = new Set<string>(FEATURED_BRAND_SLUGS);
  const featured = brands.filter((brand) => featuredSlugs.has(brand.slug));

  if (featured.length > 0) {
    return FEATURED_BRAND_SLUGS.map((slug) =>
      featured.find((brand) => brand.slug === slug)
    )
      .filter((brand): brand is BrandData => brand !== undefined)
      .slice(0, limit);
  }

  return brands.slice(0, limit);
}

export function filterBrands(
  brands: BrandData[],
  query: string,
  activeLetter: AlphabetFilterLetter
): BrandData[] {
  const normalizedQuery = query.trim().toLowerCase();

  return brands.filter((brand) => {
    if (
      normalizedQuery &&
      !brand.name.toLowerCase().includes(normalizedQuery)
    ) {
      return false;
    }

    if (
      activeLetter !== "All" &&
      !brand.name.toUpperCase().startsWith(activeLetter)
    ) {
      return false;
    }

    return true;
  });
}

export function getBrandPageStats(brandCount: number) {
  return [
    { value: `${brandCount > 0 ? brandCount : 0}+`, label: "Premium Brands" },
    { value: "4", label: "Retailers" },
    { value: "50K+", label: "Products" },
  ] as const;
}

export function getBrandWebsiteUrl(website: string): string {
  return website.startsWith("http") ? website : `https://${website}`;
}
