import type { Category, PopularCategory } from "@/types";

export function categoryToSlug(nameOrCategory: string | Category): string {
  if (typeof nameOrCategory === "object") {
    return nameOrCategory.slug;
  }

  return nameOrCategory.toLowerCase().replace(/\s+/g, "-");
}

export function getCategoryDescription(category: Category): string {
  if (category.description?.trim()) {
    return category.description.trim();
  }

  return `Explore ${category.count.toLocaleString()} premium ${category.name.toLowerCase()} products — curated from the world's finest beauty brands.`;
}

export function mapToPopularCategories(
  categories: Category[]
): PopularCategory[] {
  return categories.map((category) => ({
    name: category.name,
    icon: category.icon,
    slug: category.slug,
    count: category.count,
  }));
}
