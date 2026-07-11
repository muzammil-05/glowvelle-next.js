import Link from "next/link";

import { AffiliatePriceCard } from "@/components/product/affiliate-price-card";
import { ProductsEmptyState } from "@/components/shared/products-empty-state";
import type { StorePrice } from "@/types";

type ComparePricesSectionProps = {
  prices: StorePrice[];
  lowestPrice: number | null;
  productId: string;
  productVariantId?: string | null;
};

export function ComparePricesSection({
  prices,
  lowestPrice,
  productId,
  productVariantId,
}: ComparePricesSectionProps) {
  const offers = prices.filter((price) => price.price >= 0);

  return (
    <section id="compare-prices" aria-labelledby="compare-prices-heading">
      <div className="mb-10 text-center">
        <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
          Live Price Comparison
        </p>
        <h2
          id="compare-prices-heading"
          className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[42px] dark:text-white"
        >
          Compare Prices Across{" "}
          <span className="text-[#FF5FA2] italic">4 Retailers</span>
        </h2>
        <p className="mt-3 font-sans text-[14px] text-[#9B8B97]">
          Prices updated daily. Click to purchase directly from the retailer.
        </p>
      </div>

      {offers.length === 0 ? (
        <ProductsEmptyState
          variant="inline"
          title="Retailer pricing coming soon"
          description="We're syncing live prices from Amazon, Walmart, eBay, and official brand stores. Check back shortly for side-by-side comparisons."
          actionHref="/shop"
          actionLabel="Browse Products"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {offers.map((price) => {
            const isLowest =
              lowestPrice !== null && price.price === lowestPrice && price.inStock;
            return (
              <AffiliatePriceCard
                key={price.store}
                price={price}
                isLowest={isLowest}
                productId={productId}
                productVariantId={productVariantId}
              />
            );
          })}
        </div>
      )}

      <p className="mt-5 text-center font-sans text-[11px] text-[#9B8B97]">
        Glowvelle earns an affiliate commission at no extra cost to you.{" "}
        <Link href="/affiliate" className="text-[#FF5FA2] hover:underline">
          Learn more
        </Link>
      </p>
    </section>
  );
}
