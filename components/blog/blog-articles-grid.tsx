import { BlogCard } from "@/components/blog/blog-card";
import { SectionHeader } from "@/components/marketing/section-header";
import { BlogEmptyState } from "@/components/shared/blog-empty-state";
import type { BlogCategoryFilter } from "@/lib/blog/utils";
import type { BlogPost } from "@/types";

type BlogArticlesGridProps = {
  posts: BlogPost[];
  hasPostsInCatalog?: boolean;
  activeCategory?: BlogCategoryFilter;
};

export function BlogArticlesGrid({
  posts,
  hasPostsInCatalog = true,
  activeCategory = "All",
}: BlogArticlesGridProps) {
  return (
    <section aria-labelledby="latest-articles-heading">
      <SectionHeader
        eyebrow="From the Journal"
        heading="Latest Articles"
        className="mb-8"
      />

      {posts.length === 0 ? (
        hasPostsInCatalog && activeCategory !== "All" ? (
          <BlogEmptyState
            variant="inline"
            title="No articles in this category"
            description="Try another category or browse all articles to discover more from the Glowvelle Journal."
            actionHref="/blog"
            actionLabel="View All Articles"
          />
        ) : (
          <p className="font-sans text-[14px] text-[#9B8B97]">
            No articles found in this category.
          </p>
        )
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
