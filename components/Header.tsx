import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <div className="mx-auto max-w-5xl">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          blog.tripplanr
        </Link>
      </h2>
    </div>
  );
};
