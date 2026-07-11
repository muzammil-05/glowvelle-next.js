import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";
import {
  getActiveCategories,
  getBlogStaticParams,
  getBrandStaticParams,
  getProductStaticParams,
} from "@/lib/data";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: SITE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
  { url: `${SITE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
  { url: `${SITE_URL}/brands`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  { url: `${SITE_URL}/deals`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
  { url: `${SITE_URL}/search`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  { url: `${SITE_URL}/affiliate`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, brands, blogPosts] = await Promise.all([
    getActiveCategories(),
    getProductStaticParams(),
    getBrandStaticParams(),
    getBlogStaticParams(),
  ]);

  const now = new Date();

  const categoryEntries: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/shop/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map(({ slug }) => ({
    url: `${SITE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const brandEntries: MetadataRoute.Sitemap = brands.map(({ slug }) => ({
    url: `${SITE_URL}/brands/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map(({ slug }) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...STATIC_ROUTES,
    ...categoryEntries,
    ...productEntries,
    ...brandEntries,
    ...blogEntries,
  ];
}
