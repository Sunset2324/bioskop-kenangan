import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Loader2, ExternalLink } from 'lucide-react';

interface EnvelopeLandingProps {
  onOpenCinema: () => void;
}

const VIDEO_ID = import.meta.env.VITE_WELCOME_VIDEO_ID as string;

// Fallback safety: Jika env kosong, tampilkan warning di console
if (!VIDEO_ID) {
  console.warn('VITE_WELCOME_VIDEO_ID is missing in .env file');
}

export default function EnvelopeLanding({ onOpenCinema }: EnvelopeLandingProps) {
  const [opened, setOpened] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a0e0e]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#7b1e1e]/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-[#c9a14a]/10 blur-3xl" />

      {/* floating hearts */}
      {[...Array(8)].map((_, i) => (
        <Heart
          key={i}
          className="pointer-events-none absolute text-[#c9a14a]/20"
          style={{
            left: `${(i * 13 + 8) % 95}%`,
            top: `${(i * 17 + 10) % 90}%`,
            width: `${12 + (i % 4) * 6}px`,
            height: `${12 + (i % 4) * 6}px`,
            animation: `floatHeart ${6 + (i % 5)}s ease-in-out ${i * 0.6}s infinite`,
          }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {!opened ? (
          <div className="flex flex-col items-center text-center">
            <p className="mb-3 font-serif text-sm uppercase tracking-[0.35em] text-[#c9a14a]/80">
              Sebuah surat untukmu
            </p>
            <h1 className="mb-10 font-serif text-3xl font-semibold text-[#f5e6c8] sm:text-4xl">
              Bioskop Core Memory
            </h1>

            {/* Envelope */}
            <button
              type="button"
              onClick={() => setOpened(true)}
              aria-label="Buka surat"
              className="group relative h-56 w-80 cursor-pointer sm:h-64 sm:w-96"
            >
              {/* envelope body */}
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#8b2020] to-[#5a1414] shadow-2xl shadow-black/60 transition-transform duration-500 group-hover:-translate-y-1" />
              {/* flap */}
              <div
                className="absolute left-0 top-0 h-0 w-0 transition-all duration-700"
                style={{
                  borderLeft: '160px solid transparent',
                  borderRight: '160px solid transparent',
                  borderTop: '112px solid #a32828',
                  transformOrigin: 'top',
                  transform: opened ? 'rotateX(180deg)' : 'rotateX(0deg)',
                }}
              />
              {/* wax seal */}
              <div className="absolute left-1/2 top-[112px] z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-[#c9a14a] shadow-lg shadow-black/40 transition-transform duration-500 group-hover:scale-110">
                <Heart className="h-6 w-6 fill-[#5a1414] text-[#5a1414]" />
              </div>
              {/* hint */}
              <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 animate-pulse text-sm text-[#f5e6c8]/60">
                Ketuk untuk membuka
              </p>
            </button>
          </div>
        ) : (
          <div
            className="relative w-full max-w-lg rounded-lg border border-[#c9a14a]/30 bg-[#241414]/90 p-8 text-center shadow-2xl shadow-black/60 sm:p-10"
            style={{ animation: 'letterReveal 0.8s ease-out both' }}
          >
            {/*  VIDEO GOOGLE DRIVE DI SINI */}
            <div className="mb-6 w-full">
              <div className="relative w-full overflow-hidden rounded-lg shadow-2xl bg-black" style={{ paddingBottom: '56.25%' }}>
                {/* Loading Spinner */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#c9a14a]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p className="text-xs text-[#e8d5b5]/60">Menyiapkan video...</p>
                  </div>
                )}

                <iframe
                  src={`https://drive.google.com/file/d/${VIDEO_ID}/preview`}
                  className={`absolute top-0 left-0 h-full w-full border-0 transition-opacity duration-500 ${
                    isVideoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="Video Kenangan"
                  onLoad={() => setIsVideoLoaded(true)}
                />
                
                {/* Fallback jika iframe gagal dimuat */}
                <a 
                  href={`https://drive.google.com/file/d/${VIDEO_ID}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-2 right-2 z-20 flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur hover:bg-black/80"
                >
                  <ExternalLink className="h-3 w-3" /> Buka di Tab Baru
                </a>
              </div>
            </div>

            <div className="mb-6 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a14a]/15">
                <Heart className="h-7 w-7 fill-[#c9a14a] text-[#c9a14a]" />
              </div>
            </div>

            <p className="mb-2 font-serif text-sm uppercase tracking-[0.3em] text-[#c9a14a]/80">
              For You, My Love
            </p>
            <h2 className="mb-5 font-serif text-2xl font-semibold text-[#f5e6c8] sm:text-3xl">
              Selamat datang di bioskop Core Memory
            </h2>
            {/* <p className="mb-8 leading-relaxed text-[#e8d5b5]/80">
              Behold, dear companion, in this chamber of delight,
              No moving picture shines more bright
              Than memories of days gone by,
              When Mickey, Donald, Tom did fly
              Across our young and wonder-struck eyes.
              So rest thy weary bones and see
              The magic that once captivated thee.
              This screen, our private realm so dear,
              Where laughter echoes, crystal clear.
              For in these frames, our childhood lives,
              A timeless gift the past still gives.
            </p> */}

            <button
              type="button"
              onClick={onOpenCinema}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c9a14a] to-[#e0b85a] px-8 py-3 font-semibold text-[#1a0e0e] shadow-lg shadow-[#c9a14a]/20 transition-all hover:scale-105 hover:shadow-[#c9a14a]/40"
            >
              Buka Bioskop Core Memory
              <Heart className="h-4 w-4 fill-[#1a0e0e] transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}