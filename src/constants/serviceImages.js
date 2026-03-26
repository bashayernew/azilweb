/**
 * Homepage service cards + services detail visuals.
 * string = single image; string[] = dual framed collage (same order as UI).
 */
export const SERVICE_CARD_IMAGES = {
  /** filename on disk: "basment 2.webp" — space encoded for URL */
  basement: '/basment%202.webp',
  roofs: '/roof2.webp',
  pools: ['/pool33.webp', '/pool3.webp'],
  tanks: '/pool22.webp',
  acDucts: '/duct2.webp',
  acoustic: '/sound1.webp',
}

/** Services detail page — override paths when card + detail should differ (e.g. ac/ducts) */
export const SERVICE_DETAIL_IMAGES = {
  ...SERVICE_CARD_IMAGES,
  acDucts: '/duct1.webp',
  roofs: '/roof1.webp',
  basement: '/basment1.webp',
}

/** Vite `public/` URLs respect `base` in vite.config */
export function publicAsset(path) {
  const p = String(path).replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${p}`
}
