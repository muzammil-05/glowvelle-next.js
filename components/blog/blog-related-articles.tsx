import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/types";

type BlogRelatedArticlesProps = {
  posts: BlogPost[];
  category: string;
};

export function BlogRelatedArticles({ posts, category }: BlogRelatedArticlesProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-articles-heading" className="mt-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="mb-2.5 font-sans text-[11px] font-semibold tracking-[0.15em] text-[#FF5FA2] uppercase">
            Keep Reading
          </p>
          <h2
            id="related-articles-heading"
            className="font-display text-[42px] leading-tight font-bold text-[#2F2F2F] dark:text-white"
          >
            Related <span className="text-[#FF5FA2] italic">Articles</span>
          </h2>
        </div>
        <Link
          href="/blog"
          className="flex items-center gap-1.5 font-sans text-[13px] font-semibold text-[#FF5FA2] transition-all hover:gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5FA2]"
        >
          View All <ChevronRight size={15} aria-hidden />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      <p className="sr-only">More articles in {category}</p>
    </section>
  );
}
