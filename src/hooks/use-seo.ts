import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Locale } from '@/constants/i18n'
import { LOCALES } from '@/constants/i18n'
import {
  LOCALE_TO_HREFLANG,
  LOCALE_TO_OG,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  SITE_NAME,
  SITE_URL,
  THEME_COLOR,
} from '@/constants/seo'
import { setJsonLdScript, setLinkTag, setMetaTag, setMetaTags } from '@/lib/seo-meta'
import { buildStructuredData } from '@/lib/structured-data'

export function useSeo() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language as Locale

  useEffect(() => {
    const title = t('seo.title')
    const description = t('seo.description')
    const keywords = t('seo.keywords')
    const ogTitle = t('seo.ogTitle')
    const ogDescription = t('seo.ogDescription')

    document.title = title
    document.documentElement.lang = locale

    setMetaTag('name', 'description', description)
    setMetaTag('name', 'keywords', keywords)
    setMetaTag('name', 'author', SITE_NAME)
    setMetaTag('name', 'publisher', SITE_NAME)
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMetaTag('name', 'googlebot', 'index, follow')
    setMetaTag('name', 'theme-color', THEME_COLOR)
    setMetaTag('name', 'format-detection', 'telephone=yes')
    setMetaTag('name', 'geo.region', 'UA')
    setMetaTag('name', 'language', locale === 'uk' ? 'Ukrainian' : 'English')

    setMetaTag('property', 'og:type', 'website')
    setMetaTag('property', 'og:site_name', SITE_NAME)
    setMetaTag('property', 'og:url', SITE_URL)
    setMetaTag('property', 'og:title', ogTitle)
    setMetaTag('property', 'og:description', ogDescription)
    setMetaTag('property', 'og:image', OG_IMAGE_URL)
    setMetaTag('property', 'og:image:secure_url', OG_IMAGE_URL)
    setMetaTag('property', 'og:image:width', String(OG_IMAGE_WIDTH))
    setMetaTag('property', 'og:image:height', String(OG_IMAGE_HEIGHT))
    setMetaTag('property', 'og:image:alt', ogTitle)
    setMetaTag('property', 'og:locale', LOCALE_TO_OG[locale])

    setMetaTags(
      'property',
      'og:locale:alternate',
      LOCALES.filter((alternateLocale) => alternateLocale !== locale).map(
        (alternateLocale) => LOCALE_TO_OG[alternateLocale],
      ),
    )

    setMetaTag('name', 'twitter:card', 'summary_large_image')
    setMetaTag('name', 'twitter:title', ogTitle)
    setMetaTag('name', 'twitter:description', ogDescription)
    setMetaTag('name', 'twitter:image', OG_IMAGE_URL)
    setMetaTag('name', 'twitter:image:alt', ogTitle)

    setLinkTag('canonical', SITE_URL)

    for (const alternateLocale of LOCALES) {
      setLinkTag('alternate', SITE_URL, {
        hreflang: LOCALE_TO_HREFLANG[alternateLocale],
      })
    }

    setLinkTag('alternate', SITE_URL, { hreflang: 'x-default' })

    const schemas = buildStructuredData(locale, t)

    schemas.forEach((schema, index) => {
      setJsonLdScript(String(index), schema)
    })
  }, [locale, t])
}
