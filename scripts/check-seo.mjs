import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const origin = 'https://corrinejblackthorn.com';
const pageFiles = fs.readdirSync('src/pages').filter(name => name.endsWith('.astro'));
const expectedPaths = pageFiles.map(name =>
  name === 'index.astro' ? '/' : '/' + name.slice(0, -6) + '/'
).sort();

const xml = fs.readFileSync('dist/sitemap.xml', 'utf8');
const actualUrls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
const actualPaths = actualUrls.map(link => {
  const parsed = new URL(link);
  assert.equal(parsed.origin, origin, 'Sitemap must use the configured custom domain');
  assert.equal(parsed.search, '', 'Sitemap URLs must not include query strings');
  return parsed.pathname;
}).sort();

assert.deepEqual(actualPaths, expectedPaths,
  'Sitemap URL paths must exactly cover the current Astro pages');
assert.equal(new Set(actualUrls).size, actualUrls.length, 'Duplicate sitemap URLs');

const robots = fs.readFileSync('dist/robots.txt', 'utf8');
assert.ok(robots.includes('Sitemap: ' + origin + '/sitemap.xml'), 'Missing sitemap discovery');

for (const route of expectedPaths) {
  const output = path.join('dist', route === '/' ? 'index.html' : route.slice(1) + 'index.html');
  assert.ok(fs.existsSync(output), 'Missing built HTML: ' + output);
  const html = fs.readFileSync(output, 'utf8');
  const url = origin + route;
  const canonical = html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1];
  const og = html.match(/property="og:url"\s+content="([^"]+)"/)?.[1];
  assert.equal(canonical, url, 'Incorrect canonical URL in ' + output);
  assert.equal(og, url, 'Incorrect Open Graph URL in ' + output);
}
console.log('PASS: ' + expectedPaths.length +
  ' generated Astro pages each have canonical/OG URLs, with exact sitemap coverage and robots discovery.');
