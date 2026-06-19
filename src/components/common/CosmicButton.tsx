import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CosmicButtonProps = {
  children: ReactNode
  className?: string
  href?: string
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
}

const variants = {
  primary:
    'bg-astra-cyan text-astra-space hover:bg-astra-cyan/90 shadow-[0_0_24px_oklch(78%_0.14_220_/_0.25)]',
  ghost: 'text-white/70 hover:bg-white/5 hover:text-white',
  outline: 'border border-white/15 text-white/80 hover:border-astra-cyan/40 hover:text-astra-cyan',
}

const sizes = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-6 text-sm',
}

export function CosmicButton({
  children,
  className,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled,
  onClick,
}: CosmicButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center rounded-full font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-astra-cyan/40',
    variants[variant],
    sizes[size],
    className,
  )

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
