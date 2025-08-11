'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppSelector } from '@/hooks';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, requires2FA, is2FAVerified } = useAppSelector((s) => s.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    // Not authenticated → login
    if (!isAuthenticated && !token) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    // 2FA required and not yet verified → 2FA page
    if (requires2FA && !is2FAVerified) {
      router.replace(`/2fa?next=${encodeURIComponent(pathname)}`);
      return;
    }
  }, [isAuthenticated, requires2FA, is2FAVerified, router, pathname]);

  return <>{children}</>;
}
