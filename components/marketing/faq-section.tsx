import { AccordionItem } from "@/components/marketing/accordion-item";
import type { FaqItem } from "@/types";

type FaqSectionProps = {
  eyebrow: string;
  description: string;
  items: FaqItem[];
  headingId: string;
  className?: string;
};

export function FaqSection({
  eyebrow,
  description,
  items,
  headingId,
  className = "",
}: FaqSectionProps) {
  return (
    <section
      aria-labelledby={headingId}
      className={className}
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-14">
        <div>
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mb-4 font-display text-3xl leading-tight font-bold text-[#2F2F2F] sm:text-4xl lg:text-[42px] dark:text-white"
          >
            Frequently Asked{" "}
            <span className="text-[#FF5FA2] italic">Questions</span>
          </h2>
          <p className="font-sans text-[13px] leading-relaxed text-[#9B8B97]">
            {description}
          </p>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <AccordionItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
