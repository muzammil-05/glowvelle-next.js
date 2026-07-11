-- Glowvelle Development Seed Data
-- Brands, products, variants, images, tags, prices, affiliate links, blog content
-- Depends on: 20260706000001_initial_schema.sql, 20260706000002_seed_reference_data.sql

BEGIN;

-- ---------------------------------------------------------------------------
-- Brands (20)
-- ---------------------------------------------------------------------------
INSERT INTO brands (name, slug, tagline, description, founded, country, image_url, website, instagram_followers, status)
VALUES
  ('Charlotte Tilbury', 'charlotte-tilbury', 'Give Everyone the Confidence to Be Their Most Beautiful Self', 'Luxury makeup and skincare founded by celebrity makeup artist Charlotte Tilbury.', '2013', 'United Kingdom', 'photo-1631730486572-226d1f595b68', 'https://www.charlottetilbury.com', '5.2M', 'active'),
  ('La Mer', 'la-mer', 'Miracle Broth for Radiant Skin', 'Prestige skincare rooted in sea kelp fermentation and transformative hydration.', '1965', 'United States', 'photo-1779056904689-ff99fd0045a4', 'https://www.cremedelamer.com', '2.1M', 'active'),
  ('NARS', 'nars', 'Unconventional Beauty', 'Bold color cosmetics and complexion products with artistic edge.', '1994', 'France', 'photo-1596462502278-27bfdc403348', 'https://www.narscosmetics.com', '4.8M', 'active'),
  ('Fenty Beauty', 'fenty-beauty', 'Beauty For All', 'Inclusive makeup line by Rihanna with extensive shade ranges.', '2017', 'United States', 'photo-1631730486572-226d1f595b68', 'https://fentybeauty.com', '12.4M', 'active'),
  ('Drunk Elephant', 'drunk-elephant', 'Biocompatible Skincare', 'Clean-clinical skincare free from the Suspicious 6 ingredients.', '2012', 'United States', 'photo-1779056904689-ff99fd0045a4', 'https://www.drunkelephant.com', '1.9M', 'active'),
  ('Olaplex', 'olaplex', 'Repair. Protect. Transform.', 'Bond-building haircare technology for damaged and color-treated hair.', '2014', 'United States', 'photo-1758788390320-16e1f280cf49', 'https://www.olaplex.com', '3.6M', 'active'),
  ('Dior', 'dior', 'The Art of French Beauty', 'Haute couture heritage meets luxury fragrance and cosmetics.', '1947', 'France', 'photo-1608721279136-cd41b752fa41', 'https://www.dior.com', '45M', 'active'),
  ('Chanel', 'chanel', 'Allure and Elegance', 'Iconic French house of fragrance, makeup, and skincare.', '1910', 'France', 'photo-1608721279136-cd41b752fa41', 'https://www.chanel.com', '52M', 'active'),
  ('Rare Beauty', 'rare-beauty', 'Your Imperfections Are What Make You Rare', 'Mental-health-focused beauty brand by Selena Gomez.', '2020', 'United States', 'photo-1631730486572-226d1f595b68', 'https://www.rarebeauty.com', '8.7M', 'active'),
  ('Glossier', 'glossier', 'Skin First. Makeup Second.', 'Minimalist beauty for dewy skin and effortless looks.', '2014', 'United States', 'photo-1779056904689-ff99fd0045a4', 'https://www.glossier.com', '2.8M', 'active'),
  ('Estee Lauder', 'estee-lauder', 'Every Woman Can Be Beautiful', 'Global prestige beauty leader in skincare, makeup, and fragrance.', '1946', 'United States', 'photo-1779056904689-ff99fd0045a4', 'https://www.esteelauder.com', '6.1M', 'active'),
  ('MAC Cosmetics', 'mac-cosmetics', 'All Ages, All Races, All Genders', 'Professional makeup artistry brand with cult-favorite products.', '1984', 'Canada', 'photo-1631730486572-226d1f595b68', 'https://www.maccosmetics.com', '22M', 'active'),
  ('OPI', 'opi', 'We Know Color', 'Professional nail lacquer and nail care since 1981.', '1981', 'United States', 'photo-1676570092589-a6c09ecbb373', 'https://www.opi.com', '4.2M', 'active'),
  ('Dyson', 'dyson', 'Engineered for Beauty', 'High-tech hair tools with intelligent heat control.', '1991', 'United Kingdom', 'photo-1596462502278-27bfdc403348', 'https://www.dyson.com', '1.4M', 'active'),
  ('Tom Ford Beauty', 'tom-ford-beauty', 'Private Blend Luxury', 'Sensual fragrances and sophisticated color cosmetics.', '2006', 'United States', 'photo-1608721279136-cd41b752fa41', 'https://www.tomford.com', '3.3M', 'active'),
  ('Laneige', 'laneige', 'Water Bank Hydration', 'K-beauty hydration specialists with Water Sleeping Mask cult status.', '1994', 'South Korea', 'photo-1779056904689-ff99fd0045a4', 'https://www.laneige.com', '1.7M', 'active'),
  ('Sol de Janeiro', 'sol-de-janeiro', 'Cheirosa Every Day', 'Brazilian-inspired body care with iconic Bum Bum Cream.', '2015', 'United States', 'photo-1779056904689-ff99fd0045a4', 'https://soldejaneiro.com', '2.4M', 'active'),
  ('Kylie Cosmetics', 'kylie-cosmetics', 'Kylie Jenner Beauty', 'Trendsetting lip kits and complexion products.', '2015', 'United States', 'photo-1631730486572-226d1f595b68', 'https://kyliecosmetics.com', '25M', 'active'),
  ('Benefit Cosmetics', 'benefit-cosmetics', 'Laughter Is the Best Cosmetic', 'Playful brow and face products from San Francisco.', '1976', 'United States', 'photo-1631730486572-226d1f595b68', 'https://www.benefitcosmetics.com', '7.5M', 'active'),
  ('Jo Malone London', 'jo-malone-london', 'Scent Your Story', 'British cologne house known for layering fragrances.', '1994', 'United Kingdom', 'photo-1608721279136-cd41b752fa41', 'https://www.jomalone.com', '1.8M', 'active')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  founded = EXCLUDED.founded,
  country = EXCLUDED.country,
  image_url = EXCLUDED.image_url,
  website = EXCLUDED.website,
  instagram_followers = EXCLUDED.instagram_followers,
  status = EXCLUDED.status;

