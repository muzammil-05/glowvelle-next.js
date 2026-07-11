import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getBrandHref } from "@/lib/brands/utils";
import { unsplashImage } from "@/lib/images";
import type { BrandData } from "@/types";

type BrandCardProps = {
  brand: BrandData;
};

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-[#FFD6E8] bg-white text-left transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5FA2]/10 dark:border-[#3A2530] dark:bg-[#2A1520]">
      <div className="relative h-52 overflow-hidden bg-[#FFD6E8]">
        <Image
          src={unsplashImage(brand.image, 480, 208)}
          alt={brand.name}
          width={480}
          height={208}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={80}
          className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F]/60 to-transparent" />
        <div className="absolute right-5 bottom-4 left-5">
          <div className="font-display text-[22px] leading-tight font-bold text-white">
            {brand.name}
          </div>
          <div className="font-sans text-[11px] text-white/70">
            {brand.country} · Est. {brand.founded}
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="mb-4 line-clamp-2 font-sans text-[12px] leading-relaxed text-[#9B8B97] dark:text-white/55">
          {brand.tagline}
        </p>

        <div className="flex items-end justify-between gap-4">
          <div className="text-center">
            <div className="font-display text-[18px] font-bold text-[#FF5FA2]">
              {brand.productCount}
            </div>
            <div className="font-sans text-[10px] text-[#9B8B97]">Products</div>
          </div>

          <Button
            nativeButton={false}
            render={
              <Link
                href={getBrandHref(brand)}
                aria-label={`Explore ${brand.name}`}
              />
            }
            className="h-9 rounded-full bg-[#FFEAF4] px-5 font-sans text-[12px] font-semibold text-[#FF5FA2] hover:bg-[#FF5FA2] hover:text-white dark:bg-[#3A2530] dark:hover:bg-[#FF5FA2]"
          >
            Explore
            <ArrowRight size={14} aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  );
}
