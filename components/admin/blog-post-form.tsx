"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  createBlogPost,
  updateBlogPost,
  type BlogPostInput,
} from "@/lib/actions/admin-blog"
import type {
  AdminBlogPostDetail,
  AdminSelectOption,
} from "@/lib/data/admin-read"
import { slugify } from "@/lib/utils/slugify"
import type { BlogPostStatus } from "@/types/database"

const STATUS_OPTIONS: { value: BlogPostStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
]

const DEFAULT_CONTENT = {
  sections: [],
  faq: [],
  tags: [],
  paragraphs: [],
}

type BlogPostFormProps = {
  authors: AdminSelectOption[]
  categories: AdminSelectOption[]
  post?: AdminBlogPostDetail
}

export function BlogPostForm({ authors, categories, post }: BlogPostFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [slugTouched, setSlugTouched] = useState(Boolean(post))

  const [title, setTitle] = useState(post?.title ?? "")
  const [slug, setSlug] = useState(post?.slug ?? "")
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "")
  const [authorId, setAuthorId] = useState(
    post?.authorId ?? authors[0]?.id ?? "",
  )
  const [blogCategoryId, setBlogCategoryId] = useState(
    post?.blogCategoryId ?? categories[0]?.id ?? "",
  )
  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    post?.featuredImageUrl ?? "",
  )
  const [contentJson, setContentJson] = useState(() =>
    JSON.stringify(post?.content ?? DEFAULT_CONTENT, null, 2),
  )
  const [readTimeMinutes, setReadTimeMinutes] = useState(
    post?.readTimeMinutes != null ? String(post.readTimeMinutes) : "",
  )
  const [publishedAt, setPublishedAt] = useState(() => {
    if (!post?.publishedAt) return ""
    const d = new Date(post.publishedAt)
    return Number.isNaN(d.getTime())
      ? ""
      : d.toISOString().slice(0, 16)
  })
  const [isFeatured, setIsFeatured] = useState(post?.isFeatured ?? false)
  const [status, setStatus] = useState<BlogPostStatus>(post?.status ?? "draft")
  const [metaDescription, setMetaDescription] = useState(
    post?.metaDescription ?? "",
  )

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugTouched) {
      setSlug(slugify(value))
    }
  }

  const buildInput = (): BlogPostInput | { error: string } => {
    let content: unknown
    try {
      content = contentJson.trim()
        ? JSON.parse(contentJson)
        : DEFAULT_CONTENT
    } catch {
      return { error: "Content must be valid JSON." }
    }

    return {
      title,
      slug,
      excerpt: excerpt || null,
      authorId,
      blogCategoryId,
      featuredImageUrl: featuredImageUrl || null,
      content,
      readTimeMinutes: readTimeMinutes ? Number(readTimeMinutes) : null,
      publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
      isFeatured,
      status,
      metaDescription: metaDescription || null,
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)

    startTransition(async () => {
      const built = buildInput()
      if ("error" in built) {
        setError(built.error)
        return
      }

      if (post) {
        const result = await updateBlogPost(post.id, built)
        if (!result.success) {
          setError(result.error ?? "Failed to update blog post.")
          return
        }
        router.refresh()
      } else {
        const result = await createBlogPost(built)
        if (!result.success || !result.data) {
          setError(result.error ?? "Failed to create blog post.")
          return
        }
        router.push(`/admin/blog/${result.data.id}/edit`)
      }
    })
  }

  const selectClassName =
    "h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Post title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true)
              setSlug(e.target.value)
            }}
            required
            placeholder="post-slug"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as BlogPostStatus)}
            className={selectClassName}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <select
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className={selectClassName}
            required
          >
            <option value="" disabled>
              Select author
            </option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Blog category</Label>
          <select
            id="category"
            value={blogCategoryId}
            onChange={(e) => setBlogCategoryId(e.target.value)}
            className={selectClassName}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            placeholder="Short summary"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="featuredImageUrl">Featured image URL</Label>
          <Input
            id="featuredImageUrl"
            value={featuredImageUrl}
            onChange={(e) => setFeaturedImageUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="content">Content (JSON)</Label>
          <Textarea
            id="content"
            value={contentJson}
            onChange={(e) => setContentJson(e.target.value)}
            rows={12}
            className="font-mono text-xs"
            placeholder='{"sections":[],"faq":[],"tags":[],"paragraphs":[]}'
          />
          <p className="text-xs text-muted-foreground">
            JSON object with{" "}
            <code className="rounded bg-muted px-1">sections</code> (array of{" "}
            <code className="rounded bg-muted px-1">
              {"{ id, title, paragraphs[] }"}
            </code>
            ), <code className="rounded bg-muted px-1">faq</code>,{" "}
            <code className="rounded bg-muted px-1">tags</code>, and{" "}
            <code className="rounded bg-muted px-1">paragraphs</code>.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="readTimeMinutes">Read time (minutes)</Label>
          <Input
            id="readTimeMinutes"
            type="number"
            min={1}
            value={readTimeMinutes}
            onChange={(e) => setReadTimeMinutes(e.target.value)}
            placeholder="5"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="publishedAt">Published at</Label>
          <Input
            id="publishedAt"
            type="datetime-local"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="metaDescription">Meta description</Label>
          <Textarea
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            rows={2}
            placeholder="SEO meta description"
          />
        </div>

        <div className="flex items-center gap-2 sm:col-span-2">
          <input
            id="isFeatured"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="size-4 rounded border-input"
          />
          <Label htmlFor="isFeatured">Featured post</Label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : post ? "Save changes" : "Create post"}
        </Button>
      </div>
    </form>
  )
}
