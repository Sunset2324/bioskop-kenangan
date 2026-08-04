import { useMemo, useState } from 'react';
import { Film, Heart, Loader2 } from 'lucide-react';
import { useCinemaData } from '@/hooks/useCinemaData';
import type { Movie } from '@/types';
import MovieCard from './MovieCard';
import VideoModal from './VideoModal';

export default function CinemaPage() {
  const { categories, movies, loading, error } = useCinemaData();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [selected, setSelected] = useState<Movie | null>(null);

  const activeCategory = useMemo(
    () => categories.find((c) => c.slug === activeSlug) ?? categories[0] ?? null,
    [categories, activeSlug],
  );

  const filteredMovies = useMemo(() => {
    if (!activeCategory) return movies;
    return movies.filter((m) => m.category_id === activeCategory.id);
  }, [movies, activeCategory]);

  return (
    <div className="min-h-screen bg-[#1a0e0e]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[#7b1e1e]/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {/* header */}
        <header className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a14a]/30 bg-[#c9a14a]/5 px-4 py-1.5">
            <Film className="h-4 w-4 text-[#c9a14a]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#c9a14a]/80">
              Bioskop Kenangan Kita
            </span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#f5e6c8] sm:text-4xl">
            Nikmati dan bersenang-senanglah
          </h1>
          <p className="mt-3 text-sm text-[#e8d5b5]/60">
            Setiap dari mereka ada yang pernah dan tidak menemani kamu.
          </p>
        </header>

        {/* tabs */}
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#e8d5b5]/60">
            <Loader2 className="h-8 w-8 animate-spin text-[#c9a14a]" />
            <p className="text-sm">Menyiapkan layar...</p>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-md rounded-lg border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="text-sm text-red-300">Gagal memuat data: {error}</p>
          </div>
        ) : (
          <>
            {categories.length > 0 && (
              <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
                {categories.map((cat) => {
                  const isActive = activeCategory?.id === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveSlug(cat.slug)}
                      className={
                        'rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ' +
                        (isActive
                          ? 'bg-gradient-to-r from-[#c9a14a] to-[#e0b85a] text-[#1a0e0e] shadow-lg shadow-[#c9a14a]/20'
                          : 'border border-[#c9a14a]/25 text-[#e8d5b5]/70 hover:border-[#c9a14a]/60 hover:text-[#f5e6c8]')
                      }
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            )}

            {/* grid */}
            {filteredMovies.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <Heart className="h-8 w-8 text-[#c9a14a]/40" />
                <p className="text-sm text-[#e8d5b5]/50">
                  Belum ada film di kategori ini. Tapi tenang, kita selalu punya kenangan.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={setSelected} />
                ))}
              </div>
            )}
          </>
        )}

        {/* footer */}
        <footer className="mt-16 text-center text-xs text-[#e8d5b5]/40">
          Dibuat dengan cinta, untuk kita.
        </footer>
      </div>

      <VideoModal movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
