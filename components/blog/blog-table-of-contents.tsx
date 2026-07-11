import type { BlogSection } from "@/types";

type BlogTableOfContentsProps = {
  sections: BlogSection[];
};

export function BlogTableOfContents({ sections }: BlogTableOfContentsProps) {
  if (sections.length === 0) {
    return null;
  }

  return (
    <nav
      aria-labelledby="blog-toc-heading"
      className="mt-0 rounded-2xl border border-[#FFD6E8] bg-white p-5 dark:border-[#3A2530] dark:bg-[#2A1520] sm:p-6 lg:mt-8"
    >
      <h2
        id="blog-toc-heading"
        className="mb-4 font-display text-[18px] font-bold text-[#2F2F2F] dark:text-white"
      >
        Table of Contents
      </h2>
      <ol className="space-y-2.5">
        {sections.map((section, index) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="flex items-start gap-2 font-sans text-[13px] text-[#9B8B97] transition-colors hover:text-[#FF5FA2] focus-visible:text-[#FF5FA2] focus-visible:outline-none"
            >
              <span className="font-display text-[14px] font-bold text-[#FFD6E8] dark:text-[#3A2530]">
                {String(index + 1).padStart(2, "0")}
              </span>
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
