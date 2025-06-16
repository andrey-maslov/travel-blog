import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';

import { ArticleImage } from '@/components/features/article/ArticleImage';
import { ComponentRichImage } from '@/types/contentful/generated';

export type EmbeddedEntryType = ComponentRichImage | null;

export const EmbeddedAssetAsArticleImage = ({ asset }: { asset: any }) => {
  if (!asset?.fields?.file) return null;

  const { file, description, title } = asset.fields;

  const image = {
    __typename: 'ComponentRichImage',
    sys: asset.sys,
    fullWidth: false,
    caption: description || '',
    image: {
      url: file.url.startsWith('http') ? file.url : `https:${file.url}`,
      width: file.details?.image?.width,
      height: file.details?.image?.height,
      description,
      title,
    },
  };

  return <ArticleImage image={image as ComponentRichImage} />;
};

export interface ContentfulRichTextInterface {
  content: Document;
  links?:
    | {
        entries: {
          block: Array<EmbeddedEntryType>;
        };
      }
    | any;
}

export const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  switch (entry?.__typename) {
    case 'ComponentRichImage':
      return <ArticleImage image={entry} />;
    default:
      return null;
  }
};

export const contentfulBaseRichTextOptions = ({ links }: ContentfulRichTextInterface): Options => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entry = links?.entries?.block?.find(
        (item: EmbeddedEntryType) => item?.sys?.id === node.data.target.sys.id,
      );

      if (!entry) return null;

      return <EmbeddedEntry {...entry} />;
    },
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const asset =
        links?.assets?.block?.find((item: any) => item?.sys?.id === node.data.target.sys.id) ||
        node.data.target;

      return asset ? <EmbeddedAssetAsArticleImage asset={asset} /> : null;
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const url = node.data.uri;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          {children}
        </a>
      );
    },
  },
});

export const CtfRichText = ({ content, links }: ContentfulRichTextInterface) => {
  const baseOptions = contentfulBaseRichTextOptions({ links, content });

  return <article className="prose">{documentToReactComponents(content, baseOptions)}</article>;
};
