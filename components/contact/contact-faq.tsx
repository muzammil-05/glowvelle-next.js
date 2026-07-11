import { FaqSection } from "@/components/marketing/faq-section";
import { CONTACT_FAQ } from "@/lib/mock/contact";

export function ContactFaq() {
  return (
    <FaqSection
      eyebrow={CONTACT_FAQ.eyebrow}
      description={CONTACT_FAQ.description}
      items={CONTACT_FAQ.items}
      headingId="contact-faq-heading"
    />
  );
}
