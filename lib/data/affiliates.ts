import { createStaticClient } from "@/lib/supabase/static";
import type {
  AffiliateStoreRow,
  ProductPriceWithStoreRow,
} from "@/types/database";
import type { StorePrice } from "@/types";

import {
  buildAffiliateLinkInfoByStoreId,
  getAffiliateLinks,
  type AffiliateLinkInfo,
} from "./affiliate-links";
import { handleDbError, safeQuery } from "./errors";
import {
  DEFAULT_STORE_COLOR,
  getProductPrices,
  mapProductPriceRowsToStorePrices,
} from "./product-prices";

export type AffiliateStore = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  brandColor: string;
  websiteUrl: string | null;
  sortOrder: number;
};

export type StoreOffer = StorePrice & {
  storeId: string;
  storeSlug: string;
  affiliateLinkId?: string | null;
};

export function mapAffiliateStoreRow(row: AffiliateStoreRow): AffiliateStore {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    logoUrl: row.logo_url,
    brandColor: row.brand_color ?? DEFAULT_STORE_COLOR,
    websiteUrl: row.website_url,
    sortOrder: row.sort_order,
  };
}

export function resolveBuyUrl(
  affiliateUrl: string | null | undefined,
  websiteUrl: string | null | undefined
): string {
  if (affiliateUrl?.trim()) return affiliateUrl.trim();
  if (websiteUrl?.trim()) return websiteUrl.trim();
  return "#";
}

function mapStoreOffer(
  store: AffiliateStore,
  price: ProductPriceWithStoreRow | null,
  linkInfo: AffiliateLinkInfo | null
): StoreOffer | null {
  if (!price) return null;

  return {
    storeId: store.id,
    storeSlug: store.slug,
    store: store.name,
    price: Number(price.price),
    originalPrice:
      price.original_price != null ? Number(price.original_price) : null,
    inStock: price.in_stock,
    prime: price.is_prime,
    color: store.brandColor,
    affiliateUrl: linkInfo?.url ?? undefined,
    affiliateLinkId: linkInfo?.id ?? null,
    websiteUrl: store.websiteUrl ?? undefined,
  };
}

/** Public read: all active affiliate stores. */
export async function getActiveAffiliateStores(): Promise<AffiliateStore[]> {
  return safeQuery("getActiveAffiliateStores", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("affiliate_stores")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (handleDbError("getActiveAffiliateStores", error)) return [];

    if (!data?.length) return [];

    return (data as AffiliateStoreRow[]).map(mapAffiliateStoreRow);
  }, []);
}

/**
 * Public read: consolidated store offers for a product.
 * Joins active stores, prices, and affiliate links.
 */
export async function getProductStoreOffers(
  productId: string
): Promise<StoreOffer[]> {
  return safeQuery("getProductStoreOffers", async () => {
    const supabase = createStaticClient();

    const [storesResult, prices, links] = await Promise.all([
      supabase
        .from("affiliate_stores")
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true }),
      getProductPrices(productId),
      getAffiliateLinks(productId),
    ]);

    if (handleDbError("getProductStoreOffers", storesResult.error)) {
      return [];
    }

    const stores =
      (storesResult.data as AffiliateStoreRow[] | null)?.map(
        mapAffiliateStoreRow
      ) ?? [];

    const priceByStoreId = new Map<string, ProductPriceWithStoreRow>();
    for (const row of prices) {
      if (row.store_id) {
        priceByStoreId.set(row.store_id, row);
      }
    }

    const linkInfoByStoreId = buildAffiliateLinkInfoByStoreId(links);

    return stores
      .map((store) =>
        mapStoreOffer(
          store,
          priceByStoreId.get(store.id) ?? null,
          linkInfoByStoreId.get(store.id) ?? null
        )
      )
      .filter((offer): offer is StoreOffer => offer !== null);
  }, []);
}

// Re-export price mapping for product list queries that embed prices inline.
export { mapProductPriceRowsToStorePrices } from "./product-prices";