-- ---------------------------------------------------------------------------
-- Products (50)
-- ---------------------------------------------------------------------------
INSERT INTO products (brand_id, category_id, name, slug, description, ingredients, rating, review_count, badge, badge_color, status)
VALUES
  ((SELECT id FROM brands WHERE slug = 'la-mer'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Crème de la Mer Moisturizing Cream', 'la-mer-creme-de-la-mer', 'Rich moisturizing cream with Miracle Broth for deep hydration and renewal.', 'Sea Kelp Ferment, Lime Tea, Glycerin, Mineral Oil, Petrolatum', 4.8, 2847, 'Bestseller', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'drunk-elephant'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Protini Polypeptide Cream', 'drunk-elephant-protini-cream', 'Signal peptide moisturizer that restores bounce and improves skin tone.', 'Water, Glycerin, Caprylic/Capric Triglyceride, Propanediol, Cetearyl Alcohol', 4.6, 1923, 'Clean', 'green', 'published'),
  ((SELECT id FROM brands WHERE slug = 'laneige'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Water Sleeping Mask', 'laneige-water-sleeping-mask', 'Overnight gel mask that delivers intense hydration while you sleep.', 'Water, Butylene Glycol, Cyclopentasiloxane, Glycerin, Trehalose', 4.7, 3456, 'K-Beauty', 'blue', 'published'),
  ((SELECT id FROM brands WHERE slug = 'estee-lauder'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Advanced Night Repair Serum', 'estee-lauder-advanced-night-repair', 'Iconic nighttime serum that reduces signs of aging and boosts radiance.', 'Water, Bifida Ferment Lysate, Pentylene Glycol, Sodium Hyaluronate', 4.5, 5678, 'Iconic', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'glossier'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Milky Jelly Cleanser', 'glossier-milky-jelly-cleanser', 'Gentle gel-oil cleanser that conditions skin without stripping.', 'Water, Disodium Laureth Sulfosuccinate, Glycerin, Rose Water', 4.4, 2134, 'Vegan', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'sol-de-janeiro'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Brazilian Bum Bum Cream', 'sol-de-janeiro-bum-bum-cream', 'Fast-absorbing body cream with guaraná extract and cheirosa 62 scent.', 'Water, Caprylic/Capric Triglyceride, Glycerin, Caffeine, Cupuaçu Butter', 4.8, 4521, 'Bestseller', 'orange', 'published'),
  ((SELECT id FROM brands WHERE slug = 'drunk-elephant'), (SELECT id FROM categories WHERE slug = 'skincare'), 'C-Firma Fresh Day Serum', 'drunk-elephant-c-firma-serum', 'Potent vitamin C serum with ferulic acid for bright, firm skin.', 'Water, Ascorbic Acid, Glycerin, Ferulic Acid, Sodium Hyaluronate', 4.5, 1678, 'Anti-Aging', 'green', 'published'),
  ((SELECT id FROM brands WHERE slug = 'laneige'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Lip Sleeping Mask', 'laneige-lip-sleeping-mask', 'Berry-scented overnight lip mask for soft, supple lips.', 'Diisostearyl Malate, Hydrogenated Polyisobutene, Shea Butter, Berry Extract', 4.9, 8901, 'Cult Favorite', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'la-mer'), (SELECT id FROM categories WHERE slug = 'skincare'), 'The Treatment Lotion', 'la-mer-treatment-lotion', 'Hydrating essence that preps skin and boosts absorption of treatments.', 'Water, Algae Extract, Glycerin, Sesame Seed Oil, Eucalyptus Oil', 4.6, 987, 'Luxury', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'estee-lauder'), (SELECT id FROM categories WHERE slug = 'skincare'), 'Revitalizing Supreme+ Cream', 'estee-lauder-revitalizing-supreme', 'Multi-action anti-aging cream powered by Moringa extract.', 'Water, Dimethicone, Glycerin, Moringa Seed Extract, Shea Butter', 4.4, 1234, 'Anti-Aging', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'charlotte-tilbury'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Pillow Talk Lipstick', 'charlotte-tilbury-pillow-talk-lipstick', 'Universally flattering nude-pink matte lipstick.', 'Octyldodecanol, Polyethylene, Microcrystalline Wax, Mica, Tocopherol', 4.8, 6789, 'Bestseller', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'fenty-beauty'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Pro Filt''r Soft Matte Foundation', 'fenty-pro-filtr-foundation', 'Longwear matte foundation with 50 inclusive shades.', 'Water, Dimethicone, Talc, Glycerin, Titanium Dioxide', 4.6, 5432, 'Inclusive', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'nars'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Radiant Creamy Concealer', 'nars-radiant-creamy-concealer', 'Multi-action concealer that brightens and corrects.', 'Water, Dimethicone, Glycerin, Titanium Dioxide, Iron Oxides', 4.7, 4321, 'Editor Pick', 'red', 'published'),
  ((SELECT id FROM brands WHERE slug = 'rare-beauty'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Soft Pinch Liquid Blush', 'rare-beauty-soft-pinch-blush', 'Weightless liquid blush for a natural flush of color.', 'Water, Dimethicone, Glycerin, Mica, Iron Oxides', 4.8, 7654, 'Viral', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'mac-cosmetics'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Ruby Woo Lipstick', 'mac-ruby-woo-lipstick', 'Retro matte lipstick in iconic blue-red shade.', 'Ricinus Communis Seed Oil, Ozokerite, Beeswax, Carnauba Wax, Mica', 4.9, 9876, 'Iconic', 'red', 'published'),
  ((SELECT id FROM brands WHERE slug = 'charlotte-tilbury'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Hollywood Flawless Filter', 'charlotte-tilbury-flawless-filter', 'Complexion booster for an airbrushed, lit-from-within glow.', 'Water, Dimethicone, Glycerin, Mica, Titanium Dioxide', 4.7, 3456, 'Glow', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'fenty-beauty'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Gloss Bomb Universal Lip Luminizer', 'fenty-gloss-bomb', 'Explosive shine lip gloss with nourishing shea butter.', 'Polybutene, Hydrogenated Polyisobutene, Mica, Shea Butter, Vitamin E', 4.8, 4567, 'Bestseller', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'benefit-cosmetics'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Hoola Matte Bronzer', 'benefit-hoola-bronzer', 'Silky matte bronzer for a sun-kissed, natural-looking tan.', 'Talc, Zinc Stearate, Ethylhexyl Palmitate, Mica, Iron Oxides', 4.6, 3210, 'Classic', 'orange', 'published'),
  ((SELECT id FROM brands WHERE slug = 'kylie-cosmetics'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Matte Lip Kit', 'kylie-matte-lip-kit', 'Long-lasting matte liquid lipstick with matching lip liner.', 'Isododecane, Trimethylsiloxysilicate, Dimethicone, Iron Oxides', 4.3, 5678, 'Trending', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'nars'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Orgasm Blush', 'nars-orgasm-blush', 'Peachy pink blush with golden shimmer for all skin tones.', 'Talc, Mica, Zinc Stearate, Iron Oxides, Titanium Dioxide', 4.8, 8901, 'Cult Favorite', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'rare-beauty'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Positive Light Silky Touch Highlighter', 'rare-beauty-positive-light-highlighter', 'Silky powder highlighter for a luminous, second-skin finish.', 'Mica, Synthetic Fluorphlogopite, Dimethicone, Titanium Dioxide', 4.7, 2345, 'Glow', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'mac-cosmetics'), (SELECT id FROM categories WHERE slug = 'makeup'), 'Studio Fix Fluid SPF 15', 'mac-studio-fix-fluid', 'Medium to full coverage foundation with matte finish.', 'Water, Cyclopentasiloxane, Titanium Dioxide, Glycerin, Iron Oxides', 4.5, 4567, 'Pro Favorite', 'red', 'published'),
  ((SELECT id FROM brands WHERE slug = 'olaplex'), (SELECT id FROM categories WHERE slug = 'haircare'), 'No.3 Hair Perfector', 'olaplex-no-3-hair-perfector', 'At-home bond-building treatment that reduces breakage.', 'Water, Bis-Aminopropyl Diglycol Dimaleate, Propylene Glycol', 4.8, 6789, 'Bestseller', 'blue', 'published'),
  ((SELECT id FROM brands WHERE slug = 'olaplex'), (SELECT id FROM categories WHERE slug = 'haircare'), 'No.4 Bond Maintenance Shampoo', 'olaplex-no-4-shampoo', 'Repairs and protects hair while cleansing gently.', 'Water, Sodium Lauroyl Methyl Isethionate, Cocamidopropyl Betaine', 4.7, 3456, 'Repair', 'blue', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dyson'), (SELECT id FROM categories WHERE slug = 'haircare'), 'Airwrap Multi-Styler Complete', 'dyson-airwrap-complete', 'Intelligent multi-styler that styles without extreme heat.', 'Engineered airflow system with Coanda effect technology', 4.6, 2345, 'Tech', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dyson'), (SELECT id FROM categories WHERE slug = 'haircare'), 'Supersonic Hair Dryer', 'dyson-supersonic-dryer', 'Fast-drying hair dryer with intelligent heat control.', 'Digital motor V9 with Air Multiplier technology', 4.7, 4567, 'Award Winner', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'olaplex'), (SELECT id FROM categories WHERE slug = 'haircare'), 'No.5 Bond Maintenance Conditioner', 'olaplex-no-5-conditioner', 'Hydrating conditioner that strengthens and smooths.', 'Water, Behentrimonium Chloride, Cetyl Alcohol, Glycerin', 4.6, 2890, 'Repair', 'blue', 'published'),
  ((SELECT id FROM brands WHERE slug = 'olaplex'), (SELECT id FROM categories WHERE slug = 'haircare'), 'No.7 Bonding Oil', 'olaplex-no-7-bonding-oil', 'Weightless styling oil that increases shine and softness.', 'Dimethicone, Isohexadecane, Bis-Aminopropyl Diglycol Dimaleate', 4.5, 1987, 'Shine', 'blue', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dyson'), (SELECT id FROM categories WHERE slug = 'haircare'), 'Corrale Straightener', 'dyson-corrale-straightener', 'Cordless straightener with flexing plates for less heat damage.', 'Flexing manganese copper alloy plates with intelligent heat control', 4.4, 876, 'Innovation', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'glossier'), (SELECT id FROM categories WHERE slug = 'haircare'), 'Balm Dotcom', 'glossier-balm-dotcom', 'Universal skin salve for lips, cuticles, and dry patches.', 'Petrolatum, Castor Seed Oil, Beeswax, Lanolin, Vitamin E', 4.6, 5432, 'Multi-Use', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dior'), (SELECT id FROM categories WHERE slug = 'fragrance'), 'Miss Dior Eau de Parfum', 'dior-miss-dior-edp', 'Romantic floral bouquet with Grasse rose and peony.', 'Alcohol, Parfum, Aqua, Limonene, Linalool, Benzyl Salicylate', 4.7, 3456, 'Luxury', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'chanel'), (SELECT id FROM categories WHERE slug = 'fragrance'), 'Chance Eau Tendre', 'chanel-chance-eau-tendre', 'Delicate floral-fruity fragrance with grapefruit and jasmine.', 'Alcohol, Parfum, Aqua, Limonene, Linalool, Citronellol', 4.8, 4567, 'Iconic', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'tom-ford-beauty'), (SELECT id FROM categories WHERE slug = 'fragrance'), 'Black Orchid Eau de Parfum', 'tom-ford-black-orchid', 'Luxurious dark floral with black truffle and ylang-ylang.', 'Alcohol, Parfum, Aqua, Limonene, Linalool, Coumarin', 4.6, 2345, 'Bold', 'black', 'published'),
  ((SELECT id FROM brands WHERE slug = 'jo-malone-london'), (SELECT id FROM categories WHERE slug = 'fragrance'), 'English Pear & Freesia Cologne', 'jo-malone-english-pear-freesia', 'Fresh fruity floral with ripe pear and white freesia.', 'Alcohol Denat., Aqua, Parfum, Limonene, Linalool, Citral', 4.7, 3210, 'Layering', 'green', 'published'),
  ((SELECT id FROM brands WHERE slug = 'sol-de-janeiro'), (SELECT id FROM categories WHERE slug = 'fragrance'), 'Cheirosa 62 Perfume Mist', 'sol-de-janeiro-cheirosa-62-mist', 'Warm pistachio and salted caramel body mist.', 'Alcohol Denat., Aqua, Parfum, Benzyl Salicylate, Limonene', 4.8, 5678, 'Bestseller', 'orange', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dior'), (SELECT id FROM categories WHERE slug = 'fragrance'), 'Sauvage Eau de Parfum', 'dior-sauvage-edp', 'Fresh and spicy masculine fragrance with bergamot and amber.', 'Alcohol, Parfum, Aqua, Limonene, Linalool, Coumarin', 4.5, 7890, 'Popular', 'blue', 'published'),
  ((SELECT id FROM brands WHERE slug = 'opi'), (SELECT id FROM categories WHERE slug = 'nail'), 'Bubble Bath Nail Lacquer', 'opi-bubble-bath-lacquer', 'Sheer nude-pink nail polish for a clean, natural manicure.', 'Ethyl Acetate, Butyl Acetate, Nitrocellulose, Isopropyl Alcohol', 4.7, 2345, 'Classic', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'opi'), (SELECT id FROM categories WHERE slug = 'nail'), 'Big Apple Red Nail Lacquer', 'opi-big-apple-red', 'Classic true red nail lacquer with high-gloss shine.', 'Ethyl Acetate, Butyl Acetate, Nitrocellulose, Dibutyl Phthalate', 4.8, 3456, 'Iconic', 'red', 'published'),
  ((SELECT id FROM brands WHERE slug = 'opi'), (SELECT id FROM categories WHERE slug = 'nail'), 'Princesses Rule! Nail Lacquer', 'opi-princesses-rule', 'Sparkly pink shimmer nail polish for a fairy-tale finish.', 'Ethyl Acetate, Butyl Acetate, Nitrocellulose, Mica, Titanium Dioxide', 4.6, 1876, 'Shimmer', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'opi'), (SELECT id FROM categories WHERE slug = 'nail'), 'Nature Strong Base Coat', 'opi-nature-strong-base-coat', 'Plant-based base coat that protects nails and extends wear.', 'Ethyl Acetate, Butyl Acetate, Nitrocellulose, Sugarcane Extract', 4.5, 987, 'Clean', 'green', 'published'),
  ((SELECT id FROM brands WHERE slug = 'opi'), (SELECT id FROM categories WHERE slug = 'nail'), 'ProSpa Nail & Cuticle Oil', 'opi-prospa-cuticle-oil', 'Nourishing cuticle oil with cupuaçu butter and grape seed oil.', 'Simmondsia Chinensis Seed Oil, Vitis Vinifera Seed Oil, Cupuaçu Butter', 4.7, 1543, 'Care', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dyson'), (SELECT id FROM categories WHERE slug = 'tools'), 'Airwrap Complete Long Barrel', 'dyson-airwrap-long-barrel', 'Long barrel attachments for the Airwrap multi-styler.', 'Engineered Coanda airflow attachments for longer hair', 4.6, 1234, 'Accessory', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'charlotte-tilbury'), (SELECT id FROM categories WHERE slug = 'tools'), 'Magic Complexion Brush', 'charlotte-tilbury-magic-brush', 'Dual-fiber foundation brush for flawless, airbrushed application.', 'Synthetic dual-fiber bristles with ergonomic handle', 4.7, 876, 'Pro Tool', 'gold', 'published'),
  ((SELECT id FROM brands WHERE slug = 'benefit-cosmetics'), (SELECT id FROM categories WHERE slug = 'tools'), 'Brow Styler Tool', 'benefit-brow-styler-tool', 'Dual-ended brow tool with spoolie and angled brush.', 'Synthetic bristles with rose gold ferrule', 4.5, 654, 'Essential', 'orange', 'published'),
  ((SELECT id FROM brands WHERE slug = 'fenty-beauty'), (SELECT id FROM categories WHERE slug = 'tools'), 'Precision Makeup Sponge', 'fenty-precision-sponge', 'Teardrop sponge with flat edge for seamless blending.', 'Hydrophilic polyurethane foam, latex-free', 4.6, 2345, 'Bestseller', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'nars'), (SELECT id FROM categories WHERE slug = 'tools'), 'Radiance Primer Brush', 'nars-radiance-primer-brush', 'Dense brush for even primer and skincare application.', 'Synthetic Taklon bristles with weighted handle', 4.4, 432, 'Pro Tool', 'red', 'published'),
  ((SELECT id FROM brands WHERE slug = 'mac-cosmetics'), (SELECT id FROM categories WHERE slug = 'tools'), '187 Slant Powder Brush', 'mac-187-slant-brush', 'Professional slanted powder brush for contour and blush.', 'Natural and synthetic blend bristles', 4.8, 1567, 'Pro Favorite', 'red', 'published'),
  ((SELECT id FROM brands WHERE slug = 'glossier'), (SELECT id FROM categories WHERE slug = 'tools'), 'Cloud Paint Brush Set', 'glossier-cloud-paint-brush', 'Mini brush set designed for cream blush application.', 'Synthetic cruelty-free bristles', 4.3, 789, 'Set', 'pink', 'published'),
  ((SELECT id FROM brands WHERE slug = 'dyson'), (SELECT id FROM categories WHERE slug = 'tools'), 'Airstrait Straightener', 'dyson-airstrait', 'Wet-to-dry straightener that dries and straightens simultaneously.', 'Intelligent heat control with airflow straightening', 4.5, 567, 'Innovation', 'purple', 'published'),
  ((SELECT id FROM brands WHERE slug = 'charlotte-tilbury'), (SELECT id FROM categories WHERE slug = 'tools'), 'Filmstar Bronze & Glow Palette Brush', 'charlotte-tilbury-filmstar-brush', 'Angled brush for bronzer and highlighter application.', 'Premium synthetic bristles with gold ferrule', 4.6, 345, 'Luxury', 'gold', 'published')
ON CONFLICT (slug) DO UPDATE SET
  brand_id = EXCLUDED.brand_id,
  category_id = EXCLUDED.category_id,
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count,
  badge = EXCLUDED.badge,
  badge_color = EXCLUDED.badge_color,
  status = EXCLUDED.status;

-- ---------------------------------------------------------------------------
-- Product variants (default + shade/size where applicable)
-- ---------------------------------------------------------------------------
INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'LAMERCREMEDELAMERDEF', true, 0
FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DRUNKELEPHANTPROTINICDEF', true, 0
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'LANEIGEWATERSLEEPINGMDEF', true, 0
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'ESTEELAUDERADVANCEDNIDEF', true, 0
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'GLOSSIERMILKYJELLYCLEDEF', true, 0
FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'SOLDEJANEIROBUMBUMCDEF', true, 0
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DRUNKELEPHANTCFIRMASDEF', true, 0
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Berry', 'LANEIGELIPSLEEPING0', true, 0
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Berry');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Grapefruit', 'LANEIGELIPSLEEPING1', false, 1
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Grapefruit');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Apple Lime', 'LANEIGELIPSLEEPING2', false, 2
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Apple Lime');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'LAMERTREATMENTLOTIONDEF', true, 0
FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'ESTEELAUDERREVITALIZINDEF', true, 0
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Pillow Talk Original', 'CHARLOTTETILBURYPI0', true, 0
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Pillow Talk Original');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Pillow Talk Medium', 'CHARLOTTETILBURYPI1', false, 1
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Pillow Talk Medium');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Pillow Talk Intense', 'CHARLOTTETILBURYPI2', false, 2
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Pillow Talk Intense');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Shade 100', 'FENTYPROFILTRFOUN0', false, 0
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Shade 100');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Shade 290', 'FENTYPROFILTRFOUN1', true, 1
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Shade 290');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Shade 420', 'FENTYPROFILTRFOUN2', false, 2
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Shade 420');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Shade 498', 'FENTYPROFILTRFOUN3', false, 3
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Shade 498');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Vanilla', 'NARSRADIANTCREAMY0', false, 0
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Vanilla');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Custard', 'NARSRADIANTCREAMY1', true, 1
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Custard');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Ginger', 'NARSRADIANTCREAMY2', false, 2
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Ginger');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Cafe Con Leche', 'NARSRADIANTCREAMY3', false, 3
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Cafe Con Leche');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Happy', 'RAREBEAUTYSOFTPIN0', false, 0
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Happy');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Bliss', 'RAREBEAUTYSOFTPIN1', true, 1
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Bliss');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Hope', 'RAREBEAUTYSOFTPIN2', false, 2
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Hope');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Encourage', 'RAREBEAUTYSOFTPIN3', false, 3
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Encourage');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Ruby Woo', 'MACRUBYWOOLIPSTIC0', true, 0
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Ruby Woo');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'CHARLOTTETILBURYFLAWLEDEF', true, 0
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'FENTYGLOSSBOMBDEF', true, 0
FROM products p WHERE p.slug = 'fenty-gloss-bomb'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'BENEFITHOOLABRONZERDEF', true, 0
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'KYLIEMATTELIPKITDEF', true, 0
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'NARSORGASMBLUSHDEF', true, 0
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'RAREBEAUTYPOSITIVELIGDEF', true, 0
FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'MACSTUDIOFIXFLUIDDEF', true, 0
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '100ml', 'OLAPLEXNO3HAIRPE0', true, 0
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '100ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '250ml', 'OLAPLEXNO3HAIRPE1', false, 1
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '250ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OLAPLEXNO4SHAMPOODEF', true, 0
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DYSONAIRWRAPCOMPLETEDEF', true, 0
FROM products p WHERE p.slug = 'dyson-airwrap-complete'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DYSONSUPERSONICDRYERDEF', true, 0
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OLAPLEXNO5CONDITIONERDEF', true, 0
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OLAPLEXNO7BONDINGOILDEF', true, 0
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DYSONCORRALESTRAIGHTENDEF', true, 0
FROM products p WHERE p.slug = 'dyson-corrale-straightener'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'GLOSSIERBALMDOTCOMDEF', true, 0
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '30ml', 'DIORMISSDIOREDP0', false, 0
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '30ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '50ml', 'DIORMISSDIOREDP1', true, 1
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '50ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '100ml', 'DIORMISSDIOREDP2', false, 2
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '100ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '35ml', 'CHANELCHANCEEAUTE0', false, 0
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '35ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '50ml', 'CHANELCHANCEEAUTE1', true, 1
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '50ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, '100ml', 'CHANELCHANCEEAUTE2', false, 2
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = '100ml');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'TOMFORDBLACKORCHIDDEF', true, 0
FROM products p WHERE p.slug = 'tom-ford-black-orchid'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'JOMALONEENGLISHPEARFDEF', true, 0
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'SOLDEJANEIROCHEIROSADEF', true, 0
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DIORSAUVAGEEDPDEF', true, 0
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Standard', 'OPIBUBBLEBATHLACQ0', true, 0
FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.name = 'Standard');

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OPIBIGAPPLEREDDEF', true, 0
FROM products p WHERE p.slug = 'opi-big-apple-red'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OPIPRINCESSESRULEDEF', true, 0
FROM products p WHERE p.slug = 'opi-princesses-rule'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OPINATURESTRONGBASECDEF', true, 0
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'OPIPROSPACUTICLEOILDEF', true, 0
FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DYSONAIRWRAPLONGBARREDEF', true, 0
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'CHARLOTTETILBURYMAGICDEF', true, 0
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'BENEFITBROWSTYLERTOOLDEF', true, 0
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'FENTYPRECISIONSPONGEDEF', true, 0
FROM products p WHERE p.slug = 'fenty-precision-sponge'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'NARSRADIANCEPRIMERBRUDEF', true, 0
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'MAC187SLANTBRUSHDEF', true, 0
FROM products p WHERE p.slug = 'mac-187-slant-brush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'GLOSSIERCLOUDPAINTBRUDEF', true, 0
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'DYSONAIRSTRAITDEF', true, 0
FROM products p WHERE p.slug = 'dyson-airstrait'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

INSERT INTO product_variants (product_id, name, sku, is_default, sort_order)
SELECT p.id, 'Default', 'CHARLOTTETILBURYFILMSTDEF', true, 0
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
AND NOT EXISTS (SELECT 1 FROM product_variants pv WHERE pv.product_id = p.id AND pv.is_default = true);

-- ---------------------------------------------------------------------------
-- Product images (primary + gallery)
-- ---------------------------------------------------------------------------
INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Crème de la Mer Moisturizing Cream - primary', 0, true
FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Crème de la Mer Moisturizing Cream - alternate view', 1, false
FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Crème de la Mer Moisturizing Cream - detail', 2, false
FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Protini Polypeptide Cream - primary', 0, true
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Protini Polypeptide Cream - alternate view', 1, false
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Water Sleeping Mask - primary', 0, true
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Water Sleeping Mask - alternate view', 1, false
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Advanced Night Repair Serum - primary', 0, true
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Advanced Night Repair Serum - alternate view', 1, false
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Advanced Night Repair Serum - detail', 2, false
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Milky Jelly Cleanser - primary', 0, true
FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Milky Jelly Cleanser - alternate view', 1, false
FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Brazilian Bum Bum Cream - primary', 0, true
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Brazilian Bum Bum Cream - alternate view', 1, false
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'C-Firma Fresh Day Serum - primary', 0, true
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'C-Firma Fresh Day Serum - alternate view', 1, false
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'C-Firma Fresh Day Serum - detail', 2, false
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Lip Sleeping Mask - primary', 0, true
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Lip Sleeping Mask - alternate view', 1, false
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'The Treatment Lotion - primary', 0, true
FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'The Treatment Lotion - alternate view', 1, false
FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Revitalizing Supreme+ Cream - primary', 0, true
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Revitalizing Supreme+ Cream - alternate view', 1, false
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Revitalizing Supreme+ Cream - detail', 2, false
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Pillow Talk Lipstick - primary', 0, true
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Pillow Talk Lipstick - alternate view', 1, false
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Pro Filt''r Soft Matte Foundation - primary', 0, true
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Pro Filt''r Soft Matte Foundation - alternate view', 1, false
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Radiant Creamy Concealer - primary', 0, true
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Radiant Creamy Concealer - alternate view', 1, false
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Radiant Creamy Concealer - detail', 2, false
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Soft Pinch Liquid Blush - primary', 0, true
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Soft Pinch Liquid Blush - alternate view', 1, false
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Ruby Woo Lipstick - primary', 0, true
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Ruby Woo Lipstick - alternate view', 1, false
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Hollywood Flawless Filter - primary', 0, true
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Hollywood Flawless Filter - alternate view', 1, false
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Hollywood Flawless Filter - detail', 2, false
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Gloss Bomb Universal Lip Luminizer - primary', 0, true
FROM products p WHERE p.slug = 'fenty-gloss-bomb'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Gloss Bomb Universal Lip Luminizer - alternate view', 1, false
FROM products p WHERE p.slug = 'fenty-gloss-bomb'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Hoola Matte Bronzer - primary', 0, true
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Hoola Matte Bronzer - alternate view', 1, false
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Matte Lip Kit - primary', 0, true
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Matte Lip Kit - alternate view', 1, false
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Matte Lip Kit - detail', 2, false
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Orgasm Blush - primary', 0, true
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Orgasm Blush - alternate view', 1, false
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Positive Light Silky Touch Highlighter - primary', 0, true
FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Positive Light Silky Touch Highlighter - alternate view', 1, false
FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Studio Fix Fluid SPF 15 - primary', 0, true
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Studio Fix Fluid SPF 15 - alternate view', 1, false
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Studio Fix Fluid SPF 15 - detail', 2, false
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'No.3 Hair Perfector - primary', 0, true
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'No.3 Hair Perfector - alternate view', 1, false
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'No.4 Bond Maintenance Shampoo - primary', 0, true
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'No.4 Bond Maintenance Shampoo - alternate view', 1, false
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Airwrap Multi-Styler Complete - primary', 0, true
FROM products p WHERE p.slug = 'dyson-airwrap-complete'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Airwrap Multi-Styler Complete - alternate view', 1, false
FROM products p WHERE p.slug = 'dyson-airwrap-complete'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Airwrap Multi-Styler Complete - detail', 2, false
FROM products p WHERE p.slug = 'dyson-airwrap-complete'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Supersonic Hair Dryer - primary', 0, true
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Supersonic Hair Dryer - alternate view', 1, false
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'No.5 Bond Maintenance Conditioner - primary', 0, true
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'No.5 Bond Maintenance Conditioner - alternate view', 1, false
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'No.7 Bonding Oil - primary', 0, true
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'No.7 Bonding Oil - alternate view', 1, false
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'No.7 Bonding Oil - detail', 2, false
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Corrale Straightener - primary', 0, true
FROM products p WHERE p.slug = 'dyson-corrale-straightener'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Corrale Straightener - alternate view', 1, false
FROM products p WHERE p.slug = 'dyson-corrale-straightener'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Balm Dotcom - primary', 0, true
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Balm Dotcom - alternate view', 1, false
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Miss Dior Eau de Parfum - primary', 0, true
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Miss Dior Eau de Parfum - alternate view', 1, false
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Miss Dior Eau de Parfum - detail', 2, false
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Chance Eau Tendre - primary', 0, true
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Chance Eau Tendre - alternate view', 1, false
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Black Orchid Eau de Parfum - primary', 0, true
FROM products p WHERE p.slug = 'tom-ford-black-orchid'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Black Orchid Eau de Parfum - alternate view', 1, false
FROM products p WHERE p.slug = 'tom-ford-black-orchid'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'English Pear & Freesia Cologne - primary', 0, true
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'English Pear & Freesia Cologne - alternate view', 1, false
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'English Pear & Freesia Cologne - detail', 2, false
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Cheirosa 62 Perfume Mist - primary', 0, true
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Cheirosa 62 Perfume Mist - alternate view', 1, false
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Sauvage Eau de Parfum - primary', 0, true
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Sauvage Eau de Parfum - alternate view', 1, false
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Bubble Bath Nail Lacquer - primary', 0, true
FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Bubble Bath Nail Lacquer - alternate view', 1, false
FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Bubble Bath Nail Lacquer - detail', 2, false
FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Big Apple Red Nail Lacquer - primary', 0, true
FROM products p WHERE p.slug = 'opi-big-apple-red'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Big Apple Red Nail Lacquer - alternate view', 1, false
FROM products p WHERE p.slug = 'opi-big-apple-red'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Princesses Rule! Nail Lacquer - primary', 0, true
FROM products p WHERE p.slug = 'opi-princesses-rule'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Princesses Rule! Nail Lacquer - alternate view', 1, false
FROM products p WHERE p.slug = 'opi-princesses-rule'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Nature Strong Base Coat - primary', 0, true
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Nature Strong Base Coat - alternate view', 1, false
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Nature Strong Base Coat - detail', 2, false
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'ProSpa Nail & Cuticle Oil - primary', 0, true
FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'ProSpa Nail & Cuticle Oil - alternate view', 1, false
FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Airwrap Complete Long Barrel - primary', 0, true
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Airwrap Complete Long Barrel - alternate view', 1, false
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Magic Complexion Brush - primary', 0, true
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Magic Complexion Brush - alternate view', 1, false
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Magic Complexion Brush - detail', 2, false
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Brow Styler Tool - primary', 0, true
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Brow Styler Tool - alternate view', 1, false
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Precision Makeup Sponge - primary', 0, true
FROM products p WHERE p.slug = 'fenty-precision-sponge'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Precision Makeup Sponge - alternate view', 1, false
FROM products p WHERE p.slug = 'fenty-precision-sponge'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1608721279136-cd41b752fa41', 'Radiance Primer Brush - primary', 0, true
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', 'Radiance Primer Brush - alternate view', 1, false
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Radiance Primer Brush - detail', 2, false
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1676570092589-a6c09ecbb373', '187 Slant Powder Brush - primary', 0, true
FROM products p WHERE p.slug = 'mac-187-slant-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', '187 Slant Powder Brush - alternate view', 1, false
FROM products p WHERE p.slug = 'mac-187-slant-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1596462502278-27bfdc403348', 'Cloud Paint Brush Set - primary', 0, true
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Cloud Paint Brush Set - alternate view', 1, false
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1779056904689-ff99fd0045a4', 'Airstrait Straightener - primary', 0, true
FROM products p WHERE p.slug = 'dyson-airstrait'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Airstrait Straightener - alternate view', 1, false
FROM products p WHERE p.slug = 'dyson-airstrait'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Airstrait Straightener - detail', 2, false
FROM products p WHERE p.slug = 'dyson-airstrait'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 2);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1631730486572-226d1f595b68', 'Filmstar Bronze & Glow Palette Brush - primary', 0, true
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.is_primary = true);

INSERT INTO product_images (product_id, image_url, alt_text, sort_order, is_primary)
SELECT p.id, 'photo-1758788390320-16e1f280cf49', 'Filmstar Bronze & Glow Palette Brush - alternate view', 1, false
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
AND NOT EXISTS (SELECT 1 FROM product_images pi WHERE pi.product_id = p.id AND pi.sort_order = 1);

-- ---------------------------------------------------------------------------
-- Product tags (2-4 per product)
-- ---------------------------------------------------------------------------
INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'hydrating' FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'anti-aging' FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'vegan' FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'clean' FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'gentle' FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'daily-use' FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'k-beauty' FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'overnight' FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'hydrating' FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cult-favorite' FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'serum' FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'anti-aging' FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'nighttime' FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'vegan' FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cleanser' FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'gentle' FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'sensitive-skin' FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'body-care' FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'hydrating' FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cruelty-free' FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'vitamin-c' FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brightening' FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'anti-aging' FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'clean' FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'lip-care' FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'overnight' FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'k-beauty' FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'essence' FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'hydrating' FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'pre-treatment' FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'anti-aging' FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'moisturizer' FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'firming' FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'lipstick' FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'nude' FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'matte' FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'foundation' FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'inclusive' FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'matte' FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'longwear' FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'concealer' FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brightening' FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'full-coverage' FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'editor-pick' FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'blush' FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'liquid' FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'buildable' FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'viral' FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'lipstick' FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'matte' FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'iconic' FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'red' FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'highlighter' FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'glow' FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'complexion' FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'lip-gloss' FROM products p WHERE p.slug = 'fenty-gloss-bomb'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'fenty-gloss-bomb'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'shine' FROM products p WHERE p.slug = 'fenty-gloss-bomb'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'universal' FROM products p WHERE p.slug = 'fenty-gloss-bomb'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bronzer' FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'matte' FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'contour' FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'classic' FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'lip-kit' FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'matte' FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'longwear' FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'trending' FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'blush' FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'shimmer' FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cult-favorite' FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'peachy' FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'highlighter' FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'powder' FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'glow' FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'buildable' FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'foundation' FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'matte' FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'full-coverage' FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'spf' FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bond-repair' FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'treatment' FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'salon-quality' FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'shampoo' FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bond-repair' FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'color-safe' FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'gentle' FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'styler' FROM products p WHERE p.slug = 'dyson-airwrap-complete'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'heat-free' FROM products p WHERE p.slug = 'dyson-airwrap-complete'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'multi-use' FROM products p WHERE p.slug = 'dyson-airwrap-complete'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'tech' FROM products p WHERE p.slug = 'dyson-airwrap-complete'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'dryer' FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'fast-drying' FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'heat-control' FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'award-winner' FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'conditioner' FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bond-repair' FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'hydrating' FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'smooth' FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'styling-oil' FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'shine' FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'frizz-control' FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'lightweight' FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'straightener' FROM products p WHERE p.slug = 'dyson-corrale-straightener'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cordless' FROM products p WHERE p.slug = 'dyson-corrale-straightener'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'heat-control' FROM products p WHERE p.slug = 'dyson-corrale-straightener'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'innovation' FROM products p WHERE p.slug = 'dyson-corrale-straightener'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'multi-use' FROM products p WHERE p.slug = 'glossier-balm-dotcom'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'balm' FROM products p WHERE p.slug = 'glossier-balm-dotcom'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'hydrating' FROM products p WHERE p.slug = 'glossier-balm-dotcom'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'travel-friendly' FROM products p WHERE p.slug = 'glossier-balm-dotcom'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'floral' FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'gift-worthy' FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'romantic' FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'floral-fruity' FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'iconic' FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'fresh' FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'feminine' FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'dark-floral' FROM products p WHERE p.slug = 'tom-ford-black-orchid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'tom-ford-black-orchid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'evening' FROM products p WHERE p.slug = 'tom-ford-black-orchid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'unisex' FROM products p WHERE p.slug = 'tom-ford-black-orchid'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'fruity-floral' FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'layering' FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'fresh' FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'spring' FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'body-mist' FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'warm' FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'gourmand' FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'fresh' FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'spicy' FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'masculine' FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'popular' FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'sheer' FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'nude' FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'classic' FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'everyday' FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'red' FROM products p WHERE p.slug = 'opi-big-apple-red'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'iconic' FROM products p WHERE p.slug = 'opi-big-apple-red'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cream' FROM products p WHERE p.slug = 'opi-big-apple-red'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'holiday' FROM products p WHERE p.slug = 'opi-big-apple-red'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'shimmer' FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'pink' FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'party' FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'fun' FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'base-coat' FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'clean' FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'plant-based' FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'longwear' FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cuticle-oil' FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'nail-care' FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'nourishing' FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'spa' FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'accessory' FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'styler' FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'long-hair' FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'dyson' FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brush' FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'foundation' FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'pro-tool' FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brow' FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'dual-ended' FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'essential' FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'precision' FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'sponge' FROM products p WHERE p.slug = 'fenty-precision-sponge'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'blending' FROM products p WHERE p.slug = 'fenty-precision-sponge'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bestseller' FROM products p WHERE p.slug = 'fenty-precision-sponge'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'latex-free' FROM products p WHERE p.slug = 'fenty-precision-sponge'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brush' FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'primer' FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'pro-tool' FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'dense' FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brush' FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'powder' FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'contour' FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'pro-favorite' FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brush-set' FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'blush' FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'cream' FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'mini' FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'straightener' FROM products p WHERE p.slug = 'dyson-airstrait'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'wet-to-dry' FROM products p WHERE p.slug = 'dyson-airstrait'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'innovation' FROM products p WHERE p.slug = 'dyson-airstrait'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'dyson' FROM products p WHERE p.slug = 'dyson-airstrait'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'brush' FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'bronzer' FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'highlighter' FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

INSERT INTO product_tags (product_id, tag)
SELECT p.id, 'luxury' FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
ON CONFLICT (product_id, tag) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Product prices and affiliate links (1-4 stores per product, variant_id NULL)
-- ---------------------------------------------------------------------------
INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 84.55, 97.23, 'USD', true, true, now()
FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE001', 'GV-0001-AMA', true
FROM products p WHERE p.slug = 'la-mer-creme-de-la-mer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 64.6, 74.29, 'USD', true, true, now()
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE002', 'GV-0002-AMA', true
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 66.64, 71.97, 'USD', true, false, now()
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/2', 'GV-0002-WAL', true
FROM products p WHERE p.slug = 'drunk-elephant-protini-cream'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 22.8, 26.22, 'USD', true, true, now()
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE003', 'GV-0003-AMA', true
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 23.52, 25.4, 'USD', true, false, now()
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/3', 'GV-0003-WAL', true
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 22.08, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-3', 'GV-0003-EBA', true
FROM products p WHERE p.slug = 'laneige-water-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 185.25, 213.04, 'USD', true, true, now()
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE004', 'GV-0004-AMA', true
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 191.1, 206.39, 'USD', true, false, now()
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/4', 'GV-0004-WAL', true
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 179.4, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-4', 'GV-0004-EBA', true
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 195.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/estee-lauder-advanced-night-repair', 'GV-0004-OFF', true
FROM products p WHERE p.slug = 'estee-lauder-advanced-night-repair'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 17.1, 19.66, 'USD', true, true, now()
FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE005', 'GV-0005-AMA', true
FROM products p WHERE p.slug = 'glossier-milky-jelly-cleanser'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 45.6, 52.44, 'USD', true, true, now()
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE006', 'GV-0006-AMA', true
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 47.04, 50.8, 'USD', true, false, now()
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/6', 'GV-0006-WAL', true
FROM products p WHERE p.slug = 'sol-de-janeiro-bum-bum-cream'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 74.1, 85.21, 'USD', true, true, now()
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE007', 'GV-0007-AMA', true
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 76.44, 82.56, 'USD', true, false, now()
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/7', 'GV-0007-WAL', true
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 71.76, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-7', 'GV-0007-EBA', true
FROM products p WHERE p.slug = 'drunk-elephant-c-firma-serum'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 20.9, 24.03, 'USD', true, true, now()
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE008', 'GV-0008-AMA', true
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 21.56, 23.28, 'USD', true, false, now()
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/8', 'GV-0008-WAL', true
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 20.24, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-8', 'GV-0008-EBA', true
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 22.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/laneige-lip-sleeping-mask', 'GV-0008-OFF', true
FROM products p WHERE p.slug = 'laneige-lip-sleeping-mask'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 114.0, 131.1, 'USD', true, true, now()
FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE009', 'GV-0009-AMA', true
FROM products p WHERE p.slug = 'la-mer-treatment-lotion'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 90.25, 103.79, 'USD', true, true, now()
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE010', 'GV-0010-AMA', true
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 93.1, 100.55, 'USD', true, false, now()
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/10', 'GV-0010-WAL', true
FROM products p WHERE p.slug = 'estee-lauder-revitalizing-supreme'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 33.25, 38.24, 'USD', true, true, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE011', 'GV-0011-AMA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 34.3, 37.04, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/11', 'GV-0011-WAL', true
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 32.2, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-11', 'GV-0011-EBA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-pillow-talk-lipstick'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 39.9, 45.88, 'USD', true, true, now()
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE012', 'GV-0012-AMA', true
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 41.16, 44.45, 'USD', true, false, now()
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/12', 'GV-0012-WAL', true
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 38.64, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-12', 'GV-0012-EBA', true
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 42.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/fenty-pro-filtr-foundation', 'GV-0012-OFF', true
FROM products p WHERE p.slug = 'fenty-pro-filtr-foundation'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 30.4, 34.96, 'USD', true, true, now()
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE013', 'GV-0013-AMA', true
FROM products p WHERE p.slug = 'nars-radiant-creamy-concealer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 26.6, 30.59, 'USD', true, true, now()
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE014', 'GV-0014-AMA', true
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 27.44, 29.64, 'USD', true, false, now()
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/14', 'GV-0014-WAL', true
FROM products p WHERE p.slug = 'rare-beauty-soft-pinch-blush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 569.05, 654.41, 'USD', true, true, now()
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE015', 'GV-0015-AMA', true
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 587.02, 633.98, 'USD', true, false, now()
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/15', 'GV-0015-WAL', true
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 551.08, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-15', 'GV-0015-EBA', true
FROM products p WHERE p.slug = 'mac-ruby-woo-lipstick'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 407.55, 468.68, 'USD', true, true, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE016', 'GV-0016-AMA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 420.42, 454.05, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/16', 'GV-0016-WAL', true
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 394.68, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-16', 'GV-0016-EBA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 429.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/charlotte-tilbury-flawless-filter', 'GV-0016-OFF', true
FROM products p WHERE p.slug = 'charlotte-tilbury-flawless-filter'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 26.6, 30.59, 'USD', true, true, now()
FROM products p WHERE p.slug = 'fenty-gloss-bomb'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE017', 'GV-0017-AMA', true
FROM products p WHERE p.slug = 'fenty-gloss-bomb'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 49.4, 56.81, 'USD', true, true, now()
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE018', 'GV-0018-AMA', true
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 50.96, 55.04, 'USD', true, false, now()
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/18', 'GV-0018-WAL', true
FROM products p WHERE p.slug = 'benefit-hoola-bronzer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 27.55, 31.68, 'USD', true, true, now()
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE019', 'GV-0019-AMA', true
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 28.42, 30.69, 'USD', true, false, now()
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/19', 'GV-0019-WAL', true
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 26.68, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-19', 'GV-0019-EBA', true
FROM products p WHERE p.slug = 'kylie-matte-lip-kit'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 36.1, 41.52, 'USD', true, true, now()
FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE020', 'GV-0020-AMA', true
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 37.24, 40.22, 'USD', true, false, now()
FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/20', 'GV-0020-WAL', true
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 34.96, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-20', 'GV-0020-EBA', true
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 38.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'nars-orgasm-blush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/nars-orgasm-blush', 'GV-0020-OFF', true
FROM products p WHERE p.slug = 'nars-orgasm-blush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 39.9, 45.88, 'USD', true, true, now()
FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE021', 'GV-0021-AMA', true
FROM products p WHERE p.slug = 'rare-beauty-positive-light-highlighter'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 17.1, 19.66, 'USD', true, true, now()
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE022', 'GV-0022-AMA', true
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 17.64, 19.05, 'USD', true, false, now()
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/22', 'GV-0022-WAL', true
FROM products p WHERE p.slug = 'mac-studio-fix-fluid'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 22.8, 26.22, 'USD', true, true, now()
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE023', 'GV-0023-AMA', true
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 23.52, 25.4, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/23', 'GV-0023-WAL', true
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 22.08, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-23', 'GV-0023-EBA', true
FROM products p WHERE p.slug = 'olaplex-no-3-hair-perfector'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 30.4, 34.96, 'USD', true, true, now()
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE024', 'GV-0024-AMA', true
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 31.36, 33.87, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/24', 'GV-0024-WAL', true
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 29.44, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-24', 'GV-0024-EBA', true
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 32.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/olaplex-no-4-shampoo', 'GV-0024-OFF', true
FROM products p WHERE p.slug = 'olaplex-no-4-shampoo'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 83.6, 96.14, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dyson-airwrap-complete'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE025', 'GV-0025-AMA', true
FROM products p WHERE p.slug = 'dyson-airwrap-complete'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 118.75, 136.56, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE026', 'GV-0026-AMA', true
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 122.5, 132.3, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/26', 'GV-0026-WAL', true
FROM products p WHERE p.slug = 'dyson-supersonic-dryer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 90.25, 103.79, 'USD', true, true, now()
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE027', 'GV-0027-AMA', true
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 93.1, 100.55, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/27', 'GV-0027-WAL', true
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 87.4, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-27', 'GV-0027-EBA', true
FROM products p WHERE p.slug = 'olaplex-no-5-conditioner'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 156.75, 180.26, 'USD', true, true, now()
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE028', 'GV-0028-AMA', true
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 161.7, 174.64, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/28', 'GV-0028-WAL', true
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 151.8, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-28', 'GV-0028-EBA', true
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 165.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/olaplex-no-7-bonding-oil', 'GV-0028-OFF', true
FROM products p WHERE p.slug = 'olaplex-no-7-bonding-oil'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 39.9, 45.88, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dyson-corrale-straightener'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE029', 'GV-0029-AMA', true
FROM products p WHERE p.slug = 'dyson-corrale-straightener'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 93.1, 107.06, 'USD', true, true, now()
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE030', 'GV-0030-AMA', true
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 96.04, 103.72, 'USD', true, false, now()
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/30', 'GV-0030-WAL', true
FROM products p WHERE p.slug = 'glossier-balm-dotcom'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 20.9, 24.03, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE031', 'GV-0031-AMA', true
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 21.56, 23.28, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/31', 'GV-0031-WAL', true
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 20.24, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-31', 'GV-0031-EBA', true
FROM products p WHERE p.slug = 'dior-miss-dior-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 11.4, 13.11, 'USD', true, true, now()
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE032', 'GV-0032-AMA', true
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 11.76, 12.7, 'USD', true, false, now()
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/32', 'GV-0032-WAL', true
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 11.04, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-32', 'GV-0032-EBA', true
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 12.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/chanel-chance-eau-tendre', 'GV-0032-OFF', true
FROM products p WHERE p.slug = 'chanel-chance-eau-tendre'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 13.3, 15.29, 'USD', true, true, now()
FROM products p WHERE p.slug = 'tom-ford-black-orchid'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE033', 'GV-0033-AMA', true
FROM products p WHERE p.slug = 'tom-ford-black-orchid'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 15.2, 17.48, 'USD', true, true, now()
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE034', 'GV-0034-AMA', true
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 15.68, 16.93, 'USD', true, false, now()
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/34', 'GV-0034-WAL', true
FROM products p WHERE p.slug = 'jo-malone-english-pear-freesia'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 10.45, 12.02, 'USD', true, true, now()
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE035', 'GV-0035-AMA', true
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 10.78, 11.64, 'USD', true, false, now()
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/35', 'GV-0035-WAL', true
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 10.12, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-35', 'GV-0035-EBA', true
FROM products p WHERE p.slug = 'sol-de-janeiro-cheirosa-62-mist'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 46.55, 53.53, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE036', 'GV-0036-AMA', true
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 48.02, 51.86, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/36', 'GV-0036-WAL', true
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 45.08, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-36', 'GV-0036-EBA', true
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 49.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dior-sauvage-edp'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/dior-sauvage-edp', 'GV-0036-OFF', true
FROM products p WHERE p.slug = 'dior-sauvage-edp'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 42.75, 49.16, 'USD', true, true, now()
FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE037', 'GV-0037-AMA', true
FROM products p WHERE p.slug = 'opi-bubble-bath-lacquer'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 17.1, 19.66, 'USD', true, true, now()
FROM products p WHERE p.slug = 'opi-big-apple-red'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE038', 'GV-0038-AMA', true
FROM products p WHERE p.slug = 'opi-big-apple-red'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 17.64, 19.05, 'USD', true, false, now()
FROM products p WHERE p.slug = 'opi-big-apple-red'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/38', 'GV-0038-WAL', true
FROM products p WHERE p.slug = 'opi-big-apple-red'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 11.4, 13.11, 'USD', true, true, now()
FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE039', 'GV-0039-AMA', true
FROM products p WHERE p.slug = 'opi-princesses-rule'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 11.76, 12.7, 'USD', true, false, now()
FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/39', 'GV-0039-WAL', true
FROM products p WHERE p.slug = 'opi-princesses-rule'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 11.04, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'opi-princesses-rule'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-39', 'GV-0039-EBA', true
FROM products p WHERE p.slug = 'opi-princesses-rule'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 30.4, 34.96, 'USD', true, true, now()
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE040', 'GV-0040-AMA', true
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 31.36, 33.87, 'USD', true, false, now()
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/40', 'GV-0040-WAL', true
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 29.44, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-40', 'GV-0040-EBA', true
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 32.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/opi-nature-strong-base-coat', 'GV-0040-OFF', true
FROM products p WHERE p.slug = 'opi-nature-strong-base-coat'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 52.25, 60.09, 'USD', true, true, now()
FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE041', 'GV-0041-AMA', true
FROM products p WHERE p.slug = 'opi-prospa-cuticle-oil'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 20.9, 24.03, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE042', 'GV-0042-AMA', true
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 21.56, 23.28, 'USD', true, false, now()
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/42', 'GV-0042-WAL', true
FROM products p WHERE p.slug = 'dyson-airwrap-long-barrel'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 7.6, 8.74, 'USD', true, true, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE043', 'GV-0043-AMA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 7.84, 8.47, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/43', 'GV-0043-WAL', true
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 7.36, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-43', 'GV-0043-EBA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-magic-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 39.9, 45.88, 'USD', true, true, now()
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE044', 'GV-0044-AMA', true
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 41.16, 44.45, 'USD', true, false, now()
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/44', 'GV-0044-WAL', true
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 38.64, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-44', 'GV-0044-EBA', true
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 42.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/benefit-brow-styler-tool', 'GV-0044-OFF', true
FROM products p WHERE p.slug = 'benefit-brow-styler-tool'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 569.05, 654.41, 'USD', true, true, now()
FROM products p WHERE p.slug = 'fenty-precision-sponge'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE045', 'GV-0045-AMA', true
FROM products p WHERE p.slug = 'fenty-precision-sponge'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 474.05, 545.16, 'USD', true, true, now()
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE046', 'GV-0046-AMA', true
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 489.02, 528.14, 'USD', true, false, now()
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/46', 'GV-0046-WAL', true
FROM products p WHERE p.slug = 'nars-radiance-primer-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 36.1, 41.52, 'USD', true, true, now()
FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE047', 'GV-0047-AMA', true
FROM products p WHERE p.slug = 'mac-187-slant-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 37.24, 40.22, 'USD', true, false, now()
FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/47', 'GV-0047-WAL', true
FROM products p WHERE p.slug = 'mac-187-slant-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 34.96, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'mac-187-slant-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-47', 'GV-0047-EBA', true
FROM products p WHERE p.slug = 'mac-187-slant-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 42.75, 49.16, 'USD', true, true, now()
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE048', 'GV-0048-AMA', true
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 44.1, 47.63, 'USD', true, false, now()
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/48', 'GV-0048-WAL', true
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 41.4, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'ebay'), 'https://ebay.com/itm/example-48', 'GV-0048-EBA', true
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'ebay') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 45.0, NULL, 'USD', true, false, now()
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'official-store'), 'https://official.example.com/products/glossier-cloud-paint-brush', 'GV-0048-OFF', true
FROM products p WHERE p.slug = 'glossier-cloud-paint-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'official-store') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 58.9, 67.73, 'USD', true, true, now()
FROM products p WHERE p.slug = 'dyson-airstrait'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE049', 'GV-0049-AMA', true
FROM products p WHERE p.slug = 'dyson-airstrait'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 26.6, 30.59, 'USD', true, true, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'amazon'), 'https://amazon.com/dp/B0EXAMPLE050', 'GV-0050-AMA', true
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'amazon') AND al.variant_id IS NULL
);

