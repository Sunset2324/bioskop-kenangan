import { useState } from 'react';
import EnvelopeLanding from '@/components/EnvelopeLanding';
import CinemaPage from '@/components/CinemaPage';

export default function App() {
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <EnvelopeLanding onOpenCinema={() => setEntered(true)} />;
  }

  return <CinemaPage />;
}
