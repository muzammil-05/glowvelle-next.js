import type { BlogPost, BlogSection } from "@/types";

export type BlogCategoryFilter = "All" | string;

export function getBlogHref(post: Pick<BlogPost, "slug">): string {
  return `/blog/${post.slug}`;
}

export function getFeaturedPost(posts: BlogPost[]): BlogPost | undefined {
  return posts.find((post) => post.featured);
}

export function filterPostsByCategory(
  posts: BlogPost[],
  category: BlogCategoryFilter,
  options: { excludeFeatured?: boolean } = {}
): BlogPost[] {
  const { excludeFeatured = false } = options;

  return posts.filter((post) => {
    if (excludeFeatured && post.featured) {
      return false;
    }

    if (category === "All") {
      return true;
    }

    return post.category === category;
  });
}

export function getCategoryPostCount(
  posts: BlogPost[],
  category: Exclude<BlogCategoryFilter, "All">
): number {
  return posts.filter((post) => post.category === category).length;
}

export function getBlogSections(post: BlogPost): BlogSection[] {
  if (post.sections?.length) {
    return post.sections;
  }

  if (post.content?.length) {
    return [
      {
        id: "article-content",
        title: "Overview",
        paragraphs: post.content,
      },
    ];
  }

  return [];
}
