# R1 review: visual accessibility and social metadata

**Status:** Draft for review. Do not merge or publish without the site owner's explicit approval.

## Scope
- Adjust light-background accent labels to deep plum and muted text to a darker neutral, preserving gold on dark hero backgrounds.
- Add a serif CB editorial monogram and restrained thorn sprig in `public/favicon.svg`. The ornament stays legible at browser-tab sizes.
- Add SVG source for a 1200 x 630 editorial social preview, pairing the literary styling of Concept A with the inviting warmth of Concept C. Generate PNG variants at build time using existing `sharp`.
- Set page-specific descriptions for all ten existing pages.
- Extend shared layout with Open Graph, Twitter/X preview, and mobile touch icon metadata.
- Extend build/SEO checks to ensure generated brand assets and metadata exist.

## Visual approval required
- Approve or request revisions to the refined cream-on-plum CB monogram with a small thorn accent.
- Approve or request revisions to the warm cream-and-plum editorial social preview. It contains a single small blush cherry blossom tucked into a blackthorn illustration, not a prominent floral theme.
- The old generic "C" favicon and dark corporate social-card design were explicitly rejected; do not reintroduce them.
- Neither visual has final design approval; this remains a draft.
- Confirm the adjusted contrast palette in desktop/mobile screenshots.

## Design direction confirmed on November 2, 2026
The owner preferred the editorial/author treatment (A) and the personal/professional warmth of (C). Cherry blossoms should be subtle and personal rather than a dominant brand emblem. Blackthorn branches, literary typography, and warmth are the primary design language.

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
