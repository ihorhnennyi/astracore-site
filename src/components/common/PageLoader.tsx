import { LoaderOrbital, Logo, Starfield } from '@/components/common'
import { cn } from '@/lib/utils'

type PageLoaderProps = {
  progress: number
  exiting?: boolean
}

export function PageLoader({ progress, exiting = false }: PageLoaderProps) {
  const normalizedProgress = exiting ? 100 : Math.min(100, Math.max(0, progress))
  const displayProgress = Math.round(normalizedProgress)

  return (
    <div
      className={cn('page-loader', exiting && 'page-loader--exit')}
      aria-busy={!exiting}
      aria-label="Loading"
    >
      <Starfield />

      <div className="page-loader__glow pointer-events-none absolute inset-0" aria-hidden />

      <div className="page-loader__content relative z-10 flex h-full flex-col">
        <header className="page-loader__logo flex justify-center pt-10 sm:pt-12">
          <Logo className="h-9 sm:h-10" />
        </header>

        <main className="flex flex-1 items-center justify-center px-6">
          <LoaderOrbital />
        </main>

        <footer className="mx-auto w-full min-w-0 max-w-xs shrink-0 px-6 pb-10 sm:max-w-sm sm:pb-12">
          <div className="mb-2.5 flex items-end justify-between gap-4">
            <span className="type-label text-white/35">Loading</span>
            <span className="loader-progress-value tabular-nums">{displayProgress}%</span>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-inset ring-white/5"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={displayProgress}
          >
            <div
              className="h-full w-full origin-left rounded-full bg-astra-cyan shadow-[0_0_14px_oklch(78%_0.14_220_/_0.55)]"
              style={{ transform: `scaleX(${normalizedProgress / 100})` }}
            />
          </div>
        </footer>
      </div>
    </div>
  )
}
