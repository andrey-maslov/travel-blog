import Link from 'next/link';

import { navigationConfig } from '@/config/navigation';

export const Header: React.FC = () => {
  const { headerLinks } = navigationConfig;
  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
      <h2 className="text-2xl font-bold tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          blog.tripplanr
        </Link>
      </h2>
      <nav className="hidden gap-6 text-sm font-light text-gray-500 md:flex">
        {headerLinks.map(({ title, href }) => (
          <Link key={href} href={href} className="hover:underline">
            {title}
          </Link>
        ))}
      </nav>
    </header>
  );
};
