import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { ProductCard } from "@/components/marketing/product-card";
import { categoryToSlug } from "@/lib/shop/categories";
import type { Product } from "@/types";

type RelatedProductsProps = {
  products: Product[];
  category: string;
};

export function RelatedProducts({ products, category }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading">
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            You May Also Love
          </p>
          <h2
            id="related-products-heading"
            className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[42px] dark:text-white"
          >
            Related <span className="text-[#FF5FA2] italic">Products</span>
          </h2>
        </div>
        <Link
          href={`/shop/${categoryToSlug(category)}`}
          className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all hover:gap-2.5 focus-visible:outline-none"
        >
          View All <ChevronRight size={15} aria-hidden />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
