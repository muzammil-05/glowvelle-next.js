"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export function Pagination({ current, total, onChange }: PaginationProps) {
  if (total <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Product pagination"
      className="flex items-center justify-center gap-2 pt-12"
    >
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD6E8] text-[#9B8B97] transition-colors hover:border-[#FF5FA2] hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none disabled:opacity-30 dark:border-[#3A2530]"
      >
        <ChevronLeft size={15} aria-hidden />
      </button>
      {Array.from({ length: total }, (_, index) => index + 1).map((page) => (
        <button
          key={page}
          type="button"
          aria-label={`Page ${page}`}
          aria-current={page === current ? "page" : undefined}
          onClick={() => onChange(page)}
          className={`h-10 w-10 rounded-full font-sans text-[13px] font-semibold transition-all focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none ${
            page === current
              ? "bg-[#FF5FA2] text-white shadow-md shadow-[#FF5FA2]/30"
              : "border border-[#FFD6E8] text-[#9B8B97] hover:border-[#FF5FA2] hover:text-[#FF5FA2] dark:border-[#3A2530]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FFD6E8] text-[#9B8B97] transition-colors hover:border-[#FF5FA2] hover:text-[#FF5FA2] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none disabled:opacity-30 dark:border-[#3A2530]"
      >
        <ChevronRight size={15} aria-hidden />
      </button>
    </nav>
  );
}
