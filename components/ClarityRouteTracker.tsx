'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    clarity?: (...args: any[]) => void;
  }
}

export function ClarityRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', 'page_view'); // кастомная метка на смену маршрута
    }
  }, [pathname, searchParams]);

  return null;
}
