"use client";

import dynamic from "next/dynamic";

import type { Deal } from "@/types";
import type { FlashDeal } from "@/lib/mock/deals";

const FlashDeals = dynamic(
  () => import("@/components/deals/flash-deals").then((mod) => mod.FlashDeals),
  { ssr: false, loading: () => null }
);

const LimitedTimeOffers = dynamic(
  () =>
    import("@/components/deals/limited-time-offers").then(
      (mod) => mod.LimitedTimeOffers
    ),
  { ssr: false, loading: () => null }
);

type DealsCountdownSectionsProps = {
  flashDeals: FlashDeal[];
  limitedTimeDeals: Deal[];
  limitedTimeEndsIn: readonly [string, string, string];
  flashDealsActiveCount: number;
};

export function DealsCountdownSections({
  flashDeals,
  limitedTimeDeals,
  limitedTimeEndsIn,
  flashDealsActiveCount,
}: DealsCountdownSectionsProps) {
  return (
    <>
      <FlashDeals deals={flashDeals} activeCount={flashDealsActiveCount} />
      <LimitedTimeOffers
        deals={limitedTimeDeals}
        limitedTimeEndsIn={limitedTimeEndsIn}
      />
    </>
  );
}