INSERT INTO product_prices (product_id, variant_id, store_id, price, original_price, currency, in_stock, is_prime, last_checked_at)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 27.44, 29.64, 'USD', true, false, now()
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
ON CONFLICT (product_id, variant_id, store_id) DO UPDATE SET
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  in_stock = EXCLUDED.in_stock,
  is_prime = EXCLUDED.is_prime,
  last_checked_at = EXCLUDED.last_checked_at;

INSERT INTO affiliate_links (product_id, variant_id, store_id, affiliate_url, external_product_id, is_active)
SELECT p.id, NULL, (SELECT id FROM affiliate_stores WHERE slug = 'walmart'), 'https://walmart.com/ip/example-product/50', 'GV-0050-WAL', true
FROM products p WHERE p.slug = 'charlotte-tilbury-filmstar-brush'
AND NOT EXISTS (
  SELECT 1 FROM affiliate_links al WHERE al.product_id = p.id AND al.store_id = (SELECT id FROM affiliate_stores WHERE slug = 'walmart') AND al.variant_id IS NULL
);

-- ---------------------------------------------------------------------------
-- Blog categories (10)
-- ---------------------------------------------------------------------------
INSERT INTO blog_categories (name, slug, description, sort_order)
VALUES
  ('Skincare', 'skincare', 'Expert skincare routines, ingredient guides, and product reviews.', 1),
  ('Makeup', 'makeup', 'Tutorials, trends, and honest reviews of color cosmetics.', 2),
  ('Haircare', 'haircare', 'Styling tips, bond repair science, and tool comparisons.', 3),
  ('Reviews', 'reviews', 'In-depth product testing and comparison guides.', 4),
  ('Tutorials', 'tutorials', 'Step-by-step beauty how-tos for every skill level.', 5),
  ('Ingredients', 'ingredients', 'Decode labels and learn what works for your skin.', 6),
  ('Trends', 'trends', 'Latest launches, viral products, and industry news.', 7),
  ('Wellness', 'wellness', 'Self-care rituals that complement your beauty routine.', 8),
  ('Fragrance', 'fragrance', 'Scent layering, notes explained, and new releases.', 9),
  ('Tools & Tech', 'tools-tech', 'Brushes, devices, and the science behind beauty tech.', 10)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, sort_order = EXCLUDED.sort_order;

