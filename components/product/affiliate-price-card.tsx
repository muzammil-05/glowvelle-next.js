import { ExternalLink } from "lucide-react";

import { AffiliateBuyButton } from "@/components/product/affiliate-buy-button";
import { resolveBuyUrl } from "@/lib/data/affiliates";
import type { StorePrice } from "@/types";

const STORE_INFO: Record<string, { label: string; bg: string }> = {
  Amazon: { label: "amazon.com", bg: "#FF9900" },
  Walmart: { label: "walmart.com", bg: "#0071CE" },
  eBay: { label: "ebay.com", bg: "#E53238" },
  "Official Store": { label: "Official Brand", bg: "#2F2F2F" },
};

type AffiliatePriceCardProps = {
  price: StorePrice;
  isLowest: boolean;
  productId?: string;
  productVariantId?: string | null;
};

export function AffiliatePriceCard({
  price,
  isLowest,
  productId,
  productVariantId,
}: AffiliatePriceCardProps) {
  const info = STORE_INFO[price.store] ?? {
    label: price.store,
    bg: "#9B8B97",
  };
  const buyUrl = resolveBuyUrl(price.affiliateUrl, price.websiteUrl);
  const canTrack = Boolean(productId && price.storeId);

  return (
    <div
      className={`relative flex flex-col gap-4 rounded-2xl border p-4 transition-all duration-300 sm:p-5 ${
        isLowest
          ? "border-[#FF5FA2] bg-gradient-to-br from-[#FFEAF4] to-white shadow-lg shadow-[#FF5FA2]/10 dark:from-[#FF5FA2]/10 dark:to-[#2A1520]"
          : "border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#2A1520]"
      }`}
    >
      {isLowest && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF5FA2] px-3 py-1 font-sans text-[10px] font-bold whitespace-nowrap text-white">
          BEST PRICE
        </div>
      )}

      <div className="flex items-center gap-2.5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-sans text-[14px] font-bold text-white"
          style={{ backgroundColor: price.color || info.bg }}
        >
          {price.store[0]}
        </div>
        <div>
          <div className="font-sans text-[13px] font-bold text-[#2F2F2F] dark:text-white">
            {price.store}
          </div>
          <div className="font-sans text-[10px] text-[#9B8B97]">{info.label}</div>
        </div>
        {price.prime && (
          <div className="ml-auto rounded bg-[#FF9900]/15 px-2 py-1 font-sans text-[9px] font-bold text-[#FF9900]">
            PRIME
          </div>
        )}
      </div>

      <div>
        <div className="font-display text-2xl leading-none font-bold text-[#2F2F2F] sm:text-[32px] dark:text-white">
          ${price.price.toFixed(2)}
        </div>
        {price.originalPrice && (
          <div className="mt-1 flex items-center gap-2">
            <span className="font-sans text-[12px] text-[#9B8B97] line-through">
              ${price.originalPrice.toFixed(2)}
            </span>
            <span className="font-sans text-[11px] font-semibold text-[#FF5FA2]">
              Save ${(price.originalPrice - price.price).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <div>
        {price.inStock ? (
          <>
            <div className="mb-3 flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-green-400" aria-hidden />
              <span className="font-sans text-[11px] font-medium text-green-600 dark:text-green-400">
                In Stock
              </span>
            </div>
            {canTrack ? (
              <AffiliateBuyButton
                productId={productId!}
                storeId={price.storeId!}
                affiliateLinkId={price.affiliateLinkId}
                productVariantId={productVariantId}
                buyUrl={buyUrl}
                storeName={price.store}
                price={price.price}
                isLowest={isLowest}
              />
            ) : (
              <a
                href={buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buy on ${price.store} for $${price.price.toFixed(2)} (opens in new tab)`}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-sans text-[13px] font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
                style={{
                  backgroundColor: isLowest ? "#FF5FA2" : "transparent",
                  color: isLowest ? "#ffffff" : "#FF5FA2",
                  border: isLowest ? "none" : "1.5px solid #FFD6E8",
                }}
              >
                <ExternalLink size={13} aria-hidden />
                Shop on {price.store}
              </a>
            )}
          </>
        ) : (
          <>
            <div className="mb-3 flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-gray-300" aria-hidden />
              <span className="font-sans text-[11px] text-[#9B8B97]">Out of Stock</span>
            </div>
            <button
              type="button"
              disabled
              className="w-full rounded-xl border border-[#FFD6E8] py-3 font-sans text-[13px] text-[#9B8B97] opacity-50 dark:border-[#3A2530]"
            >
              Unavailable
            </button>
          </>
        )}
      </div>
    </div>
  );
}
