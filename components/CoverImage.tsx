import Link from 'next/link';

import ContentfulImage from './ContentfulImage';

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

interface Props {
  title: string;
  url: string;
  slug?: string;
}

export default function CoverImage({ title, url, slug }: Props) {
  const image = (
    <ContentfulImage
      alt={`Cover Image for ${title}`}
      priority
      width={2000}
      height={1000}
      className={cn('shadow-xl rounded-2xl', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
