import { FaqSection } from "@/components/marketing/faq-section";
import type { FaqItem } from "@/types";

type BlogArticleFaqProps = {
  faq: FaqItem[];
};

export function BlogArticleFaq({ faq }: BlogArticleFaqProps) {
  if (faq.length === 0) {
    return null;
  }

  return (
    <FaqSection
      eyebrow="Common Questions"
      description="Quick answers to the most common questions about this topic."
      items={faq}
      headingId="blog-faq-heading"
      className="mt-16"
    />
  );
}
