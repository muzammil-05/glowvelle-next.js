"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Tag } from "lucide-react";

import { Stars } from "@/components/marketing/stars";
import { unsplashImage } from "@/lib/images";
import { getLowestInStockPrice } from "@/lib/products/utils";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const lowestPrice = getLowestInStockPrice(product) ?? product.bestPrice;

  return (
    <article className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#FFD6E8]/60 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]">
      <div className="relative h-56 overflow-hidden bg-[#FFEAF4]">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={unsplashImage(product.image, 380, 224)}
            alt={product.name}
            width={380}
            height={224}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            quality={80}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute top-3 left-3">
          <span
            className="rounded-full px-2.5 py-1 font-sans text-[10px] font-bold text-white shadow-md"
            style={{ backgroundColor: product.badgeColor }}
          >
            {product.badge}
          </span>
        </div>
        <button
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-all hover:bg-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
        >
          <Heart
            size={13}
            className={
              wishlisted ? "fill-[#FF5FA2] text-[#FF5FA2]" : "text-[#9B8B97]"
            }
          />
        </button>
        {product.savings > 0 && (
          <div className="pointer-events-none absolute right-3 bottom-3 rounded-lg bg-[#FF5FA2] px-2 py-1 font-sans text-[10px] font-bold text-white">
            Save ${product.savings.toFixed(2)}
          </div>
        )}
      </div>

      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col gap-2 p-4"
      >
        <div className="font-sans text-[10px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
          {product.brand}
        </div>
        <h3 className="font-sans text-[13px] leading-snug font-semibold text-[#2F2F2F] dark:text-white">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="font-sans text-[10px] text-[#9B8B97]">
            {product.reviews.toLocaleString()} reviews
          </span>
        </div>
        <div className="mt-0.5 flex items-baseline gap-2">
          <span className="font-display text-[20px] font-bold text-[#2F2F2F] dark:text-white">
            ${lowestPrice.toFixed(2)}
          </span>
          <span className="font-sans text-[11px] text-[#9B8B97] line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
          <span className="ml-auto font-sans text-[10px] text-[#9B8B97]">
            {product.prices.filter((p) => p.inStock).length} stores
          </span>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <Link
          href={`/products/${product.slug}`}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FFEAF4] py-2.5 font-sans text-[12px] font-semibold tracking-wide text-[#FF5FA2] transition-all duration-250 hover:bg-[#FF5FA2] hover:text-white focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none dark:bg-[#3A2530]"
        >
          <Tag size={11} aria-hidden />
          Compare Prices
        </Link>
      </div>
    </article>
  );
}
