import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type {
  AffiliateClickInput,
  ClickAnalyticsDateRange,
  ClickCountRow,
  DailyClickCount,
} from "@/types/analytics";

export type RecordAffiliateClickResult = {
  success: boolean;
  clickId?: string;
};

function applyDateRange<T extends { gte: (col: string, val: string) => T; lte: (col: string, val: string) => T }>(
  query: T,
  dateRange?: ClickAnalyticsDateRange
): T {
  if (!dateRange) {
    return query;
  }

  return query
    .gte("clicked_at", dateRange.from.toISOString())
    .lte("clicked_at", dateRange.to.toISOString());
}

/** Insert a single affiliate click row (anon INSERT allowed by RLS). */
export async function recordAffiliateClick(
  input: AffiliateClickInput
): Promise<RecordAffiliateClickResult> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("affiliate_clicks")
      .insert({
        affiliate_link_id: input.affiliateLinkId ?? null,
        product_id: input.productId,
        product_variant_id: input.productVariantId ?? null,
        store_id: input.storeId,
        session_id: input.sessionId ?? null,
        referrer: input.referrer ?? null,
        user_agent: input.userAgent ?? null,
        ip_hash: input.ipHash ?? null,
        country: input.country ?? null,
        device_type: input.deviceType ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[recordAffiliateClick]", error.message);
      return { success: false };
    }

    return { success: true, clickId: data?.id };
  } catch (err) {
    console.error("[recordAffiliateClick]", err);
    return { success: false };
  }
}

/** Admin analytics: most clicked products (service role read). */
export async function getMostClickedProducts(
  limit = 10,
  dateRange?: ClickAnalyticsDateRange
): Promise<ClickCountRow[]> {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("affiliate_clicks")
      .select("product_id, products(name)")
      .order("clicked_at", { ascending: false });

    query = applyDateRange(query, dateRange);

    const { data, error } = await query;

    if (error) {
      console.error("[getMostClickedProducts]", error.message);
      return [];
    }

    const counts = new Map<string, { name: string; count: number }>();

    for (const row of data ?? []) {
      const productId = row.product_id as string;
      const product = row.products as { name: string } | { name: string }[] | null;
      const name = Array.isArray(product)
        ? (product[0]?.name ?? "Unknown")
        : (product?.name ?? "Unknown");
      const existing = counts.get(productId);

      if (existing) {
        existing.count += 1;
      } else {
        counts.set(productId, { name, count: 1 });
      }
    }

    return [...counts.entries()]
      .map(([id, { name, count }]) => ({
        id,
        name,
        clickCount: count,
      }))
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, limit);
  } catch (err) {
    console.error("[getMostClickedProducts]", err);
    return [];
  }
}

/** Admin analytics: most clicked brands via product join (service role read). */
export async function getMostClickedBrands(
  limit = 10,
  dateRange?: ClickAnalyticsDateRange
): Promise<ClickCountRow[]> {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("affiliate_clicks")
      .select("product_id, products(brand_id, brands(name))")
      .order("clicked_at", { ascending: false });

    query = applyDateRange(query, dateRange);

    const { data, error } = await query;

    if (error) {
      console.error("[getMostClickedBrands]", error.message);
      return [];
    }

    const counts = new Map<string, { name: string; count: number }>();

    for (const row of data ?? []) {
      const products = row.products as
        | { brand_id: string; brands: { name: string } | { name: string }[] | null }
        | { brand_id: string; brands: { name: string } | { name: string }[] | null }[]
        | null;

      const product = Array.isArray(products) ? products[0] : products;
      if (!product?.brand_id) continue;

      const brands = product.brands;
      const name = Array.isArray(brands)
        ? (brands[0]?.name ?? "Unknown")
        : (brands?.name ?? "Unknown");
      const existing = counts.get(product.brand_id);

      if (existing) {
        existing.count += 1;
      } else {
        counts.set(product.brand_id, { name, count: 1 });
      }
    }

    return [...counts.entries()]
      .map(([id, { name, count }]) => ({
        id,
        name,
        clickCount: count,
      }))
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, limit);
  } catch (err) {
    console.error("[getMostClickedBrands]", err);
    return [];
  }
}

/** Admin analytics: most clicked affiliate stores (service role read). */
export async function getMostClickedStores(
  limit = 10,
  dateRange?: ClickAnalyticsDateRange
): Promise<ClickCountRow[]> {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from("affiliate_clicks")
      .select("store_id, affiliate_stores(name)")
      .order("clicked_at", { ascending: false });

    query = applyDateRange(query, dateRange);

    const { data, error } = await query;

    if (error) {
      console.error("[getMostClickedStores]", error.message);
      return [];
    }

    const counts = new Map<string, { name: string; count: number }>();

    for (const row of data ?? []) {
      const storeId = row.store_id as string;
      const store = row.affiliate_stores as
        | { name: string }
        | { name: string }[]
        | null;
      const name = Array.isArray(store)
        ? (store[0]?.name ?? "Unknown")
        : (store?.name ?? "Unknown");
      const existing = counts.get(storeId);

      if (existing) {
        existing.count += 1;
      } else {
        counts.set(storeId, { name, count: 1 });
      }
    }

    return [...counts.entries()]
      .map(([id, { name, count }]) => ({
        id,
        name,
        clickCount: count,
      }))
      .sort((a, b) => b.clickCount - a.clickCount)
      .slice(0, limit);
  } catch (err) {
    console.error("[getMostClickedStores]", err);
    return [];
  }
}

/** Admin analytics: daily click totals for the last N days (service role read). */
export async function getDailyClickCounts(days = 30): Promise<DailyClickCount[]> {
  try {
    const supabase = createAdminClient();
    const from = new Date();
    from.setUTCHours(0, 0, 0, 0);
    from.setUTCDate(from.getUTCDate() - (days - 1));

    const { data, error } = await supabase
      .from("affiliate_clicks")
      .select("clicked_at")
      .gte("clicked_at", from.toISOString())
      .order("clicked_at", { ascending: true });

    if (error) {
      console.error("[getDailyClickCounts]", error.message);
      return [];
    }

    const counts = new Map<string, number>();

    for (let i = 0; i < days; i += 1) {
      const date = new Date(from);
      date.setUTCDate(from.getUTCDate() + i);
      counts.set(date.toISOString().slice(0, 10), 0);
    }

    for (const row of data ?? []) {
      const dateKey = (row.clicked_at as string).slice(0, 10);
      counts.set(dateKey, (counts.get(dateKey) ?? 0) + 1);
    }

    return [...counts.entries()].map(([date, count]) => ({ date, count }));
  } catch (err) {
    console.error("[getDailyClickCounts]", err);
    return [];
  }
}
