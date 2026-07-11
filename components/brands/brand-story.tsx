import Image from "next/image";

import { unsplashImage } from "@/lib/images";
import type { BrandData } from "@/types";

type BrandStoryProps = {
  brand: BrandData;
};

export function BrandStory({ brand }: BrandStoryProps) {
  return (
    <section
      aria-labelledby="brand-story-heading"
      className="mb-16 grid grid-cols-1 items-start gap-16 lg:grid-cols-[1.2fr_1fr]"
    >
      <div>
        <p className="mb-3 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
          About the Brand
        </p>
        <h2
          id="brand-story-heading"
          className="mb-6 font-display text-[42px] leading-tight font-bold text-[#2F2F2F] dark:text-white"
        >
          The Story Behind
          <br />
          <span className="text-[#FF5FA2] italic">{brand.name}</span>
        </h2>
        <p className="font-sans text-[14px] leading-relaxed text-[#9B8B97] dark:text-white/60">
          {brand.description}
        </p>
      </div>

      <div className="relative">
        <div className="h-56 overflow-hidden rounded-3xl bg-[#FFD6E8] shadow-xl shadow-[#FF5FA2]/10 sm:h-72 lg:h-[380px]">
          <Image
            src={unsplashImage(brand.image, 560, 380)}
            alt={brand.name}
            width={560}
            height={380}
            sizes="(max-width: 1024px) 100vw, 40vw"
            quality={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 left-4 rounded-2xl border border-[#FFD6E8] bg-white p-4 shadow-xl sm:-bottom-5 sm:-left-5 dark:border-[#3A2530] dark:bg-[#2A1520]">
          <div className="font-display text-[28px] leading-none font-bold text-[#FF5FA2]">
            {brand.instagramFollowers}
          </div>
          <div className="font-sans text-[11px] text-[#9B8B97]">
            Instagram followers
          </div>
        </div>
      </div>
    </section>
  );
}
