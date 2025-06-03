'use client';

import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { twMerge } from 'tailwind-merge';

import {CtfImage} from "@/components/features/contentful/CtfImage";
import {ComponentRichImage} from "@/types/contentful/generated";


interface ArticleImageProps {
  image: ComponentRichImage;
}

export const ArticleImage = ({ image }: ArticleImageProps) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: image.sys.id });

  return image.image ? (
    <figure>
      <div className="flex justify-center" {...inspectorProps({ fieldId: 'image' })}>
        <CtfImage
          nextImageProps={{
            className: twMerge(
              'mt-0 mb-0 ',
              image.fullWidth
                ? 'md:w-screen md:max-w-[calc(100vw-40px)] md:shrink-0'
                : 'rounded-md border border-gray300 shadow-lg',
            ),
          }}
          {...image.image}
        />
      </div>
      {image.caption && (
        <figcaption className="mt-4" {...inspectorProps({ fieldId: 'caption' })}>
          {image.caption}
        </figcaption>
      )}
    </figure>
  ) : null;
};
