"use client";

import { useMemo, useState } from "react";

import { BlogArticlesGrid } from "@/components/blog/blog-articles-grid";
import { BlogCategories } from "@/components/blog/blog-categories";
import { FeaturedArticle } from "@/components/blog/featured-article";
import { Container } from "@/components/layout/container";
import { BlogEmptyState } from "@/components/shared/blog-empty-state";
import {
  filterPostsByCategory,
  getFeaturedPost,
  type BlogCategoryFilter,
} from "@/lib/blog/utils";
import type { BlogCategory, BlogPost } from "@/types";

type BlogPageContentProps = {
  posts: BlogPost[];
  categories: BlogCategory[];
};

export function BlogPageContent({ posts, categories }: BlogPageContentProps) {
  const [activeCategory, setActiveCategory] =
    useState<BlogCategoryFilter>("All");

  const featuredPost = useMemo(() => getFeaturedPost(posts), [posts]);

  const filteredPosts = useMemo(
    () =>
      filterPostsByCategory(posts, activeCategory, {
        excludeFeatured: activeCategory === "All",
      }),
    [posts, activeCategory]
  );

  if (posts.length === 0) {
    return (
      <Container className="py-10">
        <BlogEmptyState />
      </Container>
    );
  }

  return (
    <Container className="py-10">
      {activeCategory === "All" && featuredPost && (
        <FeaturedArticle post={featuredPost} />
      )}

      <BlogCategories
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <BlogArticlesGrid
        posts={filteredPosts}
        hasPostsInCatalog={posts.length > 0}
        activeCategory={activeCategory}
      />
    </Container>
  );
}
