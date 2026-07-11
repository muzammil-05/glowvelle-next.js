import type { Metadata } from "next";

import type { BlogPost, BrandData, Category, Product } from "@/types";

export type BreadcrumbItem = {
  name: string;
  url?: string;
};

export type PageMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: string | null;
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
  noIndex?: boolean;
};

export type ProductMetadataInput = Pick<
  Product,
  "name" | "description" | "slug" | "image" | "brand"
>;

export type BrandMetadataInput = Pick<
  BrandData,
  "name" | "description" | "tagline" | "slug" | "image"
>;

export type CategoryMetadataInput = Pick<
  Category,
  "name" | "slug" | "description" | "image"
>;

export type BlogPostMetadataInput = Pick<
  BlogPost,
  "title" | "excerpt" | "slug" | "image" | "author" | "date"
>;

export type JsonLdObject = Record<string, unknown>;
