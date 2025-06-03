'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { CtfImage } from '@/components/features/contentful/CtfImage';
import { PageBlogPostFieldsFragment } from '@/types/contentful/generated';

interface ArticleAuthorProps {
  article: PageBlogPostFieldsFragment;
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  const { author } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: author?.sys.id });

  return (
    <div className="flex items-center">
      <div
        className="border-blue500 mr-2 overflow-hidden rounded-full border"
        {...inspectorProps({ fieldId: 'avatar' })}>
        {author?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 28,
              height: 28,
              sizes: undefined,
              placeholder: undefined,
            }}
            {...author.avatar}
          />
        )}
      </div>
      <span className="text-gray600 text-xs leading-none" {...inspectorProps({ fieldId: 'name' })}>
        {author?.name}
      </span>
    </div>
  );
};
