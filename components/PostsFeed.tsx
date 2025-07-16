import { PostPreview } from '@/components/PostPreview';
import { RichSanityImage } from '@/components/SanityImage';
import { POSTS_QUERYResult } from '@/sanity/sanity.types';

interface Props {
  posts: POSTS_QUERYResult;
}

export function PostsFeed({ posts }: Props) {
  return (
    <section>
      <div className="mb-20 grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map(post => (
          <PostPreview
            key={post._id}
            title={post.title}
            coverImage={post.mainImage as RichSanityImage}
            date={post.publishedAt}
            // author={post}
            slug={post.slug?.current}
            excerpt={post?.excerpt}
            category={post.category}
          />
        ))}
      </div>
    </section>
  );
}
