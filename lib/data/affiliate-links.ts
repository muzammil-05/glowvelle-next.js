import { createStaticClient } from "@/lib/supabase/static";
import type { AffiliateLinkRow } from "@/types/database";

import { handleDbError, safeQuery } from "./errors";

/** Public read: active affiliate links for a product (base variant only). */
export async function getAffiliateLinks(
  productId: string
): Promise<AffiliateLinkRow[]> {
  return safeQuery("getAffiliateLinks", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("affiliate_links")
      .select("id, product_id, variant_id, store_id, affiliate_url, external_product_id, is_active, created_at, updated_at")
      .eq("product_id", productId)
      .eq("is_active", true)
      .is("variant_id", null);

    if (handleDbError("getAffiliateLinks", error)) return [];

    return (data as AffiliateLinkRow[]) ?? [];
  }, []);
}

export type AffiliateLinkInfo = {
  id: string;
  url: string;
};

/** Builds a store_id → affiliate_url lookup from link rows. */
export function buildLinkByStoreId(
  links: AffiliateLinkRow[]
): Map<string, string> {
  const map = new Map<string, string>();

  for (const row of links) {
    if (row.store_id && row.affiliate_url) {
      map.set(row.store_id, row.affiliate_url);
    }
  }

  return map;
}

/** Builds a store_id → link id + url lookup for click tracking. */
export function buildAffiliateLinkInfoByStoreId(
  links: AffiliateLinkRow[]
): Map<string, AffiliateLinkInfo> {
  const map = new Map<string, AffiliateLinkInfo>();

  for (const row of links) {
    if (row.store_id && row.affiliate_url) {
      map.set(row.store_id, { id: row.id, url: row.affiliate_url });
    }
  }

  return map;
}
