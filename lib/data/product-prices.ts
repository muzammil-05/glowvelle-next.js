import { createStaticClient } from "@/lib/supabase/static";
import type { ProductPriceWithStoreRow } from "@/types/database";
import type { StorePrice } from "@/types";

import { handleDbError, safeQuery } from "./errors";
import { getRelation } from "./types";

export const DEFAULT_STORE_COLOR = "#2F2F2F";

const PRODUCT_PRICE_SELECT = `
  store_id,
  price,
  original_price,
  in_stock,
  is_prime,
  currency,
  variant_id,
  affiliate_stores(name, brand_color)
`;

/** Public read: product prices with store metadata (base variant only). */
export async function getProductPrices(
  productId: string
): Promise<ProductPriceWithStoreRow[]> {
  return safeQuery("getProductPrices", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("product_prices")
      .select(PRODUCT_PRICE_SELECT)
      .eq("product_id", productId)
      .is("variant_id", null);

    if (handleDbError("getProductPrices", error)) return [];

    return (data as ProductPriceWithStoreRow[]) ?? [];
  }, []);
}

export function mapProductPriceRowsToStorePrices(
  prices: ProductPriceWithStoreRow[] | null | undefined,
  options?: {
    linkByStoreId?: Map<string, string>;
    websiteByStoreId?: Map<string, string | null>;
  }
): StorePrice[] {
  if (!prices?.length) return [];

  return prices.map((row) => {
    const store = getRelation(row.affiliate_stores);
    const storeId = row.store_id ?? "";
    const affiliateUrl = storeId
      ? options?.linkByStoreId?.get(storeId)
      : undefined;
    const websiteUrl = storeId
      ? (options?.websiteByStoreId?.get(storeId) ?? undefined)
      : undefined;

    return {
      store: store?.name ?? "Store",
      price: Number(row.price),
      originalPrice:
        row.original_price != null ? Number(row.original_price) : null,
      inStock: row.in_stock,
      prime: row.is_prime,
      color: store?.brand_color ?? DEFAULT_STORE_COLOR,
      affiliateUrl: affiliateUrl ?? undefined,
      websiteUrl: websiteUrl ?? undefined,
    };
  });
}
