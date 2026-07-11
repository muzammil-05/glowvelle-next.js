"use client";

import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
};

export function SearchInput({ value, onChange, resultCount }: SearchInputProps) {
  return (
    <div className="border-b border-[#FFD6E8] bg-[#FFF9FC] dark:border-[#3A2530] dark:bg-[#1A0D13]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <p className="mb-4 font-sans text-[13px] text-[#9B8B97]">
          {value ? (
            <>
              {resultCount} result{resultCount === 1 ? "" : "s"} for{" "}
              <span className="font-semibold text-[#2F2F2F] dark:text-white">
                &ldquo;{value}&rdquo;
              </span>
            </>
          ) : (
            "Search our catalog of 50,000+ beauty products"
          )}
        </p>
        <form
          onSubmit={(event) => event.preventDefault()}
          role="search"
          aria-label="Product search"
        >
          <div className="relative max-w-2xl">
            <Search
              size={18}
              className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-[#9B8B97]"
              aria-hidden
            />
            <input
              type="search"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              placeholder="Search products, brands, or categories..."
              aria-label="Search products, brands, or categories"
              className="w-full rounded-2xl border border-[#FFD6E8] bg-white py-4 pr-5 pl-14 font-sans text-[14px] text-[#2F2F2F] placeholder-[#9B8B97] focus:ring-2 focus:ring-[#FF5FA2] focus:outline-none dark:border-[#3A2530] dark:bg-[#2A1520] dark:text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
