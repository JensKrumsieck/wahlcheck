import type { RequestHandler } from './$types';

const SITE_URL = 'https://bswahl.de';

const pages = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/check', changefreq: 'weekly', priority: 0.8 },
  { path: '/answers', changefreq: 'weekly', priority: 0.8 },
  { path: '/list', changefreq: 'monthly', priority: 0.6 }
];

export const prerender = true;

export const GET: RequestHandler = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
