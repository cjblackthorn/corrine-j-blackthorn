// Descriptions based on photographs actually inspected during R2.
// Leave unidentified subjects uncaptained until the owner reviews the images.
// Do not infer locations or identities from file names.
export const photoDetails: Record<string, { alt: string; caption?: string }> = {
  '/images/photography/IMG_7030.jpeg': {
    alt: 'Distant city lights reflecting beyond dark water under a broad band of glowing clouds at dusk',
    caption: 'City lights across the water',
  },
  '/images/photography/IMG_7031.jpeg': {
    alt: 'Weathered driftwood roots covered in pale lichen resting on a pebbly shoreline',
    caption: 'Weathered roots on the shoreline',
  },
  '/images/photography/IMG_7032.jpeg': {
    alt: 'Rocky tidal shore and shallow water beneath a cloudy sky, with a long pier on the horizon',
    caption: 'Low tide and the distant pier',
  },
  '/images/photography/IMG_7033.jpeg': {
    alt: 'A partly frozen mountain lake below steep forested cliffs and snow-covered peaks',
    caption: 'A mountain lake between winter and spring',
  },
};

export function describePhotograph(source: string) {
  return photoDetails[source] ?? {
    alt: 'Original photograph from Corrine J. Blackthorn\'s collection',
    caption: undefined,
  };
}
