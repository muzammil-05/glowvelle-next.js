"use client";

import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

import type { LegalSection } from "@/lib/mock/legal";
import { cn } from "@/lib/utils";

type LegalSidebarProps = {
  sections: LegalSection[];
};

export function LegalSidebar({ sections }: LegalSidebarProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (!element) {
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveId(section.id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return (
    <aside aria-label="Table of contents">
      <div className="rounded-2xl border border-[#FFD6E8] bg-white p-5 dark:border-[#3A2530] dark:bg-[#2A1520] sm:p-6 lg:sticky lg:top-24">
        <h2 className="mb-4 font-display text-[15px] font-bold text-[#2F2F2F] dark:text-white">
          Contents
        </h2>
        <nav className="space-y-1">
          {sections.map((section) => {
            const isActive = activeId === section.id;

            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 font-sans text-[12px] transition-all",
                  isActive
                    ? "bg-[#FFEAF4] font-semibold text-[#FF5FA2] dark:bg-[#3A2530]"
                    : "text-[#9B8B97] hover:bg-[#FFF9FC] hover:text-[#2F2F2F] dark:hover:bg-[#1A0D13] dark:hover:text-white"
                )}
              >
                <ChevronRight
                  size={12}
                  className={isActive ? "text-[#FF5FA2]" : "text-transparent"}
                  aria-hidden
                />
                {section.heading}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
