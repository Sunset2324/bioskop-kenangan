import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import EnvelopeLanding from '@/components/EnvelopeLanding';
import CinemaPage from '@/components/CinemaPage';
import LoginPage from '@/components/LoginPage';

export default function App() {
  const { user, loading, signIn } = useAuth();
  const [entered, setEntered] = useState(false);

  // 1. Tampilkan loading saat cek sesi login
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1a0e0e]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#c9a14a] border-t-transparent"></div>
      </div>
    );
  }

  // 2. Jika TIDAK login, tampilkan halaman Login
  if (!user) {
    return <LoginPage onLogin={signIn} />;
  }

  // 3. Jika sudah login, tampilkan alur Bioskop
  if (!entered) {
    return <EnvelopeLanding onOpenCinema={() => setEntered(true)} />;
  }

  return <CinemaPage />;
}