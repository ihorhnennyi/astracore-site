export const LOCALES = ['uk', 'en'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'uk'

export const LOCALE_STORAGE_KEY = 'astracore-locale'

export const LOCALE_LABELS: Record<Locale, string> = {
  uk: 'UA',
  en: 'EN',
}
