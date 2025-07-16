export const generateMetadata = () => {
  return {
    title: 'Категории | Блог о путешествиях и краеведении',
    description: 'Обзор всех категорий блога: города, районы, горные походы, путешествия и другие темы. Выберите интересующую вас категорию и читайте связанные статьи.',
    openGraph: {
      title: 'Категории | Блог о путешествиях и краеведении',
      description: 'Изучайте статьи по темам: города, районы, горы, путешествия. Полный список категорий в блоге.',
      url: 'https://blog.tripplanr.io/categories',
      type: 'website',
    },
  };
};
import Link from 'next/link';

import { getCategories } from '@/sanity/lib/queries';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <h1 className="mb-6 text-3xl font-bold tracking-tight lg:text-4xl">Категории</h1>
      <ul className="space-y-2">
        {categories.map((cat: any) => (
          <li key={cat.slug.current}>
            <Link
              href={`/categories/${cat.slug.current}`}
              className="text-primary text-lg font-medium hover:underline">
              {cat.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
