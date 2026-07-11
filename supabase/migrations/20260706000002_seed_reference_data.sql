-- Glowvelle Phase 18 MVP — Seed Reference Data
-- Seeds categories (6) and affiliate_stores (4) aligned with lib/mock/products.ts

-- ---------------------------------------------------------------------------
-- Categories (from CATEGORIES mock — icons, image IDs, display counts)
-- ---------------------------------------------------------------------------
INSERT INTO categories (name, slug, icon, image_url, sort_order, status, product_count)
VALUES
  ('Skincare',  'skincare',  '✨', 'photo-1779056904689-ff99fd0045a4', 1, 'active', 1240),
  ('Makeup',    'makeup',    '💄', 'photo-1631730486572-226d1f595b68', 2, 'active', 856),
  ('Haircare',  'haircare',  '🌿', 'photo-1758788390320-16e1f280cf49', 3, 'active', 432),
  ('Fragrance', 'fragrance', '🌸', 'photo-1608721279136-cd41b752fa41', 4, 'active', 287),
  ('Nail',      'nail',      '💅', 'photo-1676570092589-a6c09ecbb373', 5, 'active', 193),
  ('Tools',     'tools',     '🪄', 'photo-1596462502278-27bfdc403348', 6, 'active', 318);

-- ---------------------------------------------------------------------------
-- Affiliate stores (from StorePrice mock — names and brand colors)
-- ---------------------------------------------------------------------------
INSERT INTO affiliate_stores (name, slug, brand_color, is_active, sort_order)
VALUES
  ('Amazon',         'amazon',         '#FF9900', true, 1),
  ('Walmart',        'walmart',        '#0071CE', true, 2),
  ('eBay',           'ebay',           '#E53238', true, 3),
  ('Official Store', 'official-store', '#2F2F2F', true, 4);
