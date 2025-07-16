'use client';

import { X, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import { navigationConfig } from '@/config/navigation';

export const MobileDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} aria-label="Открыть меню" className="p-2">
        <Menu className="text-foreground h-6 w-6" />
      </button>

      {isOpen && (
        <div className="min-h-screen">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <aside className="fixed top-0 left-0 z-50 h-full w-4/5 max-w-sm translate-x-0 transform bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-semibold">Меню</span>
              <button onClick={() => setIsOpen(false)} aria-label="Закрыть меню">
                <X className="text-muted-foreground h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {navigationConfig.headerLinks.map(({ title, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-foreground text-lg font-medium"
                  onClick={() => setIsOpen(false)}>
                  {title}
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};
