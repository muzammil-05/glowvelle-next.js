export type DeviceType = "desktop" | "mobile" | "tablet";

export type AffiliateClickInput = {
  affiliateLinkId?: string | null;
  productId: string;
  productVariantId?: string | null;
  storeId: string;
  sessionId?: string | null;
  referrer?: string | null;
  userAgent?: string | null;
  ipHash?: string | null;
  country?: string | null;
  deviceType?: DeviceType | null;
};

export type ClickAnalyticsDateRange = {
  from: Date;
  to: Date;
};

export type ClickCountRow = {
  id: string;
  name: string;
  clickCount: number;
};

export type DailyClickCount = {
  date: string;
  count: number;
};
