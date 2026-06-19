import { Menu, Phone } from 'lucide-react'
import { useState } from 'react'
import { CosmicButton, LanguageSwitcher, Logo } from '@/components/common'
import { PHONE_HREF } from '@/constants/contact'
import { useLocale } from '@/hooks/use-locale'
import { HeaderIconButton } from './HeaderIconButton'
import { HeaderNav } from './HeaderNav'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { t } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-astra-space/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <a href="#home" aria-label="Astra Core — Home" className="shrink-0">
            <Logo className="h-7 sm:h-8" />
          </a>

          <HeaderNav className="mx-auto hidden flex-1 justify-center lg:flex" />

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <HeaderIconButton
              icon={Phone}
              label={t('header.callUs')}
              href={PHONE_HREF}
              className="hidden sm:inline-flex"
            />
            <CosmicButton href="#contact" size="sm" className="hidden md:inline-flex">
              {t('header.cta')}
            </CosmicButton>
            <LanguageSwitcher />
            <HeaderIconButton
              icon={Menu}
              label={t('header.openMenu')}
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
