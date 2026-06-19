import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, locales, labels } = useLocale()

  return (
    <div
      className={cn(
        'glass-cosmic inline-flex items-center rounded-full p-0.5',
        className,
      )}
    >
      {locales.map((item) => {
        const isActive = locale === item

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={cn(
              'rounded-full px-2.5 py-1 text-xs font-medium transition-all',
              isActive
                ? 'bg-astra-cyan/20 text-astra-cyan shadow-[0_0_12px_oklch(78%_0.14_220_/_0.25)]'
                : 'text-white/55 hover:text-white',
            )}
          >
            {labels[item]}
          </button>
        )
      })}
    </div>
  )
}
