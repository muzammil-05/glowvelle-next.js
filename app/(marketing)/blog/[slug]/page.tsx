import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticleContent } from "@/components/blog/blog-article-content";
import { BlogArticleFaq } from "@/components/blog/blog-article-faq";
import { BlogArticleHeader } from "@/components/blog/blog-article-header";
import { BlogArticleMeta } from "@/components/blog/blog-article-meta";
import { BlogFeaturedImage } from "@/components/blog/blog-featured-image";
import { BlogRelatedArticles } from "@/components/blog/blog-related-articles";
import { BlogTableOfContents } from "@/components/blog/blog-table-of-contents";
import { Container } from "@/components/layout/container";
import { Breadcrumb } from "@/components/marketing/breadcrumb";
import { LazyNewsletter } from "@/components/marketing/lazy-newsletter";
import { getBlogSections } from "@/lib/blog/utils";
import {
  getBlogPostBySlug,
  getBlogStaticParams,
  getRelatedBlogPosts,
} from "@/lib/data";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  createBlogPostMetadata,
  createPageMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/config/site";

// ISR: editorial content; hourly refresh is sufficient.
export const revalidate = 3600;

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogStaticParams();
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Article Not Found",
      path: `/blog/${slug}`,
    });
  }

  return createBlogPostMetadata(post);
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const sections = getBlogSections(post);
  const relatedPosts = await getRelatedBlogPosts(
    post.id,
    post.categoryId,
    3
  );
  const pageUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <>
      <ArticleJsonLd post={post} pageUrl={pageUrl} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: post.title, url: pageUrl },
        ]}
      />
    <div className="min-h-screen bg-[#FFF9FC] dark:bg-[#1A0D13]">
      <BlogFeaturedImage post={post} />

      <Container className="py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <BlogArticleHeader post={post} />
        <BlogArticleMeta post={post} />

        {sections.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <BlogTableOfContents sections={sections} />
            </aside>
            <div className="min-w-0">
              <BlogArticleContent post={post} sections={sections} />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <BlogArticleContent post={post} sections={sections} />
          </div>
        )}

        {post.faq && post.faq.length > 0 && <BlogArticleFaq faq={post.faq} />}

        <BlogRelatedArticles posts={relatedPosts} category={post.category} />
      </Container>

      <LazyNewsletter />
    </div>
    </>
  );
}
