import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Generate raster assets as part of the site build using the existing Sharp dependency.
const root = process.cwd();
await stat(path.join(root, 'dist', 'index.html'));

const exports = [
  { src: 'public/social/og-default.svg', dest: 'dist/social/og-default.png', width: 1200, height: 630 },
  { src: 'public/favicon.svg', dest: 'dist/favicon-32.png', width: 32, height: 32 },
  { src: 'public/favicon.svg', dest: 'dist/apple-touch-icon.png', width: 180, height: 180 },
];

for (const item of exports) {
  const input = await readFile(path.join(root, item.src));
  const target = path.join(root, item.dest);
  await mkdir(path.dirname(target), { recursive: true });
  await sharp(input, { density: 144 })
    .resize(item.width, item.height)
    .png({ compressionLevel: 9 })
    .toFile(target);
  const result = await sharp(target).metadata();
  if (result.width !== item.width || result.height !== item.height || result.format !== 'png') {
    throw new Error('Unexpected output image dimensions or format: ' + item.dest);
  }
  console.log('Generated ' + item.dest + ' (' + item.width + 'x' + item.height + ')');
}
