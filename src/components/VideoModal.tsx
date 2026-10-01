import { useEffect, useState } from 'react';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import type { Movie } from '@/types';

interface VideoModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function VideoModal({ movie, onClose }: VideoModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!movie) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      setIsLoaded(false);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  // URL langsung ke Google Drive (tanpa Worker)
  const previewUrl = `https://drive.google.com/file/d/${movie.gdrive_file_id}/preview`;
  const directViewUrl = `https://drive.google.com/file/d/${movie.gdrive_file_id}/view`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.2s ease-out both' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-[#c9a14a]/30 bg-[#1a0e0e] shadow-2xl shadow-black/70"
        style={{ animation: 'modalIn 0.3s ease-out both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#c9a14a]/15 px-5 py-4">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-serif text-lg font-semibold text-[#f5e6c8]">{movie.title}</h3>
            <p className="text-xs text-[#e8d5b5]/50">Bioskop Core Memory</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Tombol Fallback: Buka di Tab Baru */}
            <a
              href={directViewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#e8d5b5]/70 transition-colors hover:bg-[#c9a14a]/10 hover:text-[#c9a14a]"
              aria-label="Buka video di tab baru"
              title="Jika video tidak muncul di sini, klik ini"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="flex h-9 w-9 items-center justify-center rounded-full text-[#e8d5b5]/70 transition-colors hover:bg-[#c9a14a]/10 hover:text-[#c9a14a]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div className="relative w-full bg-black pt-[56.25%]">
          {/* Loading Spinner */}
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#c9a14a]">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p className="text-sm text-[#e8d5b5]/60">Memutar kenangan...</p>
            </div>
          )}

          <iframe
            src={previewUrl}
            className={`absolute top-0 left-0 h-full w-full border-0 transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={movie.title}
            onLoad={() => setIsLoaded(true)}
          />
        </div>

        {/* Description */}
        <div className="max-h-32 overflow-y-auto px-5 py-4">
          <p className="text-sm leading-relaxed text-[#e8d5b5]/70">
            {movie.description || 'Tidak ada deskripsi untuk kenangan ini.'}
          </p>
        </div>
      </div>
    </div>
  );
}