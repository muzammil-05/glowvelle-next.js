import type { Metadata } from "next";

import { BlogHero } from "@/components/blog/blog-hero";
import { BlogPageContent } from "@/components/blog/blog-page-content";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { getBlogCategories, getPublishedBlogPosts } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

// ISR: blog index; new posts appear within the revalidation window.
export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "The Glowvelle Journal",
  description:
    "Beauty insights, expert guides, and trend breakdowns on skincare, makeup, haircare, and fragrance from the Glowvelle editorial team.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getPublishedBlogPosts(),
    getBlogCategories(),
  ]);

  return (
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <BlogHero />
      <BlogPageContent posts={posts} categories={categories} />
      <LazyNewsletter />
    </div>
  );
}
