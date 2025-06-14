import { draftMode } from 'next/headers';

import { ArticleContent } from '@/components/features/article/ArticleContent';
import { getAllPosts, getPostAndMorePosts, getPostBySlug } from '@/lib/api';
import { normalizeUrl } from '@/lib/utils';

import CoverImage from '../../../components/CoverImage';
import Date from '../../../components/DateComponent';
import MoreStories from '../../../components/MoreStories';
import Script from "next/script";

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

  if (!post) return {};

  return {
    title: post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.seoDescription || post.excerpt,
      images: [
        {
          url: post.coverImage?.url ? normalizeUrl(post.coverImage.url) : '/default-og-image.jpg',
          alt: post.title,
        },
      ],
      type: 'article',
      url: `https://blog.tripplanr.io/posts/${slug}`,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();
  const { post, morePosts } = await getPostAndMorePosts(params.slug, isEnabled);

  if (!post) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <article>
        <h1 className="mb-12 text-4xl font-bold leading-tight tracking-tighter md:text-5xl md:leading-none lg:text-6xl">
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

        <div className="mx-0 lg:mx-6">
          <ArticleContent article={post.content} />
        </div>
      </article>
      <hr className="border-accent-2 mb-24 mt-28" />
      <MoreStories morePosts={morePosts} />
      <Script id="jsonld-article" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://blog.tripplanr.io/posts/${post.slug}`,
          },
          "headline": post.title,
          "description": post.seoDescription || post.excerpt,
          "image": post.coverImage?.url,
          "author": {
            "@type": "Person",
            "name": post.author?.name || "Tripplanr",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Tripplanr",
            // "logo": {
            //   "@type": "ImageObject",
            //   "url": "https://blog.tripplanr.io/logo.png"
            // }
          },
          "datePublished": post.date,
          "dateModified": post.date,
        })}
      </Script>
    </div>
  );
}
