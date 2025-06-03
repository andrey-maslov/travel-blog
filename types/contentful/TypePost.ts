import { Document } from '@contentful/rich-text-types';
import type {Asset, EntryFields, TagLink, TaxonomyConceptLink} from 'contentful';

import type { TypeAuthorFields } from './TypeAuthor';

export interface TypePostFields {
  title: EntryFields.Symbol;
  slug: EntryFields.Symbol;
  content: Document;
  excerpt: EntryFields.Symbol;
  coverImage: Asset;
  date: EntryFields.Date;
  author: { fields: TypeAuthorFields; metadata: Record<string, string>, sys: Record<string, string> };
  fields: []; // added manually
  seoDescription: string;
}

export type TypePost = {
  fields: TypePostFields;
  sys: {
    space: { sys: { type: string, linkType: string, id: string } };
    id: string;
    type: 'Entry';
    createdAt: string;
    updatedAt: string;
    environment: { sys: { type: string, linkType: string, id: string } };
    publishedVersion: number;
    revision: number;
    contentType: { sys: { type: string, linkType: string, id: string } };
    locale?: string | undefined;
  };
  metadata: { tags: { sys: TagLink; }[], concepts?: { sys: TaxonomyConceptLink }[] | undefined };
  // contentTypeId: string; // ???
}
