import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/marketing/product-card";
import type { BrandData, Product } from "@/types";

type BrandFeaturedProductsProps = {
  brand: BrandData;
  products: Product[];
};

export function BrandFeaturedProducts({
  brand,
  products,
}: BrandFeaturedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="brand-featured-products-heading"
      className="border-t border-[#FFD6E8] pt-14 pb-16 dark:border-[#3A2530]"
    >
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            Compare &amp; Save
          </p>
          <h2
            id="brand-featured-products-heading"
            className="font-display text-[42px] leading-tight font-bold text-[#2F2F2F] dark:text-white"
          >
            Featured{" "}
            <span className="text-[#FF5FA2] italic">{brand.name}</span> Products
          </h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all hover:gap-2.5 focus-visible:outline-none"
        >
          View All <ChevronRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
