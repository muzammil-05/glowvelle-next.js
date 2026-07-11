"use client";

import { Suspense } from "react";

import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { Container } from "@/components/layout/container";
import { ShopCatalogSection } from "@/components/shop/shop-catalog-section";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import {
  useShopCatalog,
  type ShopCatalogData,
} from "@/components/shop/use-shop-catalog";
import { getCategoryDescription } from "@/lib/shop/categories";
import type { Category } from "@/types";

type CategoryPageContentProps = {
  category: Category;
  categories: Category[];
  brands: string[];
  catalogData: ShopCatalogData;
};

function CategoryPageInner({
  category,
  categories,
  brands,
  catalogData,
}: CategoryPageContentProps) {
  const catalog = useShopCatalog({
    initialCategory: category.name,
    catalogData,
    brands,
  });

  const description = getCategoryDescription(category);

  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <PageHero
        imageId={category.image}
        eyebrow="Shop by Category"
        title={`${category.icon} ${category.name}`}
        subtitle={description}
        height="h-96"
      />

      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Shop", href: "/shop" },
            { label: category.name },
          ]}
        />
        <p className="mt-6 max-w-3xl font-sans text-[15px] leading-relaxed text-[#9B8B97]">
          {description}
        </p>
        <div className="mt-6">
          <ShopToolbar
            searchQuery={catalog.searchQuery}
            sortBy={catalog.sortBy}
            resultCount={catalog.total}
            onSearchChange={catalog.handleSearchChange}
            onSortChange={catalog.handleSortChange}
            showResultsBar={false}
          />
        </div>
      </Container>

      <ShopCatalogSection
        catalog={catalog}
        categories={categories}
        resultLabel={`products in ${category.name}`}
      />
    </div>
  );
}

export function CategoryPageContent(props: CategoryPageContentProps) {
  return (
    <Suspense fallback={null}>
      <CategoryPageInner {...props} />
    </Suspense>
  );
}
