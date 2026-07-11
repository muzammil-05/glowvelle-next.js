import type { BlogPost, BrandData, Category, Product } from "@/types";

import { CONTACT, SEARCH_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./constants";
import { getDefaultOgImageUrl, resolveAbsoluteImageUrl } from "./metadata";
import type { BreadcrumbItem, JsonLdObject } from "./types";

type JsonLdScriptProps = {
  data: JsonLdObject | JsonLdObject[];
};

export function JsonLdScript({ data }: JsonLdScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function generateOrganizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: getDefaultOgImageUrl(),
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
  };
}

export function generateWebSiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}${SEARCH_PATH}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProductJsonLd(
  product: Product,
  pageUrl: string
): JsonLdObject {
  const offers = product.prices
    .filter((price) => price.inStock)
    .map((price) => ({
      "@type": "Offer",
      price: price.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: price.store,
      },
    }));

  const aggregateOffer =
    product.prices.length > 0
      ? {
          "@type": "AggregateOffer",
          lowPrice: product.bestPrice.toFixed(2),
          highPrice: product.originalPrice.toFixed(2),
          priceCurrency: "USD",
          offerCount: product.prices.length,
          offers: offers.length > 0 ? offers : undefined,
        }
      : {
          "@type": "Offer",
          price: product.bestPrice.toFixed(2),
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        };

  const jsonLd: JsonLdObject = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: resolveAbsoluteImageUrl(product.image),
    url: pageUrl,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: aggregateOffer,
  };

  if (product.reviews > 0 && product.rating > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviews,
      bestRating: "5",
      worstRating: "1",
    };
  }

  return jsonLd;
}

function parsePublishedDate(date: string): string | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}

export function generateArticleJsonLd(
  post: BlogPost,
  pageUrl: string
): JsonLdObject {
  const datePublished = parsePublishedDate(post.date);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: resolveAbsoluteImageUrl(post.image),
    url: pageUrl,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: getDefaultOgImageUrl(),
      },
    },
    ...(datePublished ? { datePublished } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function generateBrandJsonLd(
  brand: BrandData,
  pageUrl: string
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.description || brand.tagline,
    url: pageUrl,
    image: resolveAbsoluteImageUrl(brand.image),
    ...(brand.website
      ? { sameAs: [brand.website] }
      : {}),
  };
}

export function generateCategoryJsonLd(
  category: Category,
  pageUrl: string
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description:
      category.description?.trim() ||
      `Browse ${category.name.toLowerCase()} beauty products on ${SITE_NAME}.`,
    url: pageUrl,
    image: resolveAbsoluteImageUrl(category.image),
  };
}

export function OrganizationJsonLd() {
  return <JsonLdScript data={generateOrganizationJsonLd()} />;
}

export function WebSiteJsonLd() {
  return <JsonLdScript data={generateWebSiteJsonLd()} />;
}

export function ProductJsonLd({
  product,
  pageUrl,
}: {
  product: Product;
  pageUrl: string;
}) {
  return <JsonLdScript data={generateProductJsonLd(product, pageUrl)} />;
}

export function ArticleJsonLd({
  post,
  pageUrl,
}: {
  post: BlogPost;
  pageUrl: string;
}) {
  return <JsonLdScript data={generateArticleJsonLd(post, pageUrl)} />;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return <JsonLdScript data={generateBreadcrumbJsonLd(items)} />;
}

export function BrandJsonLd({
  brand,
  pageUrl,
}: {
  brand: BrandData;
  pageUrl: string;
}) {
  return <JsonLdScript data={generateBrandJsonLd(brand, pageUrl)} />;
}

export function CategoryJsonLd({
  category,
  pageUrl,
}: {
  category: Category;
  pageUrl: string;
}) {
  return <JsonLdScript data={generateCategoryJsonLd(category, pageUrl)} />;
}
