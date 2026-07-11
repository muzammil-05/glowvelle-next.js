import type { Metadata } from "next";

import { TermsContent } from "@/components/legal/terms-content";
import { createPageMetadata } from "@/lib/seo";

// Static legal page — long-lived content, hourly ISR is sufficient.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Glowvelle Terms of Service — rules and guidelines for using our beauty price comparison platform.",
  path: "/terms",
});

export default function TermsPage() {
  return <TermsContent />;
}
