import { BrandCard } from "@/components/brands/brand-card";
import type { BrandData } from "@/types";

type BrandGridProps = {
  brands: BrandData[];
};

export function BrandGrid({ brands }: BrandGridProps) {
  if (brands.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mb-4 text-5xl" aria-hidden>
          🌸
        </div>
        <h3 className="mb-2 font-display text-[24px] font-bold text-[#2F2F2F] dark:text-white">
          No brands found
        </h3>
        <p className="font-sans text-[13px] text-[#9B8B97]">
          Try a different search or letter filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 pb-16 md:grid-cols-2 xl:grid-cols-3">
      {brands.map((brand) => (
        <BrandCard key={brand.name} brand={brand} />
      ))}
    </div>
  );
}
