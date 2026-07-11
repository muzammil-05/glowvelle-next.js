"use client";

import { useId, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionItemProps = {
  question: string;
  answer: string;
};

export function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className="overflow-hidden rounded-2xl border border-[#FFD6E8] dark:border-[#3A2530]">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-[#FFF9FC] focus-visible:ring-2 focus-visible:ring-[#FF5FA2] focus-visible:outline-none dark:hover:bg-[#1A0D13]"
      >
        <span className="pr-4 font-sans text-[14px] font-semibold text-[#2F2F2F] dark:text-white">
          {question}
        </span>
        {open ? (
          <ChevronUp size={16} className="shrink-0 text-[#FF5FA2]" aria-hidden />
        ) : (
          <ChevronDown size={16} className="shrink-0 text-[#9B8B97]" aria-hidden />
        )}
      </button>
      {open && (
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          className="border-t border-[#FFD6E8]/50 px-6 pt-4 pb-5 font-sans text-[13px] leading-relaxed text-[#9B8B97] dark:border-[#3A2530] dark:text-white/55"
        >
          {answer}
        </div>
      )}
    </div>
  );
}
