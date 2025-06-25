import { PortableText } from '@portabletext/react';
// import { errorLog } from 'napi-postinstall/lib/helpers';
// import { draftMode } from 'next/headers';
import Script from 'next/script';

import CoverImage from '@/components/CoverImage';
import Date from '@/components/DateComponent';
import MoreStories from '@/components/MoreStories';
import { PortableTextComponents } from '@/components/PortableTextComponents';
import { RichSanityImage } from '@/components/SanityImage';
import { getAllPosts, getPostAndMorePosts, getPostBySlug } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/sanityImageUrl';

type MetadataProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const ogImageUrl = post.mainImage ? urlFor(post.mainImage).url() : '/default-og-image.jpg';

  return {
    title: post.title ?? '',
    description: post.seoDescription ?? post.excerpt ?? '',
    openGraph: {
      title: post.title ?? '',
      description: post.seoDescription ?? post.excerpt ?? '',
      images: [{ url: ogImageUrl, alt: post.title ?? '' }],
      type: 'article',
      url: `https://blog.tripplanr.io/posts/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map(post => ({
    slug: post.slug?.current,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params: { slug } }: PageProps) {
  const { post, morePosts } = await getPostAndMorePosts(slug);

  if (!post) return <p>Пост не найден</p>;

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() || null : null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-8">
      <article>
        <h1 className="mb-12 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
          {post.title}
        </h1>
        <div className="mb-6 text-lg">
          <Date dateString={post.publishedAt ?? ''} />
        </div>
        {imageUrl && (
          <div className="mb-8 sm:mx-0 md:mb-16">
            <CoverImage
              title={post.title ?? ''}
              image={post.mainImage as RichSanityImage}
              width={1107}
              height={665}
            />
          </div>
        )}
        <div className="prose mx-0 lg:mx-6">
          {post.body && <PortableText value={post.body} components={PortableTextComponents} />}
        </div>
      </article>

      <hr className="border-accent-2 mb-24 mt-28" />

      {morePosts && morePosts.length > 0 && <MoreStories morePosts={morePosts} />}

      <Script id="jsonld-article" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://your-domain.com/posts/${slug}`,
          },
          headline: post.title,
          description: post.seoDescription ?? post.excerpt,
          image: imageUrl,
          datePublished: post.publishedAt,
          dateModified: post.publishedAt,
        })}
      </Script>
    </div>
  );
}
