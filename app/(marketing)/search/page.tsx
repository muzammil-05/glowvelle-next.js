import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchPageContent } from "@/components/search/search-page-content";
import { getActiveCategories, searchProducts } from "@/lib/data";
import { mapToPopularCategories } from "@/lib/shop/categories";
import { createPageMetadata } from "@/lib/seo";

// Search is user-driven — always render dynamically with fresh results.
export const dynamic = "force-dynamic";

export const metadata: Metadata = createPageMetadata({
  title: "Search",
  description:
    "Search 50,000+ luxury beauty products. Compare prices across Amazon, Walmart, eBay, and official brand stores.",
  path: "/search",
});

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q ?? "";
  const [categories, searchResult] = await Promise.all([
    getActiveCategories(),
    query.trim()
      ? searchProducts(query.trim())
      : Promise.resolve({ products: [], total: 0 }),
  ]);
  const popularCategories = mapToPopularCategories(categories);

  return (
    <Suspense fallback={null}>
      <SearchPageContent
        initialQuery={query}
        popularCategories={popularCategories}
        searchResult={searchResult}
      />
    </Suspense>
  );
}
