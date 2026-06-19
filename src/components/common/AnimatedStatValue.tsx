import { useCountUp } from '@/hooks/use-count-up'

type AnimatedStatValueProps = {
  value: number
  suffix: string
  decimals?: number
  active: boolean
  className?: string
}

export function AnimatedStatValue({
  value,
  suffix,
  decimals = 0,
  active,
  className,
}: AnimatedStatValueProps) {
  const current = useCountUp(value, { active, decimals })

  const formatted =
    decimals > 0
      ? current.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(current).toLocaleString()

  return (
    <span className={className} aria-label={`${formatted}${suffix}`}>
      {formatted}
      {suffix}
    </span>
  )
}
