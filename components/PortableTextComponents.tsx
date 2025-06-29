import { SanityImage } from '@/components/SanityImage';

export const PortableTextComponents = {
  types: {
    image: ({ value, isInline }: any) => {
      return <SanityImage value={value} isInline={isInline} />;
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href || '#';
      const isExternal = href.startsWith('http');
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      );
    },
  },
};
