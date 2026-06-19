import logo from '@/assets/images/astra-core-logo.png'
import { cn } from '@/lib/utils'

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src={logo}
      alt="Astra Core — Technology Consulting"
      draggable={false}
      className={cn('h-8 w-auto object-contain object-center select-none', className)}
    />
  )
}
