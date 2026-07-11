import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { BrandCard } from "@/components/brands/brand-card";
import type { BrandData } from "@/types";

type RelatedBrandsProps = {
  brands: BrandData[];
};

export function RelatedBrands({ brands }: RelatedBrandsProps) {
  if (brands.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-brands-heading"
      className="border-t border-[#FFD6E8] pt-14 pb-16 dark:border-[#3A2530]"
    >
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            Discover More
          </p>
          <h2
            id="related-brands-heading"
            className="font-display text-[42px] leading-tight font-bold text-[#2F2F2F] dark:text-white"
          >
            Related <span className="text-[#FF5FA2] italic">Brands</span>
          </h2>
        </div>
        <Link
          href="/brands"
          className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all hover:gap-2.5 focus-visible:outline-none"
        >
          View All Brands <ChevronRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {brands.map((brand) => (
          <BrandCard key={brand.name} brand={brand} />
        ))}
      </div>
    </section>
  );
}
