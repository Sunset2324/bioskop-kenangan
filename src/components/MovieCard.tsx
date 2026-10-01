import { Play, Film } from 'lucide-react';
import { useState } from 'react';
import type { Movie } from '@/types';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const [imgError, setImgError] = useState(false);

  // Fungsi untuk memotong judul yang terlalu panjang
  const truncateTitle = (title: string, maxLength: number = 60) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + '...';
  };

  // Hapus ekstensi file yang tidak perlu dari judul
  const cleanTitle = movie.title
    .replace(/\.(ts|mp4|mkv|avi|mov)$/i, '') // Hapus ekstensi video
    .replace(/\s*-\s*Streaming dan Download.*$/i, '') // Hapus teks "Streaming dan Download..."
    .replace(/\s*Sub Indo.*$/i, '') // Hapus "Sub Indo"
    .trim();

  const displayTitle = truncateTitle(cleanTitle, 50);

  return (
    <button
      type="button"
      onClick={() => onClick(movie)}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-[#c9a14a]/15 bg-[#241414] text-left shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#c9a14a]/50 hover:shadow-xl hover:shadow-black/60"
    >
      {/* thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-[#1a0e0e]">
        {!imgError ? (
          <img
            src={movie.thumbnail_url}
            alt={movie.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          // Placeholder jika gambar gagal dimuat
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2a1a1a] to-[#1a0e0e]">
            <Film className="h-12 w-12 text-[#c9a14a]/30" />
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e0e] via-[#1a0e0e]/30 to-transparent" />
        
        {/* play overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a14a]/90 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110">
            <Play className="h-6 w-6 fill-[#1a0e0e] text-[#1a0e0e]" />
          </div>
        </div>
      </div>

      {/* text */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1.5 line-clamp-2 font-serif text-lg font-semibold text-[#f5e6c8] transition-colors group-hover:text-[#c9a14a]">
          {displayTitle}
        </h3>
        {movie.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-[#e8d5b5]/60">
            {movie.description}
          </p>
        )}
      </div>
    </button>
  );
}