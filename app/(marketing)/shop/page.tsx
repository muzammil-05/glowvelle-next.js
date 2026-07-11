import type { Metadata } from "next";

import { ShopPageContent } from "@/components/shop/shop-page-content";
import {
  getActiveCategories,
  getProductBrands,
  getProducts,
} from "@/lib/data";
import { SHOP_ITEMS_PER_PAGE } from "@/lib/shop/constants";
import { parseShopParams, type ShopUrlParams } from "@/lib/shop/search-params";
import { createPageMetadata } from "@/lib/seo";

// ISR: catalog listing; filter params still render dynamically per request.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Shop Beauty Products",
  description:
    "Browse and compare luxury beauty products across top retailers. Filter by category, brand, price, and rating to find your perfect match.",
  path: "/shop",
});

type ShopPageProps = {
  searchParams: Promise<ShopUrlParams>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const urlParams = await searchParams;
  const parsed = parseShopParams(urlParams);
  const [categories, brands, catalogData] = await Promise.all([
    getActiveCategories(),
    getProductBrands(),
    getProducts({
      page: parsed.page,
      pageSize: SHOP_ITEMS_PER_PAGE,
      categoryNames: parsed.selectedCategories,
      brandNames: parsed.selectedBrands,
      searchQuery: parsed.searchQuery,
      maxPrice: parsed.maxPrice,
      minRating: parsed.minRating,
      sort: parsed.sortBy,
    }),
  ]);

  return (
    <ShopPageContent
      categories={categories}
      brands={brands}
      catalogData={catalogData}
    />
  );
}
