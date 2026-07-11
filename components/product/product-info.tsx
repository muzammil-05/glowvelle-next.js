import Link from "next/link";
import { Award, Check, Shield, TrendingUp, Zap } from "lucide-react";

import { ProductWishlistButton } from "@/components/product/product-wishlist-button";
import { Stars } from "@/components/marketing/stars";
import { getLowestInStockPrice } from "@/lib/products/utils";
import type { Product } from "@/types";

type ProductInfoProps = {
  product: Product;
};

export function ProductInfo({ product }: ProductInfoProps) {
  const lowestPrice = getLowestInStockPrice(product);
  const inStockCount = product.prices.filter((price) => price.inStock).length;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Link
          href={`/shop/${product.category.toLowerCase()}`}
          className="mb-2 block font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase hover:underline focus-visible:outline-none"
        >
          {product.brand}
        </Link>
        <h1 className="mb-3 font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[40px] dark:text-white">
          {product.name}
        </h1>
        <div className="mb-4 flex items-center gap-3">
          <Stars rating={product.rating} size={14} />
          <span className="font-sans text-[13px] font-semibold text-[#2F2F2F] dark:text-white">
            {product.rating}
          </span>
          <span className="font-sans text-[13px] text-[#9B8B97]">
            ({product.reviews.toLocaleString()} reviews)
          </span>
        </div>
        <p className="font-sans text-[14px] leading-relaxed text-[#9B8B97] dark:text-white/60">
          {product.description}
        </p>
      </div>

      <div className="rounded-2xl border border-[#FFD6E8] bg-[#FFEAF4] p-5 dark:border-[#3A2530] dark:bg-[#2A1520]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 font-sans text-[11px] text-[#9B8B97]">
              Best price across {inStockCount} retailers
            </div>
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-[#FF5FA2] sm:text-[36px]">
                ${lowestPrice?.toFixed(2)}
              </span>
              <span className="font-sans text-[14px] text-[#9B8B97] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="rounded-xl bg-[#FF5FA2] px-3 py-1.5 font-sans text-[11px] font-bold text-white">
              Save ${product.savings.toFixed(2)}
            </div>
            <div className="mt-1 font-sans text-[10px] text-[#9B8B97]">vs official price</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {product.benefits.slice(0, 3).map((benefit) => (
          <div key={benefit} className="flex items-center gap-2.5">
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FFEAF4]">
              <Check size={11} className="text-[#FF5FA2]" aria-hidden />
            </div>
            <span className="font-sans text-[13px] text-[#2F2F2F] dark:text-white">
              {benefit}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href="#compare-prices"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#FF5FA2] py-4 font-sans text-[14px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
        >
          <Zap size={15} aria-hidden />
          Compare All Prices
        </a>
        <ProductWishlistButton />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          { icon: Shield, label: "Verified Links" },
          { icon: TrendingUp, label: "Live Prices" },
          { icon: Award, label: "Trusted Brands" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-xl border border-[#FFD6E8] bg-[#FFF9FC] p-3 dark:border-[#3A2530] dark:bg-[#1A0D13]"
          >
            <Icon size={14} className="text-[#FF5FA2]" aria-hidden />
            <span className="font-sans text-[11px] text-[#9B8B97]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
