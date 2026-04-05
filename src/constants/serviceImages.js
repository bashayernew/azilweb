/**
 * Homepage service cards + services detail visuals.
 * string = single image; string[] = dual framed collage (same order as UI).
 */
export const SERVICE_CARD_IMAGES = {
  basement: '/roof2.webp',
  foundations: '/gawa3dd.webp',
  roofs: ['/roof5.webp', '/roof33.webp'],
  bitumen: '/azilharary.webp',
  pools: ['/pool33.webp', '/pool3.webp'],
  tanks: '/hadaik2.webp',
  acDucts: '/duct2.webp',
  acoustic: '/sound1.webp',
}

/** Services detail page — override paths when card + detail should differ (e.g. ac/ducts) */
export const SERVICE_DETAIL_IMAGES = {
  ...SERVICE_CARD_IMAGES,
  acDucts: '/duct1.webp',
  roofs: '/roof1.webp',
  bitumen: '/azilharary.webp',
  basement: ['/serdab.webp', '/serdab2.webp'],
  /** Home card uses one image; detail keeps dual collage */
  foundations: ['/gawa3dd.webp', '/gawa3d.webp'],
  tanks: ['/hadaik.webp', '/hadaik2.webp'],
}

/**
 * Roofs service detail — exactly 6 images in `public/` (3 per subsection):
 * indices 0–2 = subsection A grid, 3–5 = subsection B grid.
 * Replace filenames as needed; keep length at 6.
 */
export const ROOFS_SERVICE_IMAGES = [
  'roof3.webp',
  'roof4.webp',
  'roof5.webp',
  'roof6.webp',
  'roof7.webp',
  'rooof.webp',
]

/**
 * Pools service — construction process strip (5 steps).
 * `type`: 'image' | 'video'; `src` = filename in `public/`.
 */
export const POOL_PROCESS_STEPS = [
  { type: 'image', src: 'swimm.webp' },
  { type: 'image', src: 'swimm2.webp' },
  { type: 'image', src: 'swimm3.webp' },
  { type: 'image', src: 'swimm4.webp' },
  { type: 'image', src: 'swimm5.webp' },
]

/** Vite `public/` URLs respect `base` in vite.config */
export function publicAsset(path) {
  const p = String(path).replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${p}`
}
