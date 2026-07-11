import { createStaticClient } from "@/lib/supabase/static";
import type { BlogPostQueryRow } from "@/types/database";
import type { BlogPost, BlogSection, FaqItem } from "@/types";

import { handleDbError, safeQuery } from "./errors";
import type { GetPublishedBlogPostsOptions, PublicBlogPost } from "./types";
import { getRelation } from "./types";

const FALLBACK_IMAGE = "photo-1779056904689-ff99fd0045a4";
const FALLBACK_AVATAR = "photo-1551184451-76b762941ad6";

const BLOG_POST_SELECT = `
  id,
  author_id,
  blog_category_id,
  title,
  slug,
  excerpt,
  featured_image_url,
  content,
  read_time_minutes,
  published_at,
  is_featured,
  status,
  meta_description,
  created_at,
  blog_authors!inner(name, slug, avatar_url),
  blog_categories!inner(name, slug)
`;

export function normalizeBlogImage(imageUrl: string | null | undefined): string {
  if (!imageUrl) return FALLBACK_IMAGE;

  if (imageUrl.startsWith("http")) {
    const match = imageUrl.match(/photo-[a-zA-Z0-9-]+/);
    if (match) return match[0];
    return imageUrl;
  }

  return imageUrl;
}

function normalizeBlogAvatar(avatarUrl: string | null | undefined): string {
  if (!avatarUrl) return FALLBACK_AVATAR;
  return normalizeBlogImage(avatarUrl);
}

function formatPublishedDate(date: string | null): string {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatReadTime(minutes: number | null): string {
  if (!minutes || minutes <= 0) return "5 min read";
  return `${minutes} min read`;
}

function isBlogSection(value: unknown): value is BlogSection {
  if (!value || typeof value !== "object") return false;
  const section = value as Record<string, unknown>;
  return (
    typeof section.id === "string" &&
    typeof section.title === "string" &&
    Array.isArray(section.paragraphs) &&
    section.paragraphs.every((paragraph) => typeof paragraph === "string")
  );
}

function isFaqItem(value: unknown): value is FaqItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return typeof item.question === "string" && typeof item.answer === "string";
}

function parseBlogContent(content: unknown): {
  sections: BlogSection[];
  faq: FaqItem[];
  tags: string[];
  paragraphs: string[];
} {
  if (!content) {
    return { sections: [], faq: [], tags: [], paragraphs: [] };
  }

  if (Array.isArray(content)) {
    if (content.length === 0) {
      return { sections: [], faq: [], tags: [], paragraphs: [] };
    }

    if (typeof content[0] === "string") {
      return {
        sections: [],
        faq: [],
        tags: [],
        paragraphs: content.filter((item): item is string => typeof item === "string"),
      };
    }

    if (isBlogSection(content[0])) {
      return {
        sections: content.filter(isBlogSection),
        faq: [],
        tags: [],
        paragraphs: [],
      };
    }
  }

  if (typeof content === "object" && content !== null) {
    const record = content as Record<string, unknown>;

    const sections = Array.isArray(record.sections)
      ? record.sections.filter(isBlogSection)
      : [];
    const faq = Array.isArray(record.faq) ? record.faq.filter(isFaqItem) : [];
    const tags = Array.isArray(record.tags)
      ? record.tags.filter((tag): tag is string => typeof tag === "string")
      : [];

    const contentField = Array.isArray(record.content)
      ? record.content.filter((item): item is string => typeof item === "string")
      : [];
    const paragraphField = Array.isArray(record.paragraphs)
      ? record.paragraphs.filter((item): item is string => typeof item === "string")
      : [];

    return {
      sections,
      faq,
      tags,
      paragraphs: contentField.length > 0 ? contentField : paragraphField,
    };
  }

  return { sections: [], faq: [], tags: [], paragraphs: [] };
}

export function mapBlogPostRow(row: BlogPostQueryRow): BlogPost {
  const author = getRelation(row.blog_authors);
  const category = getRelation(row.blog_categories);
  const parsed = parseBlogContent(row.content);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? "",
    category: category?.name ?? "",
    categoryId: row.blog_category_id,
    image: normalizeBlogImage(row.featured_image_url),
    author: author?.name ?? "Glowvelle Editorial",
    authorAvatar: normalizeBlogAvatar(author?.avatar_url),
    date: formatPublishedDate(row.published_at),
    readTime: formatReadTime(row.read_time_minutes),
    tags: parsed.tags,
    featured: row.is_featured,
    content: parsed.paragraphs.length > 0 ? parsed.paragraphs : undefined,
    sections: parsed.sections.length > 0 ? parsed.sections : undefined,
    faq: parsed.faq.length > 0 ? parsed.faq : undefined,
  };
}

async function fetchPublishedBlogRows(
  options: GetPublishedBlogPostsOptions = {}
): Promise<BlogPostQueryRow[]> {
  const supabase = createStaticClient();
  let query = supabase
    .from("blog_posts")
    .select(BLOG_POST_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (options.featured === true) {
    query = query.eq("is_featured", true);
  }

  if (options.categorySlug) {
    query = query.eq("blog_categories.slug", options.categorySlug.toLowerCase());
  }

  const { data, error } = await query;

  if (handleDbError("fetchPublishedBlogRows", error)) return [];

  return (data as unknown as BlogPostQueryRow[]) ?? [];
}

/** Public read: published blog posts with optional category/featured filters. */
export async function getPublishedBlogPosts(
  options: GetPublishedBlogPostsOptions = {}
): Promise<PublicBlogPost[]> {
  return safeQuery("getPublishedBlogPosts", async () => {
    const rows = await fetchPublishedBlogRows(options);
    return rows.map(mapBlogPostRow);
  }, []);
}

/** Public read: single published blog post by slug. */
export async function getBlogPostBySlug(
  slug: string
): Promise<PublicBlogPost | null> {
  return safeQuery("getBlogPostBySlug", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_POST_SELECT)
      .eq("status", "published")
      .eq("slug", slug.toLowerCase())
      .maybeSingle();

    if (handleDbError("getBlogPostBySlug", error)) return null;
    if (!data) return null;

    return mapBlogPostRow(data as BlogPostQueryRow);
  }, null);
}

/** Public read: related posts in the same category. */
export async function getRelatedBlogPosts(
  postId: string,
  categoryId: string,
  limit = 3
): Promise<PublicBlogPost[]> {
  return safeQuery("getRelatedBlogPosts", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select(BLOG_POST_SELECT)
      .eq("status", "published")
      .eq("blog_category_id", categoryId)
      .neq("id", postId)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (handleDbError("getRelatedBlogPosts", error)) return [];
    if (!data?.length) return [];

    return (data as BlogPostQueryRow[]).map(mapBlogPostRow);
  }, []);
}

/** SSG helper: slugs for published blog posts. */
export async function getBlogStaticParams(): Promise<{ slug: string }[]> {
  return safeQuery("getBlogStaticParams", async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published");

    if (handleDbError("getBlogStaticParams", error)) return [];
    if (!data?.length) return [];

    return data.map((row) => ({ slug: row.slug }));
  }, []);
}
