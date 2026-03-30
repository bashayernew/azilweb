/**
 * Official Alhamra CI social profiles.
 * Instagram: @alhamra.c.i — https://www.instagram.com/alhamra.c.i/
 */
export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/alhamraa.ci',
  instagram: 'https://www.instagram.com/alhamra.c.i/',
}

/** WhatsApp (Kuwait) — digits only for wa.me */
export const WHATSAPP_PHONE_E164 = '96595595242'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}`
export const WHATSAPP_DISPLAY = `+${WHATSAPP_PHONE_E164.slice(0, 3)} ${WHATSAPP_PHONE_E164.slice(3)}`

/** Google Maps — company location (short link, opens in Maps app / browser) */
export const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/pzYw3uJKt4hm86fh7'

/**
 * Embedded map (iframe, no API key). Centers on Shuwaikh Industrial / Mtafi area.
 * If the pin is slightly off, adjust lat/lng here or replace with Embed URL from Google Maps → Share → Embed.
 */
export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps?q=29.3142%2C47.9389&z=16&hl=ar&output=embed'
