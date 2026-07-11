"use client";

import { useState } from "react";

import { CategorySection } from "@/components/home/category-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import type { Category, Product } from "@/types";

type HomeCategoryProductsProps = {
  categories: Category[];
  products: Product[];
};

export function HomeCategoryProducts({
  categories,
  products,
}: HomeCategoryProductsProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <>
      <CategorySection
        categories={categories}
        active={activeCategory}
        onActiveChange={setActiveCategory}
      />
      <FeaturedProducts activeCategory={activeCategory} products={products} />
    </>
  );
}
