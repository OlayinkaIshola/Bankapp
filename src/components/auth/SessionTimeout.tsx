'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionTimeout({ minutes = 20 }: { minutes?: number }) {
  const router = useRouter();
  const [remaining, setRemaining] = useState(minutes * 60); // seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const resetTimer = () => setRemaining(minutes * 60);
    const tick = () => setRemaining((s) => Math.max(0, s - 1));

    // Activity listeners
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    timerRef.current = setInterval(tick, 1000);

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [minutes]);

  useEffect(() => {
    if (remaining === 0) {
      // On timeout, clear local session and redirect
      localStorage.removeItem('token');
      router.replace('/session-expired');
    }
  }, [remaining, router]);

  return null;
}

