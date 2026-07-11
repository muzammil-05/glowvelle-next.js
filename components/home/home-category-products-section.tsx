import { Suspense } from "react";

import { HomeCategoryProducts } from "@/components/home/home-category-products";
import { CategorySectionSkeleton } from "@/components/home/category-section-skeleton";
import { getActiveCategories, getFeaturedProducts } from "@/lib/data";

async function HomeCategoryProductsLoader() {
  const [categories, products] = await Promise.all([
    getActiveCategories(),
    getFeaturedProducts(12),
  ]);
  return <HomeCategoryProducts categories={categories} products={products} />;
}

export function HomeCategoryProductsSection() {
  return (
    <Suspense fallback={<CategorySectionSkeleton />}>
      <HomeCategoryProductsLoader />
    </Suspense>
  );
}
