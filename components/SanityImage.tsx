'use client';

import {
  getImageDimensions,
  SanityImageCrop,
  SanityImageHotspot,
  SanityImageSource,
} from '@sanity/asset-utils';
import Image from 'next/image';

import { urlFor } from '@/sanity/lib/sanityImageUrl';

export type RichSanityImage = {
  _type: 'image';
  asset?: {
    _ref: string;
    _type: 'reference';
  };
  title?: string;
  description?: string;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
};

interface Props {
  value: RichSanityImage;
  maxWidth?: number;
  maxHeight?: number;
  isInline?: boolean;
}

export function SanityImage({ value, maxWidth, maxHeight, isInline }: Props) {
  if (!value?.asset?._ref) return null;

  const { width, height } = getImageDimensions(value as SanityImageSource);
  // const aspect = width / height;
  // const maxWidth = isInline ? 300 : 800;

  return (
    <figure>
      <div className="flex justify-center">
        <Image
          loader={({ width }) =>
            urlFor(value)
              .width(maxWidth ?? width)
              .height(maxHeight ?? height)
              .auto('format')
              .url()!
          }
          src={
            urlFor(value)
              .width(maxWidth ?? width)
              .auto('format')
              .url()!
          }
          alt={value.title || ''}
          width={maxWidth ?? width}
          height={maxHeight ?? height}
          // sizes={isInline ? '300px' : '(max-width: 800px) 100vw, 800px'}
          className="m-0 mb-1 rounded-md border border-gray-300 object-cover shadow-md"
          style={maxHeight ? { maxHeight } : undefined}
          priority={false}
          unoptimized // TODO enable optimization
        />
      </div>
      {value.description && (
        <figcaption className="mt-2 text-center font-light">{value.description}</figcaption>
      )}
    </figure>
  );
}
