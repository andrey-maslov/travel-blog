'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@/components/features/article/ArticleAuthor';
import { CtfImage } from '@/components/features/contentful/CtfImage';
import { PageBlogPostFieldsFragment } from '@/types/contentful/generated';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { featuredImage, publishedDate, slug, title } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <Link className="flex flex-col" href={`/${slug}`}>
      <div
        className={twMerge(
          'border-gray300 flex flex-1 flex-col overflow-hidden rounded-2xl border shadow-lg',
          className,
        )}>
        {featuredImage && (
          <div {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'object-cover aspect-[16/10] w-full' }}
              {...featuredImage}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col px-4 py-3 md:px-5 md:py-4 lg:px-7 lg:py-5">
          {title && (
            <p className="h3 text-gray800 mb-2 md:mb-3" {...inspectorProps({ fieldId: 'title' })}>
              {title}
            </p>
          )}

          <div className="mt-auto flex items-center">
            <ArticleAuthor article={article} />
            <div
              className={twMerge('text-gray600 ml-auto pl-2 text-xs')}
              {...inspectorProps({ fieldId: 'publishedDate' })}>
              {/*<FormatDate date={publishedDate} />*/}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
