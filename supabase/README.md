# Glowvelle Supabase Migrations

Phase 18 MVP database schema for the Glowvelle catalog, affiliate tracking, blog, and newsletter.

## Migration files (run in order)

| Order | File | Purpose |
|-------|------|---------|
| 1 | `migrations/20260706000001_initial_schema.sql` | Extensions, enums, 14 tables, indexes, triggers, RLS |
| 2 | `migrations/20260706000002_seed_reference_data.sql` | Seed categories (6) and affiliate stores (4) |
| 3 | `migrations/20260706000003_dev_seed.sql` | Dev seed: brands, products, prices, affiliate links, blog |
| 4 | `migrations/20260706000004_admin_rls_policies.sql` | Admin RLS policies (`is_admin()`), `product-images` storage bucket |
| 5 | `migrations/20260706000005_admin_crud_rls.sql` | Admin CRUD for brands/categories/blog/newsletter, `site_settings`, `blog-images` bucket |

## Option A — Supabase Dashboard (SQL Editor)

1. Open your [Supabase project dashboard](https://supabase.com/dashboard).
2. Go to **SQL Editor** → **New query**.
3. Copy the full contents of `20260706000001_initial_schema.sql`, paste into the editor, and click **Run**.
4. Confirm success (no errors in the results panel).
5. Open a **New query**, paste `20260706000002_seed_reference_data.sql`, and click **Run**.
6. For local/dev UI testing, run `20260706000003_dev_seed.sql` the same way (safe to re-run — uses `ON CONFLICT` upserts).
7. Run `20260706000004_admin_rls_policies.sql` to enable admin CRUD policies and the `product-images` storage bucket.
8. Run `20260706000005_admin_crud_rls.sql` for Phase 30 admin CRUD (brands, categories, blog, newsletter, site settings).
9. Verify in **Table Editor**:
   - `categories` → 6 rows
   - `affiliate_stores` → 4 rows
   - After dev seed: `brands` → 20, `products` → 50, `blog_posts` → 20

> Run migrations in timestamp order. Re-running `20260706000002_seed_reference_data.sql` on an already-seeded database will fail on unique slug constraints. The dev seed (`20260706000003_dev_seed.sql`) is idempotent via upserts.

## Option B — Supabase CLI

### Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
- Logged in: `supabase login`
- Project linked from the `glowvelle` directory:

```bash
cd glowvelle
supabase link --project-ref YOUR_PROJECT_REF
```

### Apply migrations

```bash
supabase db push
```

This applies all pending files in `supabase/migrations/` in filename order.

### Local development (optional)

```bash
supabase start
supabase db reset   # applies migrations + any seed in supabase/seed.sql if added later
```

## Environment variables

Set these in your Next.js app (`.env.local`) after the database is ready:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key   # server-side only, never expose to client
```

Find URL and keys under **Project Settings → API** in the Supabase dashboard.

## Schema overview

- **Catalog:** `categories`, `brands`, `products`, `product_variants`, `product_images`, `product_tags`
- **Affiliate:** `affiliate_stores`, `affiliate_links`, `product_prices`, `affiliate_clicks`
- **Blog:** `blog_categories`, `blog_authors`, `blog_posts`
- **Newsletter:** `newsletter_subscribers`
- **Settings:** `site_settings` (Phase 30 — admin-managed key/value config)

Admin writes (products, brands, categories, blog, newsletter, settings) use the **service role** key in server actions (`lib/supabase/admin.ts`) with `requireAdmin()` guards. Migration `20260706000004` adds RLS policies for authenticated admin users (`app_metadata.role = 'admin'`) as defense-in-depth. Migration `20260706000005` extends admin CRUD to brands, categories, blog tables, newsletter management, and creates the `site_settings` table.

### Phase 29 — Product images storage

Migration `20260706000004` creates a public `product-images` bucket. Upload path pattern: `{productId}/{filename}`. Admin uploads go through `uploadProductImage` server action; public URLs are stored in `product_images.image_url`.

### Phase 30 — Blog images + site settings

Migration `20260706000005` creates a public `blog-images` bucket for featured images (optional — URL input also supported). The `site_settings` table stores `site_name`, `site_description`, `twitter_handle`, and `default_og_image`. Public pages still read from `config/site.ts` until a future phase wires DB settings.
