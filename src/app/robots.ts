import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Applebot-Extended'],
        allow: '/',
      },
    ],
    sitemap: 'https://untrap.io/sitemap.xml',
    host: 'https://untrap.io',
  };
}
