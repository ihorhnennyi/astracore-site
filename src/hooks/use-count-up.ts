import { useEffect, useState } from 'react'

type UseCountUpOptions = {
  active: boolean
  duration?: number
  decimals?: number
}

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3
}

export function useCountUp(
  target: number,
  { active, duration = 1400, decimals = 0 }: UseCountUpOptions,
) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      return
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const nextValue = target * easeOutCubic(progress)
      const factor = 10 ** decimals
      setValue(Math.round(nextValue * factor) / factor)

      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
    }
  }, [active, decimals, duration, target])

  return value
}
