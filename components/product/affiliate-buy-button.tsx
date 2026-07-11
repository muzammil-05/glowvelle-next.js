"use client";

import { ExternalLink } from "lucide-react";

import { trackAffiliateClick } from "@/lib/actions/track-affiliate-click";

type AffiliateBuyButtonProps = {
  productId: string;
  storeId: string;
  affiliateLinkId?: string | null;
  productVariantId?: string | null;
  buyUrl: string;
  storeName: string;
  price: number;
  isLowest: boolean;
};

export function AffiliateBuyButton({
  productId,
  storeId,
  affiliateLinkId,
  productVariantId,
  buyUrl,
  storeName,
  price,
  isLowest,
}: AffiliateBuyButtonProps) {
  async function handleClick() {
    let redirectUrl = buyUrl;

    try {
      const result = await trackAffiliateClick({
        productId,
        storeId,
        affiliateLinkId,
        productVariantId,
        redirectUrl: buyUrl,
      });
      redirectUrl = result.redirectUrl;
    } catch {
      // Tracking failed — still redirect.
    }

    window.open(redirectUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Buy on ${storeName} for $${price.toFixed(2)} (opens in new tab)`}
      className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-sans text-[13px] font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
      style={{
        backgroundColor: isLowest ? "#FF5FA2" : "transparent",
        color: isLowest ? "#ffffff" : "#FF5FA2",
        border: isLowest ? "none" : "1.5px solid #FFD6E8",
      }}
    >
      <ExternalLink size={13} aria-hidden />
      Shop on {storeName}
    </button>
  );
}
