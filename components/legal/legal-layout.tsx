import type { ReactNode } from "react";

import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { LegalSidebar } from "@/components/legal/legal-sidebar";
import type { LegalPageContent } from "@/lib/mock/legal";
import { legalProse } from "@/lib/typography";

type LegalLayoutProps = {
  content: LegalPageContent;
  children?: ReactNode;
};

export function LegalLayout({ content, children }: LegalLayoutProps) {

  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <section
        aria-labelledby="legal-page-title"
        className="border-b border-[#FFD6E8] bg-white dark:border-[#3A2530] dark:bg-[#200F18]"
      >
        <Container className="py-10">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: content.breadcrumbLabel },
            ]}
          />
          <div className="mt-5">
            <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
              {content.eyebrow}
            </p>
            <h1
              id="legal-page-title"
              className="font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl lg:text-[52px] dark:text-white"
            >
              {content.title}
            </h1>
            <p className="mt-3 font-sans text-[12px] text-[#9B8B97]">
              Last updated: {content.updated}
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
          <LegalSidebar sections={content.sections} />

          <div className="max-w-3xl">
            {children ??
              content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-10 scroll-mt-28 border-b border-[#FFD6E8] pb-10 last:mb-0 last:border-0 last:pb-0 dark:border-[#3A2530]"
                >
                  <h2 className={legalProse.sectionHeading}>{section.heading}</h2>
                  {section.content.map((paragraph, index) => (
                    <p key={index} className={legalProse.paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

            <div className="mt-8 rounded-2xl border border-[#FFD6E8] bg-[#FFEAF4] p-6 dark:border-[#3A2530] dark:bg-[#2A1520]">
              <p className="font-sans text-[13px] text-[#9B8B97] dark:text-white/55">
                Questions about this policy? Email us at{" "}
                <a
                  href={`mailto:${content.contactEmail}`}
                  className="font-semibold text-[#FF5FA2] hover:underline"
                >
                  {content.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
