import Image from "next/image";
import Link from "next/link";
import { Sparkles, Tag } from "lucide-react";

import { unsplashImage } from "@/lib/images";
import type { Deal } from "@/types";

type FeaturedDealsProps = {
  deals: Deal[];
};

export function FeaturedDeals({ deals }: FeaturedDealsProps) {
  if (deals.length === 0) return null;

  return (
    <section aria-labelledby="featured-deals-heading" className="mt-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D8B36A]">
            <Sparkles size={18} className="text-white" aria-hidden />
          </div>
          <div>
            <h2
              id="featured-deals-heading"
              className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[36px] dark:text-white"
            >
              Featured <span className="text-[#FF5FA2] italic">Deals</span>
            </h2>
            <p className="font-sans text-[12px] text-[#9B8B97]">
              Hand-picked luxury savings updated daily
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {deals.map((deal) => (
          <article
            key={deal.product.id}
            className="group overflow-hidden rounded-3xl border border-[#FFD6E8] bg-white transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]"
          >
            <div className="relative h-52 overflow-hidden bg-[#FFEAF4]">
              <Image
                src={unsplashImage(deal.product.image, 480, 208)}
                alt={deal.product.name}
                width={480}
                height={208}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={80}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4 rounded-full bg-[#D8B36A] px-3 py-1.5 font-sans text-[10px] font-bold text-white">
                {deal.label}
              </div>
              <div className="absolute top-4 right-4 rounded-xl bg-[#FF5FA2] px-3 py-1.5 text-white">
                <span className="font-display text-[20px] font-bold">{deal.saving}</span>
                <span className="ml-1 font-sans text-[11px]">OFF</span>
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
        ))}
      </div>
    </section>
  );
}
