"use client";

import { useMemo, useState } from "react";

import { AlphabetFilter } from "@/components/brands/alphabet-filter";
import { BrandGrid } from "@/components/brands/brand-grid";
import { BrandSearch } from "@/components/brands/brand-search";
import { FeaturedBrands } from "@/components/brands/featured-brands";
import {
  filterBrands,
  getBrandPageStats,
  getFeaturedBrandsFromList,
  type AlphabetFilterLetter,
} from "@/lib/brands/utils";
import type { BrandData } from "@/types";

type BrandsPageContentProps = {
  brands: BrandData[];
};

export function BrandsPageContent({ brands }: BrandsPageContentProps) {
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<AlphabetFilterLetter>("All");

  const featuredBrands = useMemo(
    () => getFeaturedBrandsFromList(brands),
    [brands]
  );

  const filteredBrands = useMemo(
    () => filterBrands(brands, query, activeLetter),
    [brands, query, activeLetter]
  );

  const stats = useMemo(() => getBrandPageStats(brands.length), [brands.length]);

  return (
    <>
      <BrandSearch
        query={query}
        onQueryChange={setQuery}
        stats={stats}
      />

      <AlphabetFilter
        activeLetter={activeLetter}
        onLetterChange={setActiveLetter}
      />

      <FeaturedBrands brands={featuredBrands} />

      <BrandGrid brands={filteredBrands} />
    </>
  );
}
