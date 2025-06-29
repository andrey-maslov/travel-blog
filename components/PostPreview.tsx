import Link from 'next/link';

import CoverImage from '@/components/CoverImage';
import DateComponent from '@/components/DateComponent';
import { RichSanityImage } from '@/components/SanityImage';

interface Props {
  title: string | null;
  coverImage: RichSanityImage | null;
  date: string | null;
  excerpt: string | null;
  slug: string | null | undefined;
  author?: any | null;
}

export function PostPreview({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <div>
      {coverImage && (
        <div className="mb-5">
          <CoverImage
            title={title ?? ''}
            slug={slug ?? ''}
            image={coverImage}
            width={481}
            height={317}
          />
        </div>
      )}
      <h3 className="leading-tight mb-3 text-2xl font-bold">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="text-md mb-4 leading-relaxed">{excerpt}</p>
      {/*{author && <Avatar name={author.name} picture={author.picture} />}*/}
    </div>
  );
}
