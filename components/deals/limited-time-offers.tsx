"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Tag, TrendingUp, Zap } from "lucide-react";

import { DealCountdown } from "@/components/deals/deal-countdown";
import { ProductsEmptyState } from "@/components/shared/products-empty-state";
import { unsplashImage } from "@/lib/images";
import type { Deal } from "@/types";

type LimitedTimeOffersProps = {
  deals: Deal[];
  limitedTimeEndsIn: readonly [string, string, string];
};

export function LimitedTimeOffers({
  deals,
  limitedTimeEndsIn,
}: LimitedTimeOffersProps) {
  if (deals.length === 0) {
    return (
      <section aria-labelledby="limited-time-offers-heading" className="mt-16">
        <ProductsEmptyState
          variant="inline"
          title="Limited-time deals coming soon"
          description="We're tracking price drops across all retailers. Check back soon for this week's best deals."
          actionHref="/shop"
          actionLabel="Browse Products"
        />
      </section>
    );
  }

  return (
    <section aria-labelledby="limited-time-offers-heading" className="mt-16">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8B36A]">
            <TrendingUp size={18} className="text-white" aria-hidden />
          </div>
          <div>
            <p className="mb-1 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
              Limited Time Offers
            </p>
            <h2
              id="limited-time-offers-heading"
              className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[36px] dark:text-white"
            >
              This Week&apos;s{" "}
              <span className="text-[#FF5FA2] italic">Best Deals</span>
            </h2>
            <p className="font-sans text-[12px] text-[#9B8B97]">
              Recently reduced across all retailers
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2.5 rounded-2xl border border-[#FFD6E8] bg-[#FFF9FC] px-5 py-3 dark:border-[#3A2530] dark:bg-[#2A1520]">
          <Clock size={15} className="text-[#FF5FA2]" aria-hidden />
          <span className="mr-1 font-sans text-[12px] text-[#9B8B97]">
            Flash ends in
          </span>
          <DealCountdown initial={limitedTimeEndsIn} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {deals.map((deal) => (
          <article
            key={deal.product.id}
            className="group overflow-hidden rounded-3xl border border-[#FFD6E8] bg-[#FFF9FC] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <div className="relative h-56 overflow-hidden bg-[#FFD6E8]">
              <Image
                src={unsplashImage(deal.product.image, 500, 224)}
                alt={deal.product.name}
                width={500}
                height={224}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#FF5FA2] px-3 py-1 font-sans text-[10px] font-bold text-white">
                <Zap size={10} aria-hidden />
                {deal.label}
              </div>
              <div className="absolute right-4 bottom-4 rounded-xl bg-[#D8B36A] px-3 py-1.5 text-white">
                <span className="font-display text-[20px] font-bold">{deal.saving}</span>
                <span className="ml-1 font-sans text-[11px]">OFF</span>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-1 font-sans text-[10px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
                {deal.product.brand}
              </div>
              <h3 className="mb-1.5 font-sans text-[14px] leading-snug font-semibold text-[#2F2F2F] dark:text-white">
                {deal.product.name}
              </h3>
              <p className="mb-5 font-sans text-[12px] text-[#9B8B97]">{deal.from}</p>
              <Link
                href={`/products/${deal.product.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5FA2] py-3 font-sans text-[12px] font-semibold text-white transition-colors duration-200 hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <Tag size={12} aria-hidden />
                Grab This Deal
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
