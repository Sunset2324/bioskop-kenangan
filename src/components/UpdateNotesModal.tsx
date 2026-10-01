import { useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { changelogData } from '@/data/changelog';

interface UpdateNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdateNotesModal({ isOpen, onClose }: UpdateNotesModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto rounded-xl border border-[#c9a14a]/30 bg-[#1a0e0e] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#c9a14a]/15 bg-[#1a0e0e] px-5 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#c9a14a]" />
            <h3 className="font-serif text-lg font-semibold text-[#f5e6c8]">Catatan Pembaruan</h3>
          </div>
          <button onClick={onClose} className="text-[#e8d5b5]/70 hover:text-[#c9a14a]">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-5">
          {changelogData.map((entry, index) => (
            <div key={index} className="relative pl-4 border-l-2 border-[#c9a14a]/30">
              <div className="mb-1 flex items-baseline gap-2">
                <span className="rounded bg-[#c9a14a]/20 px-2 py-0.5 text-xs font-bold text-[#c9a14a]">
                  {entry.version}
                </span>
                <span className="text-xs text-[#e8d5b5]/50">{entry.date}</span>
              </div>
              <h4 className="mb-2 font-serif text-base font-semibold text-[#f5e6c8]">{entry.title}</h4>
              <ul className="space-y-1.5">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#e8d5b5]/70">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#c9a14a]/60" />
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}