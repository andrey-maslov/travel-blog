import { draftMode } from 'next/headers';
import Link from 'next/link';

import { ArticleContent } from '@/components/features/article/ArticleContent';
import { getAllPosts, getPostAndMorePosts, getPostBySlug } from '@/lib/api';

import Avatar from '../../../components/Avatar';
import CoverImage from '../../../components/CoverImage';
import Date from '../../../components/DateComponent';
import MoreStories from '../../../components/MoreStories';

type MetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: MetadataProps) {
  const slug = (await params).slug;

  const post = await getPostBySlug(slug);

  return {
    title: post?.title,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

  if (!post) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl px-5">
      <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
        <Link href="/" className="hover:underline">
          blog.tripplanr
        </Link>
      </h2>
      <article>
        <h1 className="mb-12 text-center text-4xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-6xl">
          {post.title}
        </h1>
        <div className="mb-6 text-lg">
          <Date dateString={post.date} />
        </div>
        {/*<div className="hidden md:mb-12 md:block">*/}
        {/*  {post.author && <Avatar name={post.author.name} picture={post.author.picture} />}*/}
        {/*</div>*/}
        <div className="mb-8 sm:mx-0 md:mb-16">
          <CoverImage title={post.title} url={post.coverImage.url} />
        </div>
        {/*<div className="mx-auto">*/}
        {/*  <div className="mb-6 block md:hidden">*/}
        {/*    {post.author && <Avatar name={post.author.name} picture={post.author.picture} />}*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div className="">
          <ArticleContent article={post.content} />
        </div>
      </article>
      <hr className="border-accent-2 mb-24 mt-28" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
