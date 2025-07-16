'use client';

import Link from 'next/link';
import React from 'react';

export type PostCategory = {
  title: string;
  slug: {
    current: string;
  };
};

type Props = {
  category?: PostCategory;
};

export const PostCategory: React.FC<Props> = ({ category }) => {
  if (!category) return null;

  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="text-gray-500 underline-offset-2 hover:underline">
      {category.title}
    </Link>
  );
};
