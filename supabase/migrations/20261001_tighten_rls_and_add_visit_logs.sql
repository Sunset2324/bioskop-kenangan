/*
# Perketat RLS Bioskop Kenangan

Katalog (categories, movies) hanya bisa diakses user yang sudah login.
Anon key tidak punya akses apa pun lagi.
visit_logs dibuat resmi di migration (sebelumnya manual di dashboard).
*/

-- ============ 1. Hapus policy lama yang terlalu terbuka ============

DROP POLICY IF EXISTS "anon_select_categories" ON categories;
DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
DROP POLICY IF EXISTS "anon_update_categories" ON categories;
DROP POLICY IF EXISTS "anon_delete_categories" ON categories;

DROP POLICY IF EXISTS "anon_select_movies" ON movies;
DROP POLICY IF EXISTS "anon_insert_movies" ON movies;
DROP POLICY IF EXISTS "anon_update_movies" ON movies;
DROP POLICY IF EXISTS "anon_delete_movies" ON movies;

-- ============ 2. Policy baru: hanya authenticated ============

CREATE POLICY "auth_select_categories" ON categories FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "auth_insert_categories" ON categories FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "auth_update_categories" ON categories FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_categories" ON categories FOR DELETE
  TO authenticated USING (true);

CREATE POLICY "auth_select_movies" ON movies FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "auth_insert_movies" ON movies FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "auth_update_movies" ON movies FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "auth_delete_movies" ON movies FOR DELETE
  TO authenticated USING (true);

-- ============ 3. Tabel visit_logs (resmi masuk migration) ============

CREATE TABLE IF NOT EXISTS visit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE visit_logs ENABLE ROW LEVEL SECURITY;

-- User yang login boleh mencatat kunjungan, tapi tidak ada yang bisa
-- MEMBACA log dari frontend (sengaja tanpa policy SELECT)
CREATE POLICY "auth_insert_visit_logs" ON visit_logs FOR INSERT
  TO authenticated WITH CHECK (true);