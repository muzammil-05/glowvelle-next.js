import { LegalLayout } from "@/components/legal/legal-layout";
import { PRIVACY_POLICY } from "@/lib/mock/legal";

export function PrivacyContent() {
  return <LegalLayout content={PRIVACY_POLICY} />;
}
