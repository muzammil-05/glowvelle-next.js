"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Sparkles, Tag, Zap } from "lucide-react";

import { DealCountdown } from "@/components/deals/deal-countdown";
import { unsplashImage } from "@/lib/images";
import type { FlashDeal } from "@/lib/mock/deals";

function FlashDealCard({ deal }: { deal: FlashDeal }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#FFD6E8] bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]">
      <div className="relative h-56 overflow-hidden bg-[#FFD6E8]">
        <Image
          src={unsplashImage(deal.product.image, 480, 224)}
          alt={deal.product.name}
          width={480}
          height={224}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-4 left-4 flex items-center gap-1.5 rounded-full bg-[#FF5FA2] px-3 py-1.5 font-sans text-[10px] font-bold text-white">
          <Zap size={10} aria-hidden />
          {deal.label}
        </div>
        <div className="absolute top-4 right-4 rounded-xl bg-[#D8B36A] px-3 py-1.5 text-white">
          <span className="font-display text-[20px] font-bold">{deal.saving}</span>
          <span className="ml-1 font-sans text-[11px]">OFF</span>
        </div>
        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
          <div className="flex items-center gap-2 rounded-xl bg-black/50 px-3 py-1.5 backdrop-blur-sm">
            <Clock size={12} className="text-white/70" aria-hidden />
            <DealCountdown
              initial={deal.timeLeft}
              className="flex items-center gap-1.5"
              valueClassName="font-display text-[16px] font-bold text-white"
              separatorClassName="text-[16px] font-bold text-[#FF5FA2] mx-0.5"
            />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-1 font-sans text-[10px] font-semibold tracking-[0.12em] text-[#FF5FA2] uppercase">
          {deal.product.brand}
        </div>
        <h3 className="mb-1 font-sans text-[14px] leading-snug font-semibold text-[#2F2F2F] dark:text-white">
          {deal.product.name}
        </h3>
        <p className="mb-4 font-sans text-[12px] text-[#9B8B97]">{deal.from}</p>
        <div className="flex gap-2">
          <Link
            href={`/products/${deal.product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#FF5FA2] py-2.5 font-sans text-[12px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
          >
            <Tag size={11} aria-hidden />
            Grab Deal
          </Link>
          <Link
            href={`/products/${deal.product.slug}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#FFD6E8] font-sans text-[12px] font-semibold text-[#FF5FA2] transition-colors hover:bg-[#FFEAF4] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none dark:border-[#3A2530]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FlashDeals({
  deals,
  activeCount,
}: {
  deals: FlashDeal[];
  activeCount: number;
}) {
  if (deals.length === 0) return null;

  return (
    <section aria-labelledby="flash-deals-heading" className="mt-16">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF5FA2]">
            <Zap size={18} className="text-white" aria-hidden />
          </div>
          <div>
            <h2
              id="flash-deals-heading"
              className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[36px] dark:text-white"
            >
              Flash <span className="text-[#FF5FA2] italic">Deals</span>
            </h2>
            <p className="font-sans text-[12px] text-[#9B8B97]">
              Prices this low disappear fast
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-[#FFD6E8] bg-[#FFEAF4] px-4 py-2.5 dark:border-[#3A2530] dark:bg-[#2A1520]">
          <Sparkles size={14} className="text-[#FF5FA2]" aria-hidden />
          <span className="font-sans text-[12px] font-semibold text-[#FF5FA2]">
            {activeCount} active flash deals
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {deals.map((deal) => (
          <FlashDealCard key={deal.product.id} deal={deal} />
        ))}
      </div>
    </section>
  );
}
