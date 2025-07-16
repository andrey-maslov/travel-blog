import Link from 'next/link';

import CoverImage from '@/components/CoverImage';
import DateComponent from '@/components/DateComponent';
import { PostCategory } from '@/components/PostCategory';
import { RichSanityImage } from '@/components/SanityImage';

interface Props {
  title: string | null;
  coverImage: RichSanityImage | null;
  date: string | null;
  excerpt: string | null;
  slug: string | null | undefined;
  author?: any | null;
  category?: PostCategory;
}

export function PostPreview({ title, coverImage, date, excerpt, category, slug }: Props) {
  return (
    <div>
      <div className="mb-4 flex justify-between">
        <div className="min-w-1"><PostCategory category={category}/></div>
        <DateComponent dateString={date} />
      </div>
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
      <p className="text-md mb-4 leading-relaxed">{excerpt}</p>
      {/*{author && <Avatar name={author.name} picture={author.picture} />}*/}
    </div>
  );
}
