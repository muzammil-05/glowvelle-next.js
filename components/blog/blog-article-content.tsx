import type { BlogPost, BlogSection } from "@/types";

type BlogArticleContentProps = {
  post: BlogPost;
  sections: BlogSection[];
};

type SectionWithParagraphMeta = {
  id: string;
  title: string;
  paragraphs: Array<{ paragraph: string; globalIndex: number }>;
};

function buildSectionsWithParagraphMeta(
  sections: BlogSection[]
): SectionWithParagraphMeta[] {
  return sections.reduce<{ items: SectionWithParagraphMeta[]; offset: number }>(
    (acc, section) => {
      const paragraphs = section.paragraphs.map((paragraph, localIndex) => ({
        paragraph,
        globalIndex: acc.offset + localIndex,
      }));

      return {
        offset: acc.offset + section.paragraphs.length,
        items: [
          ...acc.items,
          { id: section.id, title: section.title, paragraphs },
        ],
      };
    },
    { offset: 0, items: [] }
  ).items;
}

export function BlogArticleContent({ post, sections }: BlogArticleContentProps) {
  const sectionsWithParagraphMeta = buildSectionsWithParagraphMeta(sections);

  return (
    <div className="mt-0 max-w-3xl lg:mt-10">
      <p className="mb-6 font-display text-lg leading-relaxed text-[#2F2F2F] italic sm:mb-8 sm:text-[20px] dark:text-white">
        {post.excerpt}
      </p>

      {sectionsWithParagraphMeta.length > 0 &&
        sectionsWithParagraphMeta.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="mb-4 font-display text-xl font-bold text-[#2F2F2F] sm:mb-5 sm:text-2xl lg:text-[28px] dark:text-white">
              {section.title}
            </h2>
            {section.paragraphs.map(({ paragraph, globalIndex }) => {
              const isCallout = globalIndex === 2;

              return (
                <p
                  key={`${section.id}-${globalIndex}`}
                  className={`mb-5 font-sans text-[15px] leading-[1.9] text-[#2F2F2F] dark:text-white/75 ${
                    isCallout
                      ? "rounded-r-2xl border-l-4 border-[#FF5FA2] bg-[#FFEAF4] p-6 italic dark:bg-[#2A1520]"
                      : ""
                  }`}
                >
                  {paragraph}
                </p>
              );
            })}
          </section>
        ))}
    </div>
  );
}
