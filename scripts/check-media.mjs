import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(readFileSync('src/data/generated-image-info.json', 'utf8'));
const photoPaths = Object.keys(manifest).filter(p => p.startsWith('/images/photography/'));
assert.equal(photoPaths.length, 16, 'Expected sixteen optimized gallery photographs');
assert.ok(Object.keys(manifest).length >= 21, 'Expected hero, portrait, music, and gallery images');

for (const [original, info] of Object.entries(manifest)) {
  assert.ok(info.width > 0 && info.height > 0, 'Missing source dimensions for ' + original);
  assert.ok(info.variants.length >= 1, 'Missing responsive variants for ' + original);
  let previousWidth = 0;
  for (const v of info.variants) {
    assert.ok(v.width > previousWidth, 'Variants must be sorted by width: ' + original);
    previousWidth = v.width;
    const file = path.join('dist', v.src.slice(1));
    assert.ok(existsSync(file) && statSync(file).size > 0, 'Missing generated WebP: ' + file);
    const header = readFileSync(file).subarray(0, 12);
    assert.equal(header.toString('ascii', 0, 4), 'RIFF', 'Invalid RIFF header: ' + file);
    assert.equal(header.toString('ascii', 8, 12), 'WEBP', 'Invalid WEBP header: ' + file);
  }
}

for (const route of ['index.html', 'photography/index.html']) {
  const html = readFileSync(path.join('dist', route), 'utf8');
  assert.ok(html.includes('srcset='), 'No responsive image srcset in ' + route);
  assert.ok(html.includes('/images/optimized/photography/'), 'Gallery did not use optimized images in ' + route);
  assert.ok(html.includes('loading="lazy"'), 'Gallery images should be lazy loaded in ' + route);
}
const homepage = readFileSync('dist/index.html', 'utf8');
assert.ok(homepage.includes('fetchpriority="high"'), 'Hero image must receive high fetch priority');
assert.ok(homepage.includes('alt=""'), 'Decorative hero image must not be announced to screen readers');
const photoPage = readFileSync('dist/photography/index.html', 'utf8');
for (const text of ['Weathered driftwood roots', 'Rocky tidal shore', 'partly frozen mountain lake', 'city lights']) {
  assert.ok(photoPage.toLowerCase().includes(text.toLowerCase()), 'Missing reviewed photograph description: ' + text);
}
const header = readFileSync('dist/index.html', 'utf8');
assert.ok(header.includes('aria-controls="site-primary-nav"'), 'Missing menu control relationship');
assert.ok(header.includes('aria-expanded="false"'), 'Missing collapsed menu state');
assert.ok(header.includes('aria-label="Main navigation"'), 'Missing navigation label');
console.log('PASS: responsive gallery variants, content descriptions, and accessible menu markup');
