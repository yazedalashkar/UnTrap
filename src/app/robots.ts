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
    sitemap: 'https://un-trap.vercel.app/sitemap.xml',
    host: 'https://un-trap.vercel.app',
  };
}
