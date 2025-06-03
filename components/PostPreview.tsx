import Link from 'next/link';

import Avatar from '@/components/Avatar';
import CoverImage from '@/components/CoverImage';
import DateComponent from '@/components/DateComponent';

interface Props {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}

export function PostPreview({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="mb-3 text-2xl leading-1 font-bold">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4">
        <DateComponent dateString={date} />
      </div>
      <p className="mb-4 leading-relaxed text-md">{excerpt}</p>
      {/*{author && <Avatar name={author.name} picture={author.picture} />}*/}
    </div>
  );
}
