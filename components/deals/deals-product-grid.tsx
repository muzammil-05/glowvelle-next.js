import { ProductCard } from "@/components/marketing/product-card";
import { ProductsEmptyState } from "@/components/shared/products-empty-state";
import type { Product } from "@/types";

type DealsProductGridProps = {
  products: Product[];
};

export function DealsProductGrid({ products }: DealsProductGridProps) {
  return (
    <section aria-labelledby="deals-product-grid-heading" className="mt-16">
      <div className="mb-8">
        <p className="mb-2 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
          All Deals
        </p>
        <h2
          id="deals-product-grid-heading"
          className="font-display text-2xl leading-tight font-bold text-[#2F2F2F] sm:text-3xl lg:text-[36px] dark:text-white"
        >
          Every Deal,{" "}
          <span className="text-[#FF5FA2] italic">One Place</span>
        </h2>
        <p className="mt-2 font-sans text-[12px] text-[#9B8B97]">
          Browse all products with active savings across retailers
        </p>
      </div>

      {products.length === 0 ? (
        <ProductsEmptyState
          title="Deals coming soon"
          description="We're tracking price drops across all retailers. Check back soon for hand-picked savings."
          actionHref="/shop"
          actionLabel="Browse All Products"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
