import type { MetadataRoute } from 'next';
import { createStaticClient } from '@/lib/supabase/static';
import { handleDbError, safeQuery } from '@/lib/data/errors';

export const revalidate = 604800; // 7 days in seconds

const BASE_URL = 'https://glowvelle.vercel.app';

function parseValidDate(dateStr: string | null | undefined): Date {
  if (!dateStr) return new Date();
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? new Date() : date;
}

function buildUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

async function getCategorySitemapEntries(): Promise<MetadataRoute.Sitemap> {
  return safeQuery('getCategorySitemapEntries', async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('categories')
      .select('slug, updated_at, created_at')
      .eq('status', 'active');

    if (handleDbError('getCategorySitemapEntries', error) || !data?.length) {
      return [];
    }

    return data
      .filter((item) => Boolean(item.slug))
      .map((item) => ({
        url: buildUrl(`/shop/${item.slug.toLowerCase()}`),
        lastModified: parseValidDate(item.updated_at || item.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
      }));
  }, []);
}

async function getProductSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  return safeQuery('getProductSitemapEntries', async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('products')
      .select('slug, updated_at, created_at')
      .eq('status', 'published');

    if (handleDbError('getProductSitemapEntries', error) || !data?.length) {
      return [];
    }

    return data
      .filter((item) => Boolean(item.slug))
      .map((item) => ({
        url: buildUrl(`/products/${item.slug.toLowerCase()}`),
        lastModified: parseValidDate(item.updated_at || item.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  }, []);
}

async function getBrandSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  return safeQuery('getBrandSitemapEntries', async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('brands')
      .select('slug, updated_at, created_at')
      .eq('status', 'active');

    if (handleDbError('getBrandSitemapEntries', error) || !data?.length) {
      return [];
    }

    return data
      .filter((item) => Boolean(item.slug))
      .map((item) => ({
        url: buildUrl(`/brands/${item.slug.toLowerCase()}`),
        lastModified: parseValidDate(item.updated_at || item.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }));
  }, []);
}

async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  return safeQuery('getBlogSitemapEntries', async () => {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at, created_at')
      .eq('status', 'published');

    if (handleDbError('getBlogSitemapEntries', error) || !data?.length) {
      return [];
    }

    return data
      .filter((item) => Boolean(item.slug))
      .map((item) => ({
        url: buildUrl(`/blog/${item.slug.toLowerCase()}`),
        lastModified: parseValidDate(item.published_at || item.updated_at || item.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      }));
  }, []);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: buildUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: buildUrl('/shop'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: buildUrl('/brands'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: buildUrl('/blog'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: buildUrl('/deals'),
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: buildUrl('/about'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: buildUrl('/contact'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: buildUrl('/privacy'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: buildUrl('/terms'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: buildUrl('/affiliate'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const [categories, products, brands, blogPosts] = await Promise.all([
    getCategorySitemapEntries(),
    getProductSitemapEntries(),
    getBrandSitemapEntries(),
    getBlogSitemapEntries(),
  ]);

  const allEntries = [
    ...staticRoutes,
    ...categories,
    ...products,
    ...brands,
    ...blogPosts,
  ];

  const seenUrls = new Set<string>();
  const uniqueEntries: MetadataRoute.Sitemap = [];

  for (const entry of allEntries) {
    if (!entry.url || seenUrls.has(entry.url)) {
      continue;
    }
    seenUrls.add(entry.url);
    uniqueEntries.push(entry);
  }

  return uniqueEntries;
}