-- ---------------------------------------------------------------------------
-- Blog authors (5)
-- ---------------------------------------------------------------------------
INSERT INTO blog_authors (name, slug, avatar_url, bio)
VALUES
  ('Sophia Chen', 'sophia-chen', 'photo-1551184451-76b762941ad6', 'Senior beauty editor with 12 years covering luxury skincare and K-beauty trends.'),
  ('Marcus Rivera', 'marcus-rivera', 'photo-1507003211169-0a1dd7228f2d', 'Makeup artist and content creator specializing in inclusive shade matching and pro techniques.'),
  ('Amelia Foster', 'amelia-foster', 'photo-1494790108377-be9c29b29330', 'Dermatology-informed writer focused on ingredient science and sensitive skin solutions.'),
  ('Jordan Blake', 'jordan-blake', 'photo-1472099645785-5658abf4ff4e', 'Fragrance enthusiast and grooming editor covering niche perfumery and body care.'),
  ('Priya Sharma', 'priya-sharma', 'photo-1438761681033-6461ffad8d80', 'Haircare specialist and Dyson ambassador sharing bond repair tips and styling tutorials.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, avatar_url = EXCLUDED.avatar_url, bio = EXCLUDED.bio;

-- ---------------------------------------------------------------------------
-- Blog posts (20)
-- ---------------------------------------------------------------------------
INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'sophia-chen'), (SELECT id FROM blog_categories WHERE slug = 'skincare'), 'The Ultimate Morning Skincare Routine for Glowing Skin', 'morning-skincare-routine-glowing-skin', 'Build a five-step morning routine that protects, hydrates, and preps skin for makeup.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Build a five-step morning routine that protects, hydrates, and preps skin for makeup.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["skincare", "beauty", "glowvelle-picks"]}'::jsonb, 8, now() - interval '15 days', true, 'published', 'Build a five-step morning routine that protects, hydrates, and preps skin for makeup.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'amelia-foster'), (SELECT id FROM blog_categories WHERE slug = 'ingredients'), 'Vitamin C Serums: How to Choose the Right One', 'vitamin-c-serum-guide', 'Compare L-ascorbic acid, derivatives, and packaging to find your perfect brightening serum.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Compare L-ascorbic acid, derivatives, and packaging to find your perfect brightening serum.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["ingredients", "beauty", "glowvelle-picks"]}'::jsonb, 10, now() - interval '12 days', true, 'published', 'Compare L-ascorbic acid, derivatives, and packaging to find your perfect brightening serum.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'marcus-rivera'), (SELECT id FROM blog_categories WHERE slug = 'makeup'), 'Pillow Talk vs Pillow Talk Medium: Which Shade Is Right?', 'pillow-talk-shade-comparison', 'We swatched every Pillow Talk lipstick variant on five skin tones.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["We swatched every Pillow Talk lipstick variant on five skin tones.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["makeup", "beauty", "glowvelle-picks"]}'::jsonb, 6, now() - interval '8 days', false, 'published', 'We swatched every Pillow Talk lipstick variant on five skin tones.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'priya-sharma'), (SELECT id FROM blog_categories WHERE slug = 'reviews'), 'Olaplex No.3 Review: Is the Hype Real?', 'olaplex-no-3-review', 'Four weeks of bond repair testing on bleached, damaged hair.', 'photo-1758788390320-16e1f280cf49', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Four weeks of bond repair testing on bleached, damaged hair.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["reviews", "beauty", "glowvelle-picks"]}'::jsonb, 7, now() - interval '20 days', true, 'published', 'Four weeks of bond repair testing on bleached, damaged hair.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'jordan-blake'), (SELECT id FROM blog_categories WHERE slug = 'fragrance'), 'How to Layer Fragrances Like a Jo Malone Pro', 'fragrance-layering-guide', 'Master the art of combining colognes for a signature scent.', 'photo-1608721279136-cd41b752fa41', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Master the art of combining colognes for a signature scent.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["fragrance", "beauty", "glowvelle-picks"]}'::jsonb, 5, now() - interval '6 days', false, 'published', 'Master the art of combining colognes for a signature scent.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'marcus-rivera'), (SELECT id FROM blog_categories WHERE slug = 'makeup'), '10 Best Liquid Blushes for a Natural Flush', 'best-liquid-blushes-2026', 'From Rare Beauty to Glossier, our top picks for dewy, buildable color.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["From Rare Beauty to Glossier, our top picks for dewy, buildable color.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["makeup", "beauty", "glowvelle-picks"]}'::jsonb, 9, now() - interval '14 days', true, 'published', 'From Rare Beauty to Glossier, our top picks for dewy, buildable color.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'amelia-foster'), (SELECT id FROM blog_categories WHERE slug = 'skincare'), 'Retinol Beginners Guide: Start Slow, See Results', 'retinol-beginners-guide', 'Everything you need to know before adding retinol to your nighttime routine.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Everything you need to know before adding retinol to your nighttime routine.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["skincare", "beauty", "glowvelle-picks"]}'::jsonb, 11, now() - interval '18 days', false, 'published', 'Everything you need to know before adding retinol to your nighttime routine.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'priya-sharma'), (SELECT id FROM blog_categories WHERE slug = 'tools-tech'), 'Dyson Airwrap vs Airstrait: Which Tool Should You Buy?', 'dyson-airwrap-vs-airstrait', 'We tested both on straight, wavy, and curly hair types.', 'photo-1596462502278-27bfdc403348', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["We tested both on straight, wavy, and curly hair types.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["tools-tech", "beauty", "glowvelle-picks"]}'::jsonb, 12, now() - interval '22 days', true, 'published', 'We tested both on straight, wavy, and curly hair types.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'sophia-chen'), (SELECT id FROM blog_categories WHERE slug = 'skincare'), 'K-Beauty Night Routine: Laneige Sleeping Mask Deep Dive', 'laneige-sleeping-mask-review', 'Why the Water Sleeping Mask remains a global bestseller after a decade.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Why the Water Sleeping Mask remains a global bestseller after a decade.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["skincare", "beauty", "glowvelle-picks"]}'::jsonb, 6, now() - interval '10 days', false, 'published', 'Why the Water Sleeping Mask remains a global bestseller after a decade.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'amelia-foster'), (SELECT id FROM blog_categories WHERE slug = 'ingredients'), 'Clean Beauty Myths Debunked by a Dermatologist', 'clean-beauty-myths-debunked', 'Separating marketing claims from evidence-based skincare advice.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Separating marketing claims from evidence-based skincare advice.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["ingredients", "beauty", "glowvelle-picks"]}'::jsonb, 8, now() - interval '16 days', false, 'published', 'Separating marketing claims from evidence-based skincare advice.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'marcus-rivera'), (SELECT id FROM blog_categories WHERE slug = 'trends'), 'Spring 2026 Makeup Trends You Need to Try', 'spring-2026-makeup-trends', 'Glazed donut skin, cherry cola lips, and soft grunge eyes dominate this season.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Glazed donut skin, cherry cola lips, and soft grunge eyes dominate this season.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["trends", "beauty", "glowvelle-picks"]}'::jsonb, 7, now() - interval '11 days', true, 'published', 'Glazed donut skin, cherry cola lips, and soft grunge eyes dominate this season.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'marcus-rivera'), (SELECT id FROM blog_categories WHERE slug = 'tutorials'), 'How to Apply Foundation Like a Pro MUA', 'foundation-application-tutorial', 'Prep, tools, and technique for flawless base makeup at home.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Prep, tools, and technique for flawless base makeup at home.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["tutorials", "beauty", "glowvelle-picks"]}'::jsonb, 10, now() - interval '9 days', false, 'published', 'Prep, tools, and technique for flawless base makeup at home.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'sophia-chen'), (SELECT id FROM blog_categories WHERE slug = 'wellness'), 'Best Body Creams for Dry Winter Skin', 'best-body-creams-winter', 'Sol de Janeiro, La Mer, and drugstore picks compared side by side.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Sol de Janeiro, La Mer, and drugstore picks compared side by side.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["wellness", "beauty", "glowvelle-picks"]}'::jsonb, 8, now() - interval '13 days', false, 'published', 'Sol de Janeiro, La Mer, and drugstore picks compared side by side.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'marcus-rivera'), (SELECT id FROM blog_categories WHERE slug = 'reviews'), 'NARS Orgasm Blush: 20 Years of the Iconic Peachy Glow', 'nars-orgasm-blush-history', 'The story behind beauty most recognizable blush and how to wear it today.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["The story behind beauty most recognizable blush and how to wear it today.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["reviews", "beauty", "glowvelle-picks"]}'::jsonb, 5, now() - interval '7 days', false, 'published', 'The story behind beauty most recognizable blush and how to wear it today.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'priya-sharma'), (SELECT id FROM blog_categories WHERE slug = 'haircare'), 'Scalp Care 101: Treat Your Scalp Like Your Face', 'scalp-care-routine-guide', 'Exfoliation, hydration, and treatments for a healthier hair foundation.', 'photo-1758788390320-16e1f280cf49', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Exfoliation, hydration, and treatments for a healthier hair foundation.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["haircare", "beauty", "glowvelle-picks"]}'::jsonb, 9, now() - interval '15 days', false, 'published', 'Exfoliation, hydration, and treatments for a healthier hair foundation.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'marcus-rivera'), (SELECT id FROM blog_categories WHERE slug = 'trends'), 'Fenty Beauty Shade Range: Why Inclusivity Changed the Industry', 'fenty-shade-range-impact', 'How 50 foundation shades set a new standard for the entire beauty industry.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["How 50 foundation shades set a new standard for the entire beauty industry.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["trends", "beauty", "glowvelle-picks"]}'::jsonb, 7, now() - interval '19 days', true, 'published', 'How 50 foundation shades set a new standard for the entire beauty industry.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'sophia-chen'), (SELECT id FROM blog_categories WHERE slug = 'tutorials'), 'At-Home Manicure Tutorial: OPI Bubble Bath Look', 'opi-bubble-bath-manicure-tutorial', 'Achieve salon-quality nude nails with the cult-favorite sheer pink polish.', 'photo-1676570092589-a6c09ecbb373', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Achieve salon-quality nude nails with the cult-favorite sheer pink polish.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["tutorials", "beauty", "glowvelle-picks"]}'::jsonb, 6, now() - interval '5 days', false, 'published', 'Achieve salon-quality nude nails with the cult-favorite sheer pink polish.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'jordan-blake'), (SELECT id FROM blog_categories WHERE slug = 'fragrance'), 'Understanding Fragrance Notes: Top, Heart, and Base', 'fragrance-notes-explained', 'A beginner-friendly guide to reading perfume pyramids and finding your vibe.', 'photo-1608721279136-cd41b752fa41', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["A beginner-friendly guide to reading perfume pyramids and finding your vibe.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["fragrance", "beauty", "glowvelle-picks"]}'::jsonb, 8, now() - interval '8 days', false, 'published', 'A beginner-friendly guide to reading perfume pyramids and finding your vibe.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'sophia-chen'), (SELECT id FROM blog_categories WHERE slug = 'wellness'), 'Self-Care Sunday Rituals for Busy Professionals', 'self-care-sunday-rituals', 'Reset your week with a 30-minute beauty and mindfulness routine.', 'photo-1779056904689-ff99fd0045a4', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["Reset your week with a 30-minute beauty and mindfulness routine.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["wellness", "beauty", "glowvelle-picks"]}'::jsonb, 5, now() - interval '4 days', false, 'published', 'Reset your week with a 30-minute beauty and mindfulness routine.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

