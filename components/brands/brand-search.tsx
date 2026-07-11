"use client";

import { Search } from "lucide-react";

type BrandSearchProps = {
  query: string;
  onQueryChange: (query: string) => void;
  stats: readonly { value: string; label: string }[];
};

export function BrandSearch({
  query,
  onQueryChange,
  stats,
}: BrandSearchProps) {
  return (
    <div className="mt-8 mb-10 flex items-center gap-6">
      <div className="relative max-w-lg flex-1">
        <Search
          size={16}
          className="absolute top-1/2 left-4 -translate-y-1/2 text-[#9B8B97]"
          aria-hidden
        />
        <label htmlFor="brand-search" className="sr-only">
          Search brands
        </label>
        <input
          id="brand-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search brands..."
          className="w-full rounded-2xl border border-[#FFD6E8] bg-white py-3 pr-4 pl-11 font-sans text-[13px] text-[#2F2F2F] placeholder-[#9B8B97] focus:ring-2 focus:ring-[#FF5FA2] focus:outline-none dark:border-[#3A2530] dark:bg-[#2A1520] dark:text-white"
        />
      </div>

      <div className="hidden items-center gap-6 md:flex">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-display text-[22px] font-bold text-[#FF5FA2]">
              {stat.value}
            </div>
            <div className="font-sans text-[11px] text-[#9B8B97]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
