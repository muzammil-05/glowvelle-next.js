import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/container";
import { BrandsEmptyState } from "@/components/shared/brands-empty-state";
import { getBrandHref } from "@/lib/brands/utils";
import { unsplashImage } from "@/lib/images";
import type { BrandData } from "@/types";

type TopBrandsSectionProps = {
  brands: BrandData[];
};

export function TopBrandsSection({ brands }: TopBrandsSectionProps) {
  return (
    <section
      aria-labelledby="top-brands-heading"
      className="bg-[#FFF9FC] py-16 sm:py-20 lg:py-24 dark:bg-[#1A0D13]"
    >
      <Container>
        <div className="mb-14 text-center">
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            World-Class Beauty
          </p>
          <h2
            id="top-brands-heading"
            className="font-display text-3xl leading-[1.1] font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
          >
            Featured <span className="text-[#FF5FA2] italic">Brands</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {brands.length === 0 ? (
            <BrandsEmptyState variant="grid" />
          ) : (
            brands.map((brand) => (
              <Link
                key={brand.slug}
                href={getBrandHref(brand)}
                className="group relative h-36 overflow-hidden rounded-2xl bg-[#FFD6E8] transition-all duration-300 hover:shadow-xl hover:shadow-[#FF5FA2]/10 focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:ring-offset-2 focus-visible:outline-none sm:h-48"
              >
                <Image
                  src={unsplashImage(brand.image, 240, 192)}
                  alt={brand.name}
                  width={240}
                  height={192}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  quality={80}
                  className="h-full w-full object-cover opacity-75 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F2F2F]/85 via-[#2F2F2F]/15 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <div className="font-sans text-[12px] leading-tight font-bold text-white">
                    {brand.name}
                  </div>
                  <div className="font-sans text-[10px] text-white/60">
                    {brand.productCount} products
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
