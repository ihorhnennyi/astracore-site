import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type HeaderIconButtonProps = {
  icon: LucideIcon
  label: string
  className?: string
  onClick?: () => void
  href?: string
}

export function HeaderIconButton({
  icon: Icon,
  label,
  className,
  onClick,
  href,
}: HeaderIconButtonProps) {
  const classes = cn(
    'glass-cosmic inline-flex size-9 items-center justify-center rounded-full text-white/75 transition-all',
    'hover:text-astra-cyan hover:shadow-[0_0_16px_oklch(78%_0.14_220_/_0.2)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-astra-cyan/40',
    className,
  )

  if (href) {
    return (
      <a href={href} aria-label={label} className={classes}>
        <Icon className="size-4" strokeWidth={1.75} />
      </a>
    )
  }

  return (
    <button type="button" aria-label={label} onClick={onClick} className={classes}>
      <Icon className="size-4" strokeWidth={1.75} />
    </button>
  )
}