INSERT INTO blog_posts (author_id, blog_category_id, title, slug, excerpt, featured_image_url, content, read_time_minutes, published_at, is_featured, status, meta_description)
SELECT (SELECT id FROM blog_authors WHERE slug = 'sophia-chen'), (SELECT id FROM blog_categories WHERE slug = 'reviews'), 'Charlotte Tilbury Magic Cream: Worth the Splurge?', 'charlotte-tilbury-magic-cream-review', 'We tested the celebrity-favorite moisturizer for 30 days on mature skin.', 'photo-1631730486572-226d1f595b68', '{"sections": [{"id": "intro", "title": "Introduction", "paragraphs": ["We tested the celebrity-favorite moisturizer for 30 days on mature skin.", "At Glowvelle, we test every product recommendation against real-world use cases so you can shop with confidence."]}, {"id": "main", "title": "What You Need to Know", "paragraphs": ["This guide covers the essentials, from product selection to application tips backed by editorial testing.", "Whether you are building a routine from scratch or upgrading a holy-grail product, these insights will help you decide."]}, {"id": "tips", "title": "Pro Tips", "paragraphs": ["Start with one new product at a time to identify what works for your skin or hair type.", "Patch test active ingredients and always follow with SPF during daytime routines."]}], "faq": [{"question": "How often should I update my routine?", "answer": "Reassess seasonally or when you notice changes in your skin, hair, or lifestyle needs."}, {"question": "Are these products suitable for sensitive skin?", "answer": "Many featured items are dermatologist-tested, but always check ingredient lists and patch test first."}], "tags": ["reviews", "beauty", "glowvelle-picks"]}'::jsonb, 7, now() - interval '17 days', true, 'published', 'We tested the celebrity-favorite moisturizer for 30 days on mature skin.'
ON CONFLICT (slug) DO UPDATE SET
  author_id = EXCLUDED.author_id,
  blog_category_id = EXCLUDED.blog_category_id,
  title = EXCLUDED.title,
  excerpt = EXCLUDED.excerpt,
  featured_image_url = EXCLUDED.featured_image_url,
  content = EXCLUDED.content,
  read_time_minutes = EXCLUDED.read_time_minutes,
  published_at = EXCLUDED.published_at,
  is_featured = EXCLUDED.is_featured,
  status = EXCLUDED.status,
  meta_description = EXCLUDED.meta_description;

COMMIT;
