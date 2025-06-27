import { Metadata } from 'next';

import { HeroPost } from '@/components/HeroPost';
import { Intro } from '@/components/Intro';
import { RichSanityImage } from '@/components/SanityImage';
import { getAllPosts } from '@/sanity/lib/queries';

import MoreStories from '../components/MoreStories';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Блог о путешествиях, местах и маршрутах — blog.tripplanr',
    description:
      'Городские прогулки, маршруты, краеведение и фото из путешествий. Личный блог создателя сервиса tripplanr.io',
  };
}

export default async function Page() {
  const allPosts = await getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://blog.tripplanr.io',
    name: 'Tripplanr Blog',
    description:
      'Городские прогулки, маршруты, краеведение и фото из путешествий. Личный блог создателя сервиса tripplanr.io',
    publisher: {
      '@type': 'Organization',
      name: 'Tripplanr',
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.mainImage as RichSanityImage}
          date={heroPost.publishedAt}
          // author={heroPost.author}
          slug={heroPost.slug?.current}
          excerpt={heroPost?.excerpt}
        />
      )}
      <hr className="border-gray-200 my-12 lg:my-24" />
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
