import Image from "next/image";
import Link from "next/link";

import { getBrandHref } from "@/lib/brands/utils";
import { unsplashImage } from "@/lib/images";
import type { BrandData } from "@/types";

type FeaturedBrandsProps = {
  brands: BrandData[];
};

export function FeaturedBrands({ brands }: FeaturedBrandsProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="featured-brands-heading"
      className="mb-16 border-b border-[#FFD6E8] pb-16 dark:border-[#3A2530]"
    >
      <div className="mb-10">
        <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
          Curated for You
        </p>
        <h2
          id="featured-brands-heading"
          className="font-display text-3xl leading-[1.1] font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
        >
          Featured <span className="text-[#FF5FA2] italic">Brands</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand.name}
            href={getBrandHref(brand)}
            className="group relative h-56 overflow-hidden rounded-3xl bg-[#FFD6E8] transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF5FA2]/10 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Image
              src={unsplashImage(brand.image, 480, 224)}
              alt={brand.name}
              width={480}
              height={224}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={80}
              className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F]/85 via-[#2F2F2F]/20 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <p className="mb-1 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
                Premium Pick
              </p>
              <h3 className="font-display text-[28px] leading-tight font-bold text-white">
                {brand.name}
              </h3>
              <p className="mt-1 line-clamp-1 font-sans text-[12px] text-white/70">
                {brand.tagline}
              </p>
              <p className="mt-3 font-sans text-[11px] text-white/60">
                {brand.productCount} products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
