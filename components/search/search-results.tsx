import { ProductCard } from "@/components/marketing/product-card";
import type { Product } from "@/types";

type SearchResultsProps = {
  products: Product[];
  query: string;
};

export function SearchResults({ products, query }: SearchResultsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="search-results-heading">
      <h2
        id="search-results-heading"
        className="mb-6 font-display text-[28px] font-bold text-[#2F2F2F] dark:text-white"
      >
        Products{" "}
        <span className="ml-2 font-sans text-[16px] font-normal text-[#9B8B97]">
          ({products.length})
        </span>
      </h2>
      {query && (
        <p className="sr-only">
          Showing {products.length} products matching {query}
        </p>
      )}
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
