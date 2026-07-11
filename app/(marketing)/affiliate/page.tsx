import type { Metadata } from "next";

import { AffiliateContent } from "@/components/legal/affiliate-content";
import { createPageMetadata } from "@/lib/seo";

// Static legal page — long-lived content, hourly ISR is sufficient.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Affiliate Disclosure",
  description:
    "Glowvelle's FTC-compliant affiliate disclosure. Learn how we earn commissions and why it never affects our recommendations.",
  path: "/affiliate",
});

export default function AffiliatePage() {
  return <AffiliateContent />;
}
