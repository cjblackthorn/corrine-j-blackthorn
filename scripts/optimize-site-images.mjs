import path from 'node:path';
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// Generate responsive WebP variants from the original photographs. Originals
// remain untouched, so the owner can review the crops and image quality.
const root = process.cwd();
const imageRoot = path.join(root, 'public', 'images');
const outputRoot = path.join(imageRoot, 'optimized');
const metadataFile = path.join(root, 'src', 'data', 'generated-image-info.json');

const groups = [
  { folder: 'hero', files: ['14B37D30-1B9B-448A-B870-AE49F651F659.png'], widths: [640, 1280, 1920] },
  { folder: 'portraits', files: ['IMG_3197.jpeg', 'IMG_5125.jpeg', 'IMG_5254.jpeg'], widths: [360, 720, 1080] },
  { folder: 'branding', files: ['2CB9F118-DB9C-4E73-9BB6-1798198F5A9D.png'], widths: [360, 720, 1080] },
  { folder: 'photography', files: null, widths: [360, 720, 1200] },
];

const manifest = {};
let originalBytes = 0;
let optimizedBytes = 0;
let variantCount = 0;
await rm(outputRoot, { recursive: true, force: true });

for (const group of groups) {
  const sourceDir = path.join(imageRoot, group.folder);
  const filenames = group.files ?? (await readdir(sourceDir)).filter(name => /\.(?:jpe?g|png)$/i.test(name)).sort();
  for (const filename of filenames) {
    const original = path.join(sourceDir, filename);
    const meta = await sharp(original).metadata();
    if (!meta.width || !meta.height) throw new Error('Cannot read image dimensions: ' + original);
    const rotated = [5, 6, 7, 8].includes(meta.orientation ?? 1);
    const width = rotated ? meta.height : meta.width;
    const height = rotated ? meta.width : meta.height;
    const stem = filename.replace(/\.[^.]+$/, '');
    const widths = [...new Set(group.widths.map(desired => Math.min(desired, width)))].sort((a, b) => a - b);
    const variants = [];
    for (const variantWidth of widths) {
      const dest = `/images/optimized/${group.folder}/${stem}-${variantWidth}.webp`;
      const target = path.join(root, 'public', dest.slice(1));
      await mkdir(path.dirname(target), { recursive: true });
      const output = await sharp(original)
        .rotate()
        .resize({ width: variantWidth, withoutEnlargement: true })
        .webp({ quality: 78, effort: 4 })
        .toFile(target);
      if (output.width !== variantWidth) throw new Error('Unexpected optimized width: ' + dest);
      optimizedBytes += output.size;
      variantCount += 1;
      variants.push({ width: variantWidth, src: dest });
    }
    originalBytes += (await stat(original)).size;
    manifest[`/images/${group.folder}/${filename}`] = { width, height, variants };
  }
}
await mkdir(path.dirname(metadataFile), { recursive: true });
await writeFile(metadataFile, JSON.stringify(manifest, null, 2) + '\n');
const pct = 100 * (1 - optimizedBytes / originalBytes);
console.log(`Optimized ${Object.keys(manifest).length} source images into ${variantCount} responsive variants`);
console.log(`Original selected source bytes: ${originalBytes}; all generated variant bytes: ${optimizedBytes} (${pct.toFixed(1)}% smaller in aggregate)`);
