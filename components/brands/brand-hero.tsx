import Image from "next/image";
import { Globe, Share2 } from "lucide-react";

import { Container } from "@/components/layout/container";
import { getBrandWebsiteUrl } from "@/lib/brands/utils";
import { unsplashImage } from "@/lib/images";
import type { BrandData } from "@/types";

type BrandHeroProps = {
  brand: BrandData;
};

export function BrandHero({ brand }: BrandHeroProps) {
  const websiteUrl = getBrandWebsiteUrl(brand.website);

  return (
    <section
      aria-labelledby="brand-hero-title"
      className="relative min-h-[280px] overflow-hidden bg-[#2F2F2F] sm:min-h-[360px] lg:h-[420px]"
    >
      <Image
        src={unsplashImage(brand.image, 1440, 420)}
        alt={brand.name}
        width={1440}
        height={420}
        priority
        sizes="100vw"
        quality={80}
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#2F2F2F]/90 via-[#2F2F2F]/60 to-transparent" />
      <Container className="absolute inset-0 flex items-center">
        <div className="flex w-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.18em] text-[#D8B36A] uppercase sm:mb-4">
              Premium Beauty Brand
            </p>
            <h1
              id="brand-hero-title"
              className="mb-2 font-display text-3xl leading-tight font-bold text-white sm:mb-3 sm:text-4xl md:text-5xl lg:text-[64px]"
            >
              {brand.name}
            </h1>
            <p className="font-sans text-sm text-white/65 italic sm:text-[16px]">
              {brand.tagline}
            </p>
          </div>

          <div className="flex flex-row flex-wrap gap-3 sm:flex-col">
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${brand.name} website (opens in new tab)`}
              className="flex items-center gap-2 rounded-full bg-[#FF5FA2] px-6 py-3 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <Globe size={14} aria-hidden />
              Visit Website
            </a>
            <a
              href={`https://instagram.com/${brand.website.split(".")[0]}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow ${brand.name} on Instagram (opens in new tab)`}
              className="flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-sans text-[13px] font-medium text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <Share2 size={14} aria-hidden />
              Follow on Instagram
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
