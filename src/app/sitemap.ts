import type { MetadataRoute } from 'next';
import { SEED_PROPERTIES } from '@/lib/seedData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://brickly-estate.example.com';

  const propertyUrls = SEED_PROPERTIES.map((p) => ({
    url: `${baseUrl}/listing/${p.id}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/calculators`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/neighborhoods`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  return [...staticUrls, ...propertyUrls];
}
