import { LegalLayout } from "@/components/legal/legal-layout";
import { TERMS_OF_SERVICE } from "@/lib/mock/legal";
import { blogProse } from "@/lib/typography";

export function TermsContent() {
  return (
    <LegalLayout content={TERMS_OF_SERVICE}>
      {TERMS_OF_SERVICE.sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="mb-10 scroll-mt-28 border-b border-[#FFD6E8] pb-10 last:mb-0 last:border-0 last:pb-0 dark:border-[#3A2530]"
        >
          <h2 className={blogProse.sectionHeading}>{section.heading}</h2>
          {section.content.map((paragraph, index) => (
            <p key={index} className={blogProse.paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </LegalLayout>
  );
}
