import { useState } from 'react';
import { Lock, Mail, AlertCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<any>;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const err = await onLogin(email, password);
    
    if (err) {
      setError(err.message);
      setIsLoading(false);
    }
    // Jika berhasil, useAuth akan otomatis update state dan pindah halaman
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a0e0e] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#c9a14a]/20 bg-[#241414] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#c9a14a]/10">
            <Lock className="h-8 w-8 text-[#c9a14a]" />
          </div>
          <h1 className="font-serif text-3xl font-semibold text-[#f5e6c8]">
            Area Privat
          </h1>
          <p className="mt-2 text-sm text-[#e8d5b5]/60">
            Masukkan kunci untuk masuk ke bioskop kita
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#c9a14a]/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e8d5b5]/40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-[#c9a14a]/20 bg-[#1a0e0e] py-3 pl-10 pr-4 text-[#f5e6c8] placeholder-[#e8d5b5]/30 focus:border-[#c9a14a] focus:outline-none"
                placeholder="nama@email.com"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-[#c9a14a]/80">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e8d5b5]/40" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-[#c9a14a]/20 bg-[#1a0e0e] py-3 pl-10 pr-4 text-[#f5e6c8] placeholder-[#e8d5b5]/30 focus:border-[#c9a14a] focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-[#c9a14a] to-[#e0b85a] py-3 font-semibold text-[#1a0e0e] transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk Bioskop'}
          </button>
        </form>
      </div>
    </div>
  );
}