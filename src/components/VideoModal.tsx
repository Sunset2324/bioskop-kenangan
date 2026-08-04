import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import type { Movie } from '@/types';
import { videoUrlFor } from '@/lib/supabase';

interface VideoModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function VideoModal({ movie, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const src = videoUrlFor(movie.gdrive_file_id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      style={{ animation: 'fadeIn 0.2s ease-out both' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-[#c9a14a]/30 bg-[#1a0e0e] shadow-2xl shadow-black/70"
        style={{ animation: 'modalIn 0.3s ease-out both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[#c9a14a]/15 px-5 py-4">
          <div>
            <h3 className="font-serif text-lg font-semibold text-[#f5e6c8]">{movie.title}</h3>
            <p className="text-xs text-[#e8d5b5]/50">Bioskop Core Memory</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#e8d5b5]/70 transition-colors hover:bg-[#c9a14a]/10 hover:text-[#c9a14a]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* video */}
        <div className="relative w-full pt-[56.25%]"> {/* Rasio 16:9 */}
          <iframe 
            src={`https://drive.google.com/file/d/${movie.gdrive_file_id}/preview`}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl border border-white/10"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={movie.title}
          />
        </div>

        {/* description */}
        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed text-[#e8d5b5]/70">{movie.description}</p>
        </div>
      </div>
    </div>
  );
}
