"use client";

import { Container } from "@/components/layout/container";
import { ShopFilters } from "@/components/shop/shop-filters";
import { ShopProductGrid } from "@/components/shop/shop-product-grid";
import { ShopToolbar } from "@/components/shop/shop-toolbar";
import type { useShopCatalog } from "@/components/shop/use-shop-catalog";
import type { Category } from "@/types";

type ShopCatalog = ReturnType<typeof useShopCatalog>;

type ShopCatalogSectionProps = {
  catalog: ShopCatalog;
  categories: Category[];
  showSearch?: boolean;
  resultLabel?: string;
};

export function ShopCatalogSection({
  catalog,
  categories,
  showSearch = false,
  resultLabel,
}: ShopCatalogSectionProps) {
  const {
    searchQuery,
    sortBy,
    selectedCategories,
    selectedBrands,
    maxPrice,
    minRating,
    currentPage,
    brands,
    total,
    paginatedProducts,
    totalPages,
    activeFilterCount,
    toggleCategory,
    toggleBrand,
    clearAllFilters,
    handleSearchChange,
    handleSortChange,
    handleMaxPriceChange,
    handleMinRatingChange,
    setCurrentPage,
  } = catalog;

  return (
    <Container className="flex flex-col gap-6 py-8 sm:py-10 lg:flex-row lg:gap-8">
      <ShopFilters
        categories={categories}
        brands={brands}
        selectedCategories={selectedCategories}
        selectedBrands={selectedBrands}
        maxPrice={maxPrice}
        minRating={minRating}
        activeFilterCount={activeFilterCount}
        onToggleCategory={toggleCategory}
        onToggleBrand={toggleBrand}
        onMaxPriceChange={handleMaxPriceChange}
        onMinRatingChange={handleMinRatingChange}
        onClearAll={clearAllFilters}
      />

      <div className="min-w-0 flex-1">
        {showSearch && (
        <ShopToolbar
          searchQuery={searchQuery}
          sortBy={sortBy}
          resultCount={catalog.total}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          showResultsBar={false}
        />
        )}

        <ShopToolbar
          searchQuery={searchQuery}
          sortBy={sortBy}
          resultCount={total}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          showSearch={false}
          resultLabel={resultLabel}
        />

        <ShopProductGrid
          products={paginatedProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          selectedCategories={selectedCategories}
          selectedBrands={selectedBrands}
          onRemoveCategory={toggleCategory}
          onRemoveBrand={toggleBrand}
        />
      </div>
    </Container>
  );
}
