import type { Metadata } from "next";

import { unsplashImage } from "@/lib/images";

import {
  DEFAULT_OG_IMAGE_PATH,
  DEFAULT_OG_UNSPLASH_ID,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  TWITTER_HANDLE,
} from "./constants";
import type {
  BlogPostMetadataInput,
  BrandMetadataInput,
  CategoryMetadataInput,
  PageMetadataOptions,
  ProductMetadataInput,
} from "./types";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

/** Resolves relative paths, Unsplash ids, or absolute URLs to a full OG image URL. */
export function resolveAbsoluteImageUrl(image?: string | null): string {
  if (!image) {
    return getDefaultOgImageUrl();
  }

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/")) {
    return `${SITE_URL}${image}`;
  }

  return unsplashImage(image, OG_WIDTH, OG_HEIGHT);
}

/** Default OG image — Unsplash hero when /public/og-default.png is not deployed. */
export function getDefaultOgImageUrl(): string {
  return unsplashImage(DEFAULT_OG_UNSPLASH_ID, OG_WIDTH, OG_HEIGHT);
}

function buildImageMetadata(imageUrl: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      images: [{ url: imageUrl, width: OG_WIDTH, height: OG_HEIGHT, alt: SITE_NAME }],
    },
    twitter: {
      images: [imageUrl],
    },
  };
}

function buildTwitterMetadata(
  title: string,
  description: string,
  overrides?: Metadata["twitter"]
): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    ...(TWITTER_HANDLE ? { site: `@${TWITTER_HANDLE}`, creator: `@${TWITTER_HANDLE}` } : {}),
    ...overrides,
  };
}

export function createPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  openGraph,
  twitter,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const imageUrl = image ? resolveAbsoluteImageUrl(image) : getDefaultOgImageUrl();
  const imageMeta = buildImageMetadata(imageUrl);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    ...(noIndex
      ? { robots: { index: false, follow: false } }
      : {}),
    openGraph: {
      title: fullTitle,
      description,
      url: `${SITE_URL}${canonicalPath}`,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      ...imageMeta.openGraph,
      ...openGraph,
    },
    twitter: buildTwitterMetadata(fullTitle, description, {
      ...imageMeta.twitter,
      ...twitter,
    }),
  };
}

export function createProductMetadata(product: ProductMetadataInput): Metadata {
  const description =
    product.description.trim() ||
    `Compare prices for ${product.name} by ${product.brand} across top beauty retailers.`;

  return createPageMetadata({
    title: product.name,
    description,
    path: `/products/${product.slug}`,
    image: product.image,
    openGraph: {
      type: "website",
    },
  });
}

export function createBrandMetadata(brand: BrandMetadataInput): Metadata {
  const description =
    brand.description.trim() ||
    brand.tagline.trim() ||
    `Explore ${brand.name} products and compare prices across leading beauty retailers.`;

  return createPageMetadata({
    title: brand.name,
    description,
    path: `/brands/${brand.slug}`,
    image: brand.image,
    openGraph: {
      description: brand.tagline || description,
    },
  });
}

export function createCategoryMetadata(category: CategoryMetadataInput): Metadata {
  const description =
    category.description?.trim() ||
    `Browse and compare ${category.name.toLowerCase()} products from top beauty retailers.`;

  return createPageMetadata({
    title: category.name,
    description,
    path: `/shop/${category.slug}`,
    image: category.image,
  });
}

export function createBlogPostMetadata(post: BlogPostMetadataInput): Metadata {
  const description =
    post.excerpt.trim() ||
    `Read ${post.title} on the Glowvelle Journal — beauty insights and expert guides.`;

  return createPageMetadata({
    title: post.title,
    description,
    path: `/blog/${post.slug}`,
    image: post.image,
    openGraph: {
      type: "article",
      authors: [post.author],
    },
  });
}
