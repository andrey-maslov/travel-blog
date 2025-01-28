'use client';
import { Document } from '@contentful/rich-text-types';
import {
  useContentfulInspectorMode,
} from '@contentful/live-preview/react';

import {CtfRichText} from "@/components/features/contentful/CtfRichText";

interface ArticleContentProps {
  article: Document;
}
export const ArticleContent = ({ article }: ArticleContentProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: 'article.sys.id' });

  return (
    <div {...inspectorProps({ fieldId: 'content' })}>
      <CtfRichText content={article} />
    </div>
  );
};
