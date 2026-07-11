import { Suspense } from "react";

import { LatestDealsSection } from "@/components/home/latest-deals";
import { buildDealsFromProducts } from "@/lib/deals/utils";
import { getProductsForDeals } from "@/lib/data";

const FLASH_DEAL_LABELS = [
  "Flash Deal",
  "Hot Deal",
  "Weekend Special",
] as const;

const LIMITED_TIME_ENDS_IN = ["02", "47", "33"] as const;

async function LatestDealsLoader() {
  const dealProducts = await getProductsForDeals();
  const deals = buildDealsFromProducts(
    dealProducts.slice(0, 3),
    FLASH_DEAL_LABELS
  );

  return (
    <LatestDealsSection
      deals={deals}
      limitedTimeEndsIn={LIMITED_TIME_ENDS_IN}
    />
  );
}

export function LatestDealsSectionWrapper() {
  return (
    <Suspense fallback={null}>
      <LatestDealsLoader />
    </Suspense>
  );
}
