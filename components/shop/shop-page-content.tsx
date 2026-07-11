"use client";

import { Suspense } from "react";

import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { Container } from "@/components/layout/container";
import { ShopCatalogSection } from "@/components/shop/shop-catalog-section";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import {
  useShopCatalog,
  type ShopCatalogData,
} from "@/components/shop/use-shop-catalog";
import type { Category } from "@/types";

type ShopPageContentProps = {
  categories: Category[];
  brands: string[];
  catalogData: ShopCatalogData;
};

function ShopPageInner({
  categories,
  brands,
  catalogData,
}: ShopPageContentProps) {
  const catalog = useShopCatalog({ catalogData, brands });

  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <div className="border-b border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#200F18]">
        <Container className="py-8 sm:py-10">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Shop" }]}
          />
          <h1 className="mt-4 mb-3 font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl lg:text-[56px] dark:text-white">
            Shop{" "}
            <span className="text-[#FF5FA2] italic">Beauty Products</span>
          </h1>
          <p className="mb-6 max-w-2xl font-sans text-[15px] leading-relaxed text-[#9B8B97]">
            Compare prices across Amazon, Walmart, eBay, and official brand
            stores — curated luxury beauty, all in one place.
          </p>
          <ShopToolbar
            searchQuery={catalog.searchQuery}
            sortBy={catalog.sortBy}
            resultCount={catalog.total}
            onSearchChange={catalog.handleSearchChange}
            onSortChange={catalog.handleSortChange}
            showResultsBar={false}
          />
        </Container>
      </div>

      <ShopCatalogSection catalog={catalog} categories={categories} />
    </div>
  );
}

export function ShopPageContent(props: ShopPageContentProps) {
  return (
    <Suspense fallback={null}>
      <ShopPageInner {...props} />
    </Suspense>
  );
}
