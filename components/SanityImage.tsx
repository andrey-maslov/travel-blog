'use client';

import { getImageDimensions } from '@sanity/asset-utils';
import Image from 'next/image';

import { urlFor } from '@/sanity/lib/sanityImageUrl';

export function SanityImage({ value, isInline }: { value: any; isInline?: boolean }) {
  if (!value?.asset?._ref) return null;

  const { width, height } = getImageDimensions(value);
  const aspect = width / height;
  const maxWidth = isInline ? 300 : 800;

  return (
    <figure>
      <div className="flex justify-center">
        <Image
          loader={({ width: w }) => urlFor(value).width(w).auto('format').url()!}
          src={urlFor(value).width(maxWidth).auto('format').url()!}
          alt={value.title || ''}
          width={width}
          height={height}
          // sizes={isInline ? '300px' : '(max-width: 800px) 100vw, 800px'}
          className="m-0 rounded-md border border-gray-300 shadow-lg"
          priority={false}
        />
      </div>
      {value.description && (
        <figcaption className="mt-2 text-center">{value.description}</figcaption>
      )}
    </figure>
  );
}
