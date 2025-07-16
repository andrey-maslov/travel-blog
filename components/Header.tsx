import Link from 'next/link';

import { MobileDrawer } from '@/components/MobileDrawer';
import { navigationConfig } from '@/config/navigation';

export const Header: React.FC = () => {
  const { headerLinks } = navigationConfig;
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between border-b border-white/40 px-5 py-4">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl md:tracking-tighter">
          <Link href="/" className="hover:underline">
            blog.tripplanr
          </Link>
        </h2>
        <nav className="hidden gap-6 font-light text-gray-500 md:flex">
          {headerLinks.map(({ title, href }) => (
            <Link key={href} href={href} className="hover:underline">
              {title}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <MobileDrawer />
        </div>
      </div>
    </header>
  );
};
