import { Metadata } from 'next';
import { draftMode } from 'next/headers';

import { HeroPost } from '@/components/HeroPost';
import { Intro } from '@/components/Intro';
import { getAllPosts } from '@/lib/api';

import MoreStories from '../components/MoreStories';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Блог о путешествиях, местах и маршрутах — blog.tripplanr',
    description: 'Городские прогулки, маршруты, краеведение и фото из путешествий. Личный блог создателя сервиса tripplanr.io',  };
}

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://blog.tripplanr.io",
    "name": "Tripplanr Blog",
    "description": "Городские прогулки, маршруты, краеведение и фото из путешествий. Личный блог создателя сервиса tripplanr.io",
    "publisher": {
      "@type": "Organization",
      "name": "Tripplanr"
    }
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
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      <MoreStories morePosts={morePosts} />
    </div>
  );
}
