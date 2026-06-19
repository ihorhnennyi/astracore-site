import { WEBSITE } from './contact'

export const SITE_NAME = 'Astra Core'
export const SITE_URL = WEBSITE
export const OG_IMAGE_PATH = '/og-image.png'
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const THEME_COLOR = '#0a0c12'

export const LOCALE_TO_OG: Record<'uk' | 'en', string> = {
  uk: 'uk_UA',
  en: 'en_US',
}

export const LOCALE_TO_HREFLANG: Record<'uk' | 'en', string> = {
  uk: 'uk',
  en: 'en',
}
