# R1 review: visual accessibility and social metadata

**Status:** Draft for review. Do not merge or publish without the site owner's explicit approval.

## Scope
- Adjust light-background accent labels to deep plum and muted text to a darker neutral, preserving gold on dark hero backgrounds.
- Add a monogram-inspired `public/favicon.svg`.
- Add SVG source for a 1200 x 630 social preview; generate PNG variants at build time using existing `sharp`.
- Set page-specific descriptions for all ten existing pages.
- Extend shared layout with Open Graph, Twitter/X preview, and mobile touch icon metadata.
- Extend build/SEO checks to ensure generated brand assets and metadata exist.

## Visual approval required
- Approve or request revisions to the proposed "C" thorn favicon.
- Approve or request revisions to the plum-and-cream social preview.
- Confirm the adjusted contrast palette in desktop/mobile screenshots.

## CI checks
- `npm ci --no-audit --no-fund`
- `npm run build` (runs Astro, then the raster asset renderer)
- `node scripts/check-seo.mjs`
- Secret scanning
- Confirm output includes `dist/favicon.svg`, `dist/favicon-32.png`, `dist/apple-touch-icon.png`, and `dist/social/og-default.png`.

## Release controls
This pull request is deliberately a draft. PR checks build but never deploy. Merging to `main` is a separate authorized action and triggers the real GitHub Pages deployment. PR #15 is out of scope.

## Deferred to later releases
Mobile navigation, photo optimization, content and portfolio updates, contact page, and broad browser/performance/accessibility testing.
