import { DEFAULT_LOCALE, LOCALE_STORAGE_KEY, type Locale } from '@/constants/i18n'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { uk } from './locales/uk'

function getInitialLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)

  if (stored === 'uk' || stored === 'en') {
    return stored
  }

  const browserLanguage = navigator.language.toLowerCase()

  if (browserLanguage.startsWith('uk')) {
    return 'uk'
  }

  if (browserLanguage.startsWith('en')) {
    return 'en'
  }

  return DEFAULT_LOCALE
}

const initialLocale = getInitialLocale()

void i18n.use(initReactI18next).init({
  resources: {
    uk: { translation: uk },
    en: { translation: en },
  },
  lng: initialLocale,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
})

document.documentElement.lang = initialLocale

i18n.on('languageChanged', (locale) => {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale
})

export default i18n
