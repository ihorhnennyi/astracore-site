import { AnimatedStatValue } from '@/components/common'
import { useCountUp } from '@/hooks/use-count-up'
import { cn } from '@/lib/utils'

type StatOrbitalRingProps = {
  value: number
  suffix: string
  decimals?: number
  active: boolean
  label: string
  hint: string
  progress?: number
  delay?: number
}

const RING_RADIUS = 54
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

export function StatOrbitalRing({
  value,
  suffix,
  decimals = 0,
  active,
  label,
  hint,
  progress = 1,
  delay = 0,
}: StatOrbitalRingProps) {
  const animatedProgress = useCountUp(progress, { active, duration: 1600, decimals: 2 })
  const strokeOffset = RING_CIRCUMFERENCE * (1 - Math.min(animatedProgress, 1))

  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative size-32 sm:size-36">
        <div
          className="pointer-events-none absolute inset-3 rounded-full bg-astra-cyan/10 blur-xl"
          aria-hidden
        />

        <svg
          viewBox="0 0 128 128"
          className="absolute inset-0 size-full -rotate-90"
          aria-hidden
        >
          <circle
            cx="64"
            cy="64"
            r={RING_RADIUS}
            fill="none"
            stroke="oklch(100% 0 0 / 0.08)"
            strokeWidth="2"
          />
          <circle
            cx="64"
            cy="64"
            r={RING_RADIUS}
            fill="none"
            stroke="oklch(78% 0.14 220 / 0.55)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={RING_CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            className="transition-[stroke-dashoffset] duration-300"
          />
        </svg>

        <div
          className={cn(
            'orbit-ring absolute inset-[18%] rounded-full border border-astra-cyan/15',
            active && 'opacity-100',
          )}
          style={{ animationDuration: '24s', animationDelay: `${delay}ms` }}
          aria-hidden
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <AnimatedStatValue
            value={value}
            suffix={suffix}
            decimals={decimals}
            active={active}
            className={cn(
              'stat-value-glow text-2xl font-semibold text-white sm:text-3xl',
              active && 'stat-value-active',
            )}
          />
        </div>

        <span
          className="absolute top-[10%] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-astra-cyan/80 shadow-[0_0_8px_oklch(78%_0.14_220_/_0.6)]"
          aria-hidden
        />
      </div>

      <p className="mt-4 text-sm font-medium text-white/90">{label}</p>
      <p className="mt-1 text-xs text-white/45">{hint}</p>
    </article>
  )
}
