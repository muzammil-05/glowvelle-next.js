"use client";

type TrendingSearchesProps = {
  terms: readonly string[];
  onSelect: (term: string) => void;
  activeQuery: string;
};

export function TrendingSearches({
  terms,
  onSelect,
  activeQuery,
}: TrendingSearchesProps) {
  return (
    <section aria-labelledby="trending-searches-heading" className="mt-14">
      <h2
        id="trending-searches-heading"
        className="mb-4 font-display text-[22px] font-bold text-[#2F2F2F] dark:text-white"
      >
        Trending Searches
      </h2>
      <div className="flex flex-wrap gap-3">
        {terms.map((term) => {
          const isActive = activeQuery.toLowerCase() === term.toLowerCase();

          return (
            <button
              key={term}
              type="button"
              onClick={() => onSelect(term)}
              aria-pressed={isActive}
              className={`rounded-full border px-5 py-2 font-sans text-[12px] font-semibold transition-all ${
                isActive
                  ? "border-[#FF5FA2] bg-[#FF5FA2] text-white"
                  : "border-[#FFD6E8] bg-[#FFEAF4] text-[#FF5FA2] hover:border-[#FF5FA2] dark:border-[#3A2530] dark:bg-[#2A1520] dark:hover:bg-[#FF5FA2] dark:hover:text-white"
              }`}
            >
              {term}
            </button>
          );
        })}
      </div>
    </section>
  );
}
