import { X } from 'lucide-react'
import { useEffect } from 'react'
import { CosmicButton, LanguageSwitcher, Logo } from '@/components/common'
import { PHONE_HREF } from '@/constants/contact'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'
import { ContactBlock } from './ContactBlock'
import { FooterCosmicBg } from './FooterCosmicBg'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

const MENU_LINKS = [
  { href: '#home', labelKey: 'nav.home' },
  { href: '#services', labelKey: 'nav.services' },
  { href: '#audience', labelKey: 'home.audienceTitle' },
  { href: '#about', labelKey: 'nav.about' },
  { href: '#contact', labelKey: 'nav.contact' },
] as const

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const { t } = useLocale()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <aside
      className={cn(
        'fixed inset-0 z-50 flex h-svh flex-col overflow-hidden bg-astra-space transition-transform duration-300 ease-out lg:hidden',
        open ? 'translate-x-0' : 'pointer-events-none translate-x-full',
      )}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label={t('header.menu')}
    >
      <FooterCosmicBg />

      <div className="relative flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
          <Logo className="h-7" />
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              aria-label={t('header.closeMenu')}
              onClick={onClose}
              className="inline-flex size-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-between overflow-hidden px-4 py-4">
          <nav aria-label="Main navigation">
            <p className="type-label mb-3 text-astra-cyan">{t('header.menu')}</p>
            <ul>
              {MENU_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="block rounded-lg px-2 py-2 text-lg font-semibold tracking-tight text-white/85 transition-colors hover:text-astra-cyan"
                  >
                    {t(item.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-white/10 pt-4">
            <p className="type-label mb-3 text-astra-cyan">{t('footer.contact')}</p>
            <ContactBlock onLinkClick={onClose} />
          </div>
        </div>

        <div className="shrink-0 space-y-2 border-t border-white/10 p-4">
          <CosmicButton href="#contact" className="h-10 w-full text-xs" onClick={onClose}>
            {t('header.cta')}
          </CosmicButton>
          <CosmicButton
            href={PHONE_HREF}
            variant="outline"
            className="h-10 w-full text-xs"
            onClick={onClose}
          >
            {t('header.callUs')}
          </CosmicButton>
        </div>
      </div>
    </aside>
  )
}
