"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { ProductCard } from "@/components/marketing/product-card";
import { ProductsEmptyState } from "@/components/shared/products-empty-state";
import type { Product } from "@/types";

type FeaturedProductsProps = {
  activeCategory: string;
  products: Product[];
};

export function FeaturedProducts({
  activeCategory,
  products,
}: FeaturedProductsProps) {
  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <section
      aria-labelledby="featured-products-heading"
      className="bg-[#FFF9FC] py-16 sm:py-20 lg:py-24 dark:bg-[#1A0D13]"
    >
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
              Hand-Picked for You
            </p>
            <h2
              id="featured-products-heading"
              className="font-display text-3xl leading-[1.1] font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
            >
              Featured <span className="text-[#FF5FA2] italic">Products</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="group flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all duration-200 hover:gap-2.5 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
          >
            View All Products
            <ChevronRight
              size={15}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
        {filtered.length === 0 ? (
          <ProductsEmptyState
            title="Featured products coming soon"
            description="We're hand-picking the best beauty products for you. Check back shortly or browse the full shop."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
