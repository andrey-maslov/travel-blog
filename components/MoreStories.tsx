import { PostPreview } from '@/components/PostPreview';
import { Post } from '@/types/types';

interface Props {
  morePosts: Post[];
}

export default function MoreStories({ morePosts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
        Больше постов
      </h2>
      <div className="mb-20 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {morePosts.map(post => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
