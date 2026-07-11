"use server";

import { createHash } from "crypto";

import { headers } from "next/headers";

import { recordAffiliateClick } from "@/lib/analytics/affiliate-clicks";
import { parseCountry, parseDeviceType } from "@/lib/analytics/device";
import { shouldSkipDuplicateClick } from "@/lib/analytics/rate-limit";
import { getOrCreateSessionId } from "@/lib/analytics/session";

export type TrackAffiliateClickInput = {
  productId: string;
  productVariantId?: string | null;
  storeId: string;
  affiliateLinkId?: string | null;
  redirectUrl: string;
  referrer?: string;
};

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function extractClientIp(headerValue: string | null): string | null {
  if (!headerValue?.trim()) {
    return null;
  }

  const first = headerValue.split(",")[0]?.trim();
  return first || null;
}

export async function trackAffiliateClick(
  input: TrackAffiliateClickInput
): Promise<{ redirectUrl: string }> {
  const { redirectUrl } = input;

  try {
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") ?? undefined;
    const referer =
      input.referrer ?? headersList.get("referer") ?? headersList.get("referrer") ?? undefined;
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const clientIp = extractClientIp(forwardedFor) ?? realIp;
    const ipHash = clientIp ? hashIp(clientIp) : undefined;
    const country = parseCountry(headersList);
    const deviceType = userAgent ? parseDeviceType(userAgent) : undefined;

    const sessionId = await getOrCreateSessionId();

    const isDuplicate = shouldSkipDuplicateClick(
      sessionId,
      input.affiliateLinkId,
      input.storeId
    );

    if (!isDuplicate) {
      await recordAffiliateClick({
        affiliateLinkId: input.affiliateLinkId,
        productId: input.productId,
        productVariantId: input.productVariantId,
        storeId: input.storeId,
        sessionId,
        referrer: referer,
        userAgent,
        ipHash,
        country,
        deviceType,
      });
    }
  } catch (err) {
    console.error("[trackAffiliateClick]", err);
  }

  return { redirectUrl };
}
