import type { Metadata } from "next";

import { PrivacyContent } from "@/components/legal/privacy-content";
import { createPageMetadata } from "@/lib/seo";

// Static legal page — long-lived content, hourly ISR is sufficient.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Glowvelle collects, uses, and protects your personal data. We never sell your information to third parties.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <PrivacyContent />;
}
