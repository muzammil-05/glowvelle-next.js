import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";

import { ProductsEmptyState } from "@/components/shared/products-empty-state";
import { getLowestInStockPrice } from "@/lib/products/utils";
import type { Product } from "@/types";

type DealsPriceComparisonProps = {
  products: Product[];
};

export function DealsPriceComparison({ products }: DealsPriceComparisonProps) {
  if (products.length === 0) {
    return (
      <section aria-labelledby="price-comparison-heading" className="mt-16">
        <ProductsEmptyState
          variant="inline"
          title="Price comparisons coming soon"
          description="Once products are seeded, you'll see side-by-side retailer pricing here."
          actionHref="/shop"
          actionLabel="Browse Products"
        />
      </section>
    );
  }

  return (
    <section aria-labelledby="price-comparison-heading" className="mt-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="mb-2 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            Compare &amp; Save
          </p>
          <h2
            id="price-comparison-heading"
            className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[36px] dark:text-white"
          >
            Side-by-Side{" "}
            <span className="text-[#FF5FA2] italic">Price Comparison</span>
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all hover:gap-2.5 sm:flex focus-visible:outline-none"
        >
          View All <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="space-y-6">
        {products.map((product) => {
          const lowestPrice = getLowestInStockPrice(product) ?? product.bestPrice;

          return (
            <div key={product.id}>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-sans text-[10px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
                    {product.brand}
                  </div>
                  <h3 className="font-sans text-[15px] font-semibold text-[#2F2F2F] dark:text-white">
                    {product.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-sans text-[10px] text-[#9B8B97]">Best Price</div>
                    <div className="font-display text-[22px] font-bold text-[#FF5FA2]">
                      ${lowestPrice.toFixed(2)}
                    </div>
                  </div>
                  {product.savings > 0 && (
                    <div className="rounded-xl bg-[#D8B36A] px-3 py-1.5 font-sans text-[11px] font-bold text-white">
                      Save ${product.savings.toFixed(2)}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {product.prices
                  .filter((price) => price.price >= 0)
                  .map((price) => (
                  <div
                    key={`${product.id}-${price.store}`}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3.5 ${
                      price.price === lowestPrice && price.inStock
                        ? "border-[#FF5FA2] bg-[#FFEAF4] dark:bg-[#3A2530]"
                        : "border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#2A1520]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: price.color }}
                        aria-hidden
                      />
                      <span className="font-sans text-[12px] font-semibold text-[#2F2F2F] dark:text-white">
                        {price.store}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-[16px] font-bold text-[#2F2F2F] dark:text-white">
                        ${price.price.toFixed(2)}
                      </div>
                      {!price.inStock && (
                        <div className="font-sans text-[10px] text-[#9B8B97]">Out of stock</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href={`/products/${product.slug}`}
                className="mt-4 inline-flex items-center gap-1.5 font-sans text-[12px] font-semibold text-[#FF5FA2] hover:underline focus-visible:outline-none"
              >
                <Tag size={11} aria-hidden />
                View full price comparison
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
