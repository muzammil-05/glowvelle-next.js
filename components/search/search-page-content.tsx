"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/layout/container";
import { NoResults } from "@/components/search/no-results";
import { PopularCategories } from "@/components/search/popular-categories";
import { SearchHero } from "@/components/search/search-hero";
import { SearchInput } from "@/components/search/search-input";
import { SearchResults } from "@/components/search/search-results";
import { TrendingSearches } from "@/components/search/trending-searches";
import { TRENDING_SEARCHES } from "@/lib/search/constants";
import type { PopularCategory, Product } from "@/types";

type SearchPageContentProps = {
  initialQuery: string;
  popularCategories: PopularCategory[];
  searchResult: { products: Product[]; total: number };
};

export function SearchPageContent({
  initialQuery,
  popularCategories,
  searchResult,
}: SearchPageContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? initialQuery;
  const results = query.trim() ? searchResult.products : [];

  const updateQuery = useCallback(
    (nextQuery: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (nextQuery.trim()) {
        params.set("q", nextQuery.trim());
      } else {
        params.delete("q");
      }

      const queryString = params.toString();
      router.replace(queryString ? `/search?${queryString}` : "/search", {
        scroll: false,
      });
    },
    [router, searchParams]
  );

  const hasQuery = query.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <SearchHero />
      <SearchInput
        value={query}
        onChange={updateQuery}
        resultCount={searchResult.total}
      />

      <Container className="py-10">
        {hasQuery && !hasResults && <NoResults query={query} />}
        {hasQuery && hasResults && (
          <SearchResults products={results} query={query} />
        )}

        {!hasQuery && (
          <p className="mb-2 font-sans text-[14px] text-[#9B8B97]">
            Start typing to search, or try one of our trending searches below.
          </p>
        )}

        <TrendingSearches
          terms={TRENDING_SEARCHES}
          onSelect={updateQuery}
          activeQuery={query}
        />
        <PopularCategories categories={popularCategories} />
      </Container>
    </div>
  );
}
