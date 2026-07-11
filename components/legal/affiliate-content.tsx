import { LegalLayout } from "@/components/legal/legal-layout";
import { AFFILIATE_DISCLOSURE } from "@/lib/mock/legal";

export function AffiliateContent() {
  return <LegalLayout content={AFFILIATE_DISCLOSURE} />;
}
