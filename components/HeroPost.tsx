import Link from 'next/link';

import CoverImage from '@/components/CoverImage';
import Date from '@/components/DateComponent';
import { RichSanityImage } from '@/components/SanityImage';
import { PostCategory } from '@/components/PostCategory';

interface Props {
  title: string | null;
  coverImage: RichSanityImage | null;
  date: string | null;
  excerpt: string | null;
  slug: string | null | undefined;
  author?: any | null;
  category?: PostCategory;
}

export function HeroPost({ title, coverImage, date, excerpt, slug, category }: Props) {
  return (
    <section>
      {coverImage && (
        <div className="mb-6 md:mb-10">
          <CoverImage title={title ?? ''} slug={slug ?? ''} image={coverImage} width={1107} height={600} />
        </div>
      )}
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-2xl font-bold leading-tight lg:text-4xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="text-md mb-4 md:mb-0 flex justify-between">
            <div className="min-w-1">
              <PostCategory category={category}/>
            </div>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-md leading-relaxed">{excerpt}</p>
          {/*{author && <Avatar name={author.name} picture={author.picture} />}*/}
        </div>
      </div>
    </section>
  );
}
