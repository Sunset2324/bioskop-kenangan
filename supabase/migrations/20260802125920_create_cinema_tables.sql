/*
# Bioskop Kenangan Kita — categories & movies tables (single-tenant, no auth)

1. New Tables
- `categories`
  - `id` (uuid, primary key)
  - `name` (text, not null) — display name of the category, e.g. "Mickey Mouse"
  - `slug` (text, unique, not null) — URL-safe identifier, e.g. "mickey-mouse"
  - `sort_order` (int, default 0) — controls tab ordering
  - `created_at` (timestamptz)
- `movies`
  - `id` (uuid, primary key)
  - `category_id` (uuid, foreign key -> categories.id, on delete cascade)
  - `title` (text, not null)
  - `description` (text, not null)
  - `thumbnail_url` (text, not null) — poster/thumbnail image URL
  - `gdrive_file_id` (text, not null) — Google Drive file id used to build the video stream URL
  - `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- This is a single-tenant, no-auth app: the anon-key frontend must be able to read
  the catalog. SELECT is public (USING (true)) intentionally. Writes are also open
  to anon/authenticated so the catalog can be seeded/managed without a sign-in flow.
- All four CRUD policies per table (select/insert/update/delete), scoped to
  `TO anon, authenticated`.

3. Important notes
- No user_id / auth.users dependency — this is a shared romantic cinema catalog.
- Foreign key from movies.category_id to categories.id with ON DELETE CASCADE so
  removing a category cleans up its movies.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS movies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  thumbnail_url text NOT NULL,
  gdrive_file_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE movies ENABLE ROW LEVEL SECURITY;

-- categories policies
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

-- movies policies
DROP POLICY IF EXISTS "anon_select_movies" ON movies;
CREATE POLICY "anon_select_movies" ON movies FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_movies" ON movies;
CREATE POLICY "anon_insert_movies" ON movies FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_movies" ON movies;
CREATE POLICY "anon_update_movies" ON movies FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_movies" ON movies;
CREATE POLICY "anon_delete_movies" ON movies FOR DELETE
  TO anon, authenticated USING (true);
