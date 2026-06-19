import { Mail, Phone } from 'lucide-react'
import { EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

type ContactBlockProps = {
  className?: string
  onLinkClick?: () => void
}

const ITEM_CLASS =
  'group flex items-center gap-3.5 px-4 py-3.5 transition-colors hover:bg-white/[0.04] sm:gap-4 sm:px-5 sm:py-4'

const ICON_WRAP_CLASS =
  'inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-astra-cyan/20 bg-astra-cyan/10 text-astra-cyan transition-colors group-hover:border-astra-cyan/40 group-hover:bg-astra-cyan/15'

export function ContactBlock({ className, onLinkClick }: ContactBlockProps) {
  const { t } = useLocale()

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]',
        className,
      )}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-astra-cyan/35 to-transparent" aria-hidden />

      <a href={PHONE_HREF} onClick={onLinkClick} className={cn(ITEM_CLASS, 'border-b border-white/8')}>
        <span className={ICON_WRAP_CLASS}>
          <Phone className="size-4" />
        </span>
        <span className="min-w-0 text-left">
          <span className="type-label block text-[0.65rem] text-white/40">{t('footer.phone')}</span>
          <span className="mt-0.5 block text-sm font-medium tracking-tight text-white transition-colors group-hover:text-astra-cyan">
            {PHONE_NUMBER}
          </span>
        </span>
      </a>

      <a href={EMAIL_HREF} onClick={onLinkClick} className={ITEM_CLASS}>
        <span className={ICON_WRAP_CLASS}>
          <Mail className="size-4" />
        </span>
        <span className="min-w-0 text-left">
          <span className="type-label block text-[0.65rem] text-white/40">{t('footer.email')}</span>
          <span className="mt-0.5 block truncate text-sm font-medium tracking-tight text-white transition-colors group-hover:text-astra-cyan">
            {EMAIL}
          </span>
        </span>
      </a>
    </div>
  )
}
