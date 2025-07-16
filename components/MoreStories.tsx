import { PostPreview } from '@/components/PostPreview';
import { RichSanityImage } from '@/components/SanityImage';
import { POSTS_QUERYResult } from '@/sanity/sanity.types';

interface Props {
  morePosts: POSTS_QUERYResult;
}

export default function MoreStories({ morePosts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-4xl leading-tight font-bold tracking-tighter md:text-5xl">
        Больше постов
      </h2>
      <div className="mb-20 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {morePosts.map(post => (
          <PostPreview
            key={post._id}
            title={post.title}
            coverImage={post.mainImage as RichSanityImage}
            date={post.publishedAt}
            // author={post}
            slug={post.slug?.current}
            excerpt={post?.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
