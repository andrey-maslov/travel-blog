// lib/api.ts
import { transformPost } from '@/lib/utils';
import { TypePost, TypeAuthor } from '@/types/contentful';
import { Post } from '@/types/types';

import client from './contentfulClient';

interface QueryParams {
  [key: string]: any;
}

export async function getAllPosts(preview = false): Promise<Post[]> {
  const response = await client.getEntries<TypePost & { contentTypeId: string }>({
    content_type: 'post',
    order: '-fields.date',
    include: 2,
    ...(preview && { 'sys.revision[gt]': 0 }),
  } as QueryParams);

  return response.items.map(transformPost);
}

export async function getPostBySlug(slug: string, preview = false): Promise<Post | null> {
  const response = await client.getEntries<TypePost & { contentTypeId: string }>({
    content_type: 'post',
    'fields.slug': slug,
    include: 2,
    ...(preview && { 'sys.revision[gt]': 0 }),
  } as QueryParams);

  return response.items.length > 0 ? transformPost(response.items[0]) : null;
}

export async function getPostAndMorePosts(
  slug: string,
  preview = false,
): Promise<{ post: Post | null; morePosts: Post[] }> {
  const post = await getPostBySlug(slug, preview);

  const morePostsResponse = await client.getEntries<TypePost & { contentTypeId: string }>({
    content_type: 'post',
    'fields.slug[ne]': slug, // [ne] - not equal
    // order: '-fields.date',
    limit: 2,
    include: 2,
    ...(preview && { 'sys.revision[gt]': 0 }),
  } as QueryParams);

  console.log('JSON.stringify(post, null, 2)');

  return {
    post,
    morePosts: morePostsResponse.items.map(transformPost),
  };
}
