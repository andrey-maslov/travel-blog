import { Document } from '@contentful/rich-text-types';

export type Post = {
  slug: string;
  title: string;
  coverImage: {
    url: string;
  };
  date: string;
  author: {
    name: string;
    picture: string;
  };
  excerpt: string;
  content: Document; // TODO replace by the proper type
};
