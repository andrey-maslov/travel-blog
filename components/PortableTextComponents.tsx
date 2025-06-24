import { SanityImage } from '@/components/SanityImage';

export const PortableTextComponents = {
  types: {
    image: ({ value, isInline }: any) => {
      return <SanityImage value={value} isInline={isInline} />;
    },
  },
};
