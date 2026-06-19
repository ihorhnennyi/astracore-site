import type { TFunction } from 'i18next'
import { EMAIL, PHONE_HREF, WEBSITE } from '@/constants/contact'
import { SERVICE_IDS } from '@/constants/home'
import {
  LOCALE_TO_OG,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from '@/constants/seo'
import type { Locale } from '@/constants/i18n'

function getPhoneE164() {
  return PHONE_HREF.replace('tel:', '')
}

function getFaqItems(t: TFunction) {
  const items = t('seo.faq', { returnObjects: true })

  if (!Array.isArray(items)) {
    return []
  }

  return items
    .filter(
      (item): item is { question: string; answer: string } =>
        typeof item === 'object' &&
        item !== null &&
        'question' in item &&
        'answer' in item &&
        typeof item.question === 'string' &&
        typeof item.answer === 'string',
    )
    .map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    }))
}

export function buildStructuredData(locale: Locale, t: TFunction) {
  const inLanguage = LOCALE_TO_OG[locale]
  const phone = getPhoneE164()
  const faqItems = getFaqItems(t)

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
      width: 1200,
      height: 630,
    },
    image: OG_IMAGE_URL,
    email: EMAIL,
    telephone: phone,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: phone,
        email: EMAIL,
        contactType: 'customer service',
        availableLanguage: ['Ukrainian', 'English'],
        areaServed: 'UA',
      },
    ],
    sameAs: [WEBSITE],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: t('seo.description'),
    inLanguage,
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
  }

  const professionalService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: SITE_NAME,
    url: SITE_URL,
    image: OG_IMAGE_URL,
    description: t('seo.description'),
    telephone: phone,
    email: EMAIL,
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    availableLanguage: ['Ukrainian', 'English'],
    serviceType: SERVICE_IDS.map((id) => t(`services.${id}.title`)),
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
  }

  const serviceCatalog = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#services`,
    name: t('home.servicesTitle'),
    itemListElement: SERVICE_IDS.map((id, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: t(`services.${id}.title`),
        description: t(`services.${id}.description`),
        provider: {
          '@id': `${SITE_URL}/#organization`,
        },
        areaServed: 'Ukraine',
      },
    })),
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: t('seo.title'),
    description: t('seo.description'),
    inLanguage,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#business`,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: OG_IMAGE_URL,
    },
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav.home'),
        item: `${SITE_URL}/#home`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('nav.services'),
        item: `${SITE_URL}/#services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('nav.contact'),
        item: `${SITE_URL}/#contact`,
      },
    ],
  }

  const schemas: Record<string, unknown>[] = [
    organization,
    website,
    professionalService,
    serviceCatalog,
    webPage,
    breadcrumb,
  ]

  if (faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems,
    })
  }

  return schemas
}
