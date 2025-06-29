import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://blog.tripplanr.io',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // {
    //   url: 'https://blog.tripplanr.io/about',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: 'https://blog.tripplanr.io/posts',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.6,
    // },
    {
      url: 'https://blog.tripplanr.io/posts/pervyj-post',
      lastModified: new Date('2025-06-06'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://blog.tripplanr.io/posts/kozanov-mikroraion-na-okraine-wroclava',
      lastModified: new Date('2025-06-06'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://blog.tripplanr.io/posts/karkonosze-pohod-szklarska-karpacz',
      lastModified: new Date('2025-06-16'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://blog.tripplanr.io/posts/nowy-dwor-panelny-raion-wroclava',
      lastModified: new Date('2025-06-29'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}