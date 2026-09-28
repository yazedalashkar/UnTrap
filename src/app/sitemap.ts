import { MetadataRoute } from 'next';
import { ServiceRecord } from '@/lib/types';
import servicesData from '@/data/services.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://un-trap.vercel.app';
  const services = servicesData as ServiceRecord[];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date('2026-09-28'),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/cancel`,
      lastModified: new Date('2026-09-28'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/generator`,
      lastModified: new Date('2026-09-28'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/report-pattern`,
      lastModified: new Date('2026-09-28'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/cancel/${service.slug}`,
    lastModified: new Date('2026-09-28'),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
