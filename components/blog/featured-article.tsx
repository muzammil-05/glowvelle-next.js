import { BlogCard } from "@/components/blog/blog-card";
import type { BlogPost } from "@/types";

type FeaturedArticleProps = {
  post: BlogPost;
};

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  return (
    <section aria-labelledby="featured-article-heading" className="mb-8">
      <h2 id="featured-article-heading" className="sr-only">
        Featured article
      </h2>
      <BlogCard post={post} featured />
    </section>
  );
}
