import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useVisitCounter() {
  useEffect(() => {
    // Cek apakah user sudah tercatat di sesi tab ini (agar tidak spam insert saat di-refresh)
    const hasVisitedThisSession = sessionStorage.getItem('has_visited_cinema');
    
    if (hasVisitedThisSession) return;

    async function logVisit() {
      // Catat kunjungan secara diam-diam (Fire and forget)
      await supabase.from('visit_logs').insert({});
      
      // Tandai bahwa sesi ini sudah dicatat
      sessionStorage.setItem('has_visited_cinema', 'true');
    }

    logVisit();
  }, []);
}