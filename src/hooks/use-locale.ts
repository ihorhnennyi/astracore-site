import { LOCALE_LABELS, LOCALES, type Locale } from '@/constants/i18n'
import { useTranslation } from 'react-i18next'

export function useLocale() {
  const { i18n, t } = useTranslation()
  const locale = i18n.language as Locale

  const setLocale = (nextLocale: Locale) => {
    void i18n.changeLanguage(nextLocale)
  }

  return {
    locale,
    setLocale,
    t,
    locales: LOCALES,
    labels: LOCALE_LABELS,
  }
}
