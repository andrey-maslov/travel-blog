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
import { PostTags } from '@/components/PostTags';
import { PostCategory } from '@/components/PostCategory';

type MetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { slug } = await params;
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

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const { post, morePosts } = await getPostAndMorePosts(slug);

  if (!post) return <p>Пост не найден</p>;

  const imageUrl = post.mainImage ? urlFor(post.mainImage).url() || null : null;

  // console.log(post)

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <article>
        <div className="flex justify-between mb-6">
          <PostCategory category={post.category}/>
          <Date dateString={post.publishedAt ?? ''} />
        </div>
        <h1 className="mb-12 text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
          {post.title}
        </h1>
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

      <PostTags tags={post?.tags}/>

      <hr className="border-gray-200 my-12 lg:my-24" />

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
