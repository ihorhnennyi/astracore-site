import { Logo } from '@/components/common'
import { NAV_ITEMS } from '@/constants/navigation'
import { useLocale } from '@/hooks/use-locale'
import { ContactBlock } from './ContactBlock'
import { FooterCosmicBg } from './FooterCosmicBg'

export function Footer() {
  const { t } = useLocale()
  const year = new Date().getFullYear()

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-black/40">
      <FooterCosmicBg />

      <div className="relative mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div className="col-span-2 flex flex-col items-center space-y-3 text-center sm:space-y-4 lg:col-span-1 lg:items-start lg:text-left">
            <Logo className="h-8" />
            <p className="max-w-xs text-sm leading-relaxed text-white/50 sm:max-w-sm">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="text-center sm:text-left lg:text-left">
            <h3 className="type-label text-astra-cyan">{t('footer.services')}</h3>
            <ul className="mt-3 space-y-2 sm:mt-4">
              <li>
                <a
                  href="#services"
                  className="text-sm text-white/55 transition-colors hover:text-astra-cyan"
                >
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a
                  href="#audience"
                  className="text-sm text-white/55 transition-colors hover:text-astra-cyan"
                >
                  {t('home.audienceTitle')}
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left lg:text-left">
            <h3 className="type-label text-astra-cyan">{t('footer.company')}</h3>
            <ul className="mt-3 space-y-2 sm:mt-4">
              {NAV_ITEMS.filter((item) => item.id !== 'services').map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="text-sm text-white/55 transition-colors hover:text-astra-cyan"
                  >
                    {t(`nav.${item.id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 flex flex-col items-center lg:col-span-1 lg:items-start">
            <h3 className="type-label text-astra-cyan">{t('footer.contact')}</h3>
            <ContactBlock className="mt-3 w-full max-w-sm sm:mt-4 lg:max-w-none" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/5 px-4 py-5 text-center text-xs break-words text-white/40">
        {t('footer.rights', { year })}
      </div>
    </footer>
  )
}
