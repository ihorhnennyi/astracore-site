import { NAV_ITEMS, type NavItemId } from '@/constants/navigation'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

type HeaderNavProps = {
  className?: string
  onNavigate?: () => void
  activeId?: NavItemId
  variant?: 'horizontal' | 'vertical'
}

export function HeaderNav({
  className,
  onNavigate,
  activeId = 'home',
  variant = 'horizontal',
}: HeaderNavProps) {
  const { t } = useLocale()
  const isVertical = variant === 'vertical'

  return (
    <nav
      className={cn(
        isVertical ? 'flex flex-col items-stretch gap-1' : 'flex items-center gap-1',
        className,
      )}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id

        return (
          <a
            key={item.id}
            href={item.href}
            data-active={isActive}
            onClick={onNavigate}
            className={cn(
              'rounded-lg font-medium transition-colors',
              isVertical ? 'px-3 py-3 text-base' : 'px-3 py-1.5 text-sm',
              isActive ? 'text-astra-cyan' : 'text-white/70 hover:bg-white/5 hover:text-white',
            )}
          >
            {t(`nav.${item.id}`)}
          </a>
        )
      })}
    </nav>
  )
}
