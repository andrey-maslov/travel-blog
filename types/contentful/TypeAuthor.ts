import type { Asset, EntryFields } from 'contentful';

export interface TypeAuthorFields {
  name: EntryFields.Symbol;
  picture: Asset;
  fields: any[]; // added manually
  contentTypeId: any; // added manually
}

export type TypeAuthor = { fields: TypeAuthorFields; contentTypeId: string };
