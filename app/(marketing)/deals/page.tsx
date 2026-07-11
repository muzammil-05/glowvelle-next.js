import type { Metadata } from "next";

import { DealsPageContent } from "@/components/deals/deals-page-content";
import { buildDealsFromProducts } from "@/lib/deals/utils";
import { getProductsForDeals } from "@/lib/data";
import {
  FEATURED_DEAL_LABELS,
  FLASH_DEAL_LABELS,
  FLASH_TIME_LEFT_VARIANTS,
  LIMITED_TIME_ENDS_IN,
} from "@/lib/mock/deals";
import { createPageMetadata } from "@/lib/seo";
import type { Product } from "@/types";

// ISR: deal prices derived from product catalog, hourly refresh.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Best Beauty Deals",
  description:
    "Hand-curated price drops updated daily. Save big on luxury skincare, makeup, haircare and more without compromise.",
  path: "/deals",
});

export default async function DealsPage() {
  const dealProducts = await getProductsForDeals();

  const featuredDeals = buildDealsFromProducts(
    dealProducts.slice(0, 3),
    FEATURED_DEAL_LABELS
  );
  const flashDeals = dealProducts.slice(0, 3).map((product, index) => ({
    ...buildDealsFromProducts([product], [FLASH_DEAL_LABELS[index] ?? "Flash Deal"])[0],
    timeLeft: FLASH_TIME_LEFT_VARIANTS[index] ?? [2, 47, 33],
  }));
  const limitedTimeDeals = buildDealsFromProducts(
    dealProducts.slice(3, 6).length
      ? dealProducts.slice(3, 6)
      : dealProducts.slice(0, 3),
    FLASH_DEAL_LABELS
  );
  const allDealProducts: Product[] = dealProducts;
  const priceComparisonProducts = dealProducts.slice(0, 3);

  return (
    <DealsPageContent
      featuredDeals={featuredDeals}
      flashDeals={flashDeals}
      limitedTimeDeals={limitedTimeDeals}
      allDealProducts={allDealProducts}
      priceComparisonProducts={priceComparisonProducts}
      limitedTimeEndsIn={LIMITED_TIME_ENDS_IN}
      flashDealsActiveCount={flashDeals.length}
    />
  );
}
