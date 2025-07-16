import { Metadata } from 'next'

import { PostsFeed } from '@/components/PostsFeed';
import { getPostsByCategorySlug } from '@/sanity/lib/queries';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props,): Promise<Metadata> {
  const slug = (await params).slug
  const categoryData = await getPostsByCategorySlug(slug)

  if (!categoryData) {
    return {
      title: 'Категория не найдена | Блог о путешествиях',
      description: 'Категория не найдена. Возможно, она была удалена или ещё не создана.',
    }
  }

  return {
    title: `${categoryData.title} | Категория | Блог о путешествиях`,
    description: `Читайте статьи из категории "${categoryData.title}" — путешествия, города, горы и маршруты.`,
    openGraph: {
      title: `${categoryData.title} | Категория | Блог о путешествиях`,
      description: `Обзор статей из категории "${categoryData.title}"`,
      url: `https://blog.tripplanr.io/categories/${slug}`,
      type: 'website',
    },
  }
}

export default async function CategoryPage({ params }: Props) {
  const slug = (await params).slug
  const categoryData = await getPostsByCategorySlug(slug);

  if (!categoryData) {
    return <div className="text-muted-foreground p-6 text-center">Категория не найдена</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-8">
      <h1 className="mb-12 text-2xl font-bold tracking-tight lg:text-4xl">
        Категория: {categoryData.title}
      </h1>
      {categoryData.posts && categoryData.posts.length > 0 ? (
        <PostsFeed posts={categoryData.posts} />
      ) : (
        <div className="text-muted-foreground">Нет постов в этой категории.</div>
      )}
    </div>
  );
}
