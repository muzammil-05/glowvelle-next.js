/** Converts a display name into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/** Appends -2, -3, … until `isAvailable` returns false. */
export async function generateUniqueSlug(
  baseName: string,
  isAvailable: (slug: string) => Promise<boolean>,
  excludeId?: string,
): Promise<string> {
  const base = slugify(baseName) || "product"
  let candidate = base
  let suffix = 2

  while (!(await isAvailable(candidate))) {
    candidate = `${base}-${suffix}`
    suffix += 1

    if (suffix > 100) {
      candidate = `${base}-${crypto.randomUUID().slice(0, 8)}`
      break
    }
  }

  void excludeId
  return candidate
}
