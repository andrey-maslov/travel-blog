import { TypePost } from '@/types/contentful';
import { Post } from '@/types/types';

export const transformPost = (entry: TypePost): Post => {

  return {
    slug: entry.fields.slug,
    title: entry.fields.title,
    coverImage: {
      url: entry.fields.coverImage?.fields?.file?.url?.toString() ?? '',
    },
    date: entry.fields.date,
    author: {
      name: entry.fields.author.fields.name,
      picture: entry.fields.author.fields.picture?.fields?.file?.url?.toString() ?? '',
    },
    excerpt: entry.fields.excerpt,
    content: entry.fields.content,
  };
};
