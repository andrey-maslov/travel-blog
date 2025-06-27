import { client } from '@/sanity/lib/client';
import { POST_QUERYResult, POSTS_QUERYResult } from '@/sanity/sanity.types';
import { defineQuery } from 'groq';

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)][0...12]{
  _id, title, slug, mainImage, excerpt, publishedAt
}`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  title, body, mainImage, seoDescription, excerpt, publishedAt
}`);

export async function getAllPosts(): Promise<POSTS_QUERYResult> {
  const posts = await client.fetch<POSTS_QUERYResult>(POSTS_QUERY);
  return posts;
}

export async function getPostBySlug(slug: string): Promise<POST_QUERYResult | null> {
  const post = await client.fetch<POST_QUERYResult>(POST_QUERY, { slug });
  return post ?? null;
}

export async function getPostAndMorePosts(
  slug: string,
): Promise<{ post: POST_QUERYResult | null; morePosts: POSTS_QUERYResult }> {
  const post = await getPostBySlug(slug);

  const morePostsQuery = `*[_type == "post" && defined(slug.current) && slug.current != $slug][0...2]{
    _id, title, slug, mainImage, excerpt, publishedAt
  }`;

  const morePosts = await client.fetch<POSTS_QUERYResult>(morePostsQuery, { slug });

  return {
    post,
    morePosts,
  };
}
