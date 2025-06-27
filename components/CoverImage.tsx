import Link from 'next/link';

import { RichSanityImage, SanityImage } from '@/components/SanityImage';

// function cn(...classes: any[]) {
//   return classes.filter(Boolean).join(' ');
// }

interface Props {
  image: RichSanityImage;
  title: string;
  slug?: string;
  width?: number;
  height?: number;
}

export default function CoverImage({ title, image, slug, width, height }: Props) {
  const img = <SanityImage value={image} maxWidth={width} maxHeight={height} />;

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {img}
        </Link>
      ) : (
        img
      )}
    </div>
  );
}
