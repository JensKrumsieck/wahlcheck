import type { RequestHandler } from './$types';
import release from '../../../data/version.json';

const SITE_URL = 'https://bswahl.de';

// The data pipeline stamps its release tag with a leading YYYY-MM-DD; that's the
// most accurate "content last changed" signal we have for the data-driven pages.
const dataLastmod = release.tag.match(/^\d{4}-\d{2}-\d{2}/)?.[0];

const pages = [
  { path: '/', changefreq: 'weekly', priority: 1.0, lastmod: dataLastmod },
  { path: '/check', changefreq: 'weekly', priority: 0.8, lastmod: dataLastmod },
  { path: '/answers', changefreq: 'weekly', priority: 0.8, lastmod: dataLastmod },
  { path: '/list', changefreq: 'monthly', priority: 0.6 }
];

export const prerender = true;

export const GET: RequestHandler = () => {
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}
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
