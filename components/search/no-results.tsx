import Link from "next/link";

type NoResultsProps = {
  query: string;
};

export function NoResults({ query }: NoResultsProps) {
  return (
    <div className="py-16 text-center">
      <div className="mb-5 text-6xl" aria-hidden>
        🔍
      </div>
      <h2 className="mb-3 font-display text-[36px] font-bold text-[#2F2F2F] dark:text-white">
        No results found
      </h2>
      <p className="mx-auto mb-8 max-w-md font-sans text-[14px] text-[#9B8B97]">
        We couldn&apos;t find anything matching &ldquo;{query}&rdquo;. Try a
        different search term or browse our categories below.
      </p>
      <Link
        href="/shop"
        className="inline-flex rounded-full bg-[#FF5FA2] px-7 py-3.5 font-sans text-[13px] font-semibold text-white transition-colors hover:bg-[#E84D91] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none"
      >
        Browse All Products
      </Link>
    </div>
  );
}
