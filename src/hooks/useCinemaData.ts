import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Category, Movie } from '@/types';

interface CinemaData {
  categories: Category[];
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export function useCinemaData(): CinemaData {
  const [categories, setCategories] = useState<Category[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const [catRes, movRes] = await Promise.all([
          supabase.from('categories').select('*').order('sort_order', { ascending: true }),
          supabase.from('movies').select('*').order('title', { ascending: true }),
        ]);

        if (cancelled) return;

        // Handle JWT error khusus
        if (catRes.error?.message.includes('JWT') || movRes.error?.message.includes('JWT')) {
          setError('Sesi login tidak valid. Silakan logout dan login kembali.');
          setLoading(false);
          return;
        }

        if (catRes.error) {
          setError(catRes.error.message);
          setLoading(false);
          return;
        }
        if (movRes.error) {
          setError(movRes.error.message);
          setLoading(false);
          return;
        }

        const allMovies = movRes.data ?? [];
        const allCategories = catRes.data ?? [];

        const categoriesWithMovies = allCategories.filter((cat) =>
          allMovies.some((movie) => movie.category_id === cat.id)
        );

        setCategories(categoriesWithMovies);
        setMovies(allMovies);
        setLoading(false);
      } catch (err) {
        if (!cancelled) {
          setError('Terjadi kesalahan saat memuat data');
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { categories, movies, loading, error };
}