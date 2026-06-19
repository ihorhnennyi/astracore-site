import { useInView } from '@/hooks/use-in-view'
import { cn } from '@/lib/utils'
import { useRef, type ReactNode } from 'react'

export type ScrollRevealDirection = 'left' | 'right' | 'up' | 'down'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  direction?: ScrollRevealDirection
  delay?: number
}

export function ScrollReveal({
  children,
  className,
  direction = 'up',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

  return (
    <div
      ref={ref}
      className={cn(
        'scroll-reveal',
        `scroll-reveal--${direction}`,
        inView && 'scroll-reveal--visible',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
