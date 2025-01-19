// lib/api.ts
import client from './contentfulClient';
import {TypePost, TypeAuthor} from "@/types/contentful";

interface QueryParams {
    [key: string]: any;
}

interface Post {
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
    content: any; // Замените 'any' на соответствующий тип, если он определен
}

// Преобразование данных поста
function transformPost(entry: TypePost): Post {
    return {
        slug: entry.fields.slug,
        title: entry.fields.title,
        coverImage: {
            url: entry.fields.coverImage?.fields?.file?.url?.toString() ?? ''
        },
        date: entry.fields.date,
        author: {
            name: entry.fields.author.name,
            picture: entry.fields.author.picture?.fields?.file?.url?.toString() ?? '',
        },
        excerpt: entry.fields.excerpt,
        content: entry.fields.content,
    };
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

export async function getPostAndMorePosts(slug: string, preview = false): Promise<{ post: Post | null; morePosts: Post[] }> {
    const post = await getPostBySlug(slug, preview);

    const morePostsResponse = await client.getEntries<TypePost & { contentTypeId: string }>({
        content_type: 'post',
        'fields.slug[ne]': slug, // [ne] - not equal
        // order: '-fields.date',
        limit: 2,
        include: 2,
        ...(preview && { 'sys.revision[gt]': 0 }),
    } as QueryParams);

    return {
        post,
        morePosts: morePostsResponse.items.map(transformPost),
    };
}
