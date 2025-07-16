import Link from 'next/link';

import CoverImage from '@/components/CoverImage';
import Date from '@/components/DateComponent';
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

export function HeroPost({ title, coverImage, date, excerpt, slug, category }: Props) {
  return (
    <section>
      {coverImage && (
        <div className="mb-6 md:mb-10">
          <CoverImage
            title={title ?? ''}
            slug={slug ?? ''}
            image={coverImage}
            width={1107}
            height={600}
          />
        </div>
      )}
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-2xl leading-tight font-bold lg:text-4xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="text-md mb-4 flex justify-between md:mb-0">
            <div className="min-w-1">
              <PostCategory category={category} />
            </div>
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-md mb-4 leading-relaxed">{excerpt}</p>
          {/*{author && <Avatar name={author.name} picture={author.picture} />}*/}
        </div>
      </div>
    </section>
  );
}
