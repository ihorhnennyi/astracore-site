import { useEffect, useState } from 'react'

type PageLoaderState = {
  progress: number
  isVisible: boolean
  isExiting: boolean
}

const MIN_DURATION_MS = 3000
const HOLD_AT_COMPLETE_MS = 250
const EXIT_DURATION_MS = 650

function easeOutCubic(progress: number) {
  return 1 - (1 - progress) ** 3
}

export function usePageLoader(): PageLoaderState {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      const timeout = window.setTimeout(() => {
        setProgress(100)
        setIsExiting(true)
        window.setTimeout(() => setIsVisible(false), EXIT_DURATION_MS)
      }, 400)

      return () => {
        window.clearTimeout(timeout)
      }
    }

    let raf = 0
    let holdTimeout = 0
    const start = performance.now()
    let finished = false

    const finish = () => {
      if (finished) {
        return
      }

      finished = true
      setProgress(100)
      setIsExiting(true)
      window.setTimeout(() => setIsVisible(false), EXIT_DURATION_MS)
    }

    const step = (now: number) => {
      const elapsed = now - start
      const timeProgress = Math.min(elapsed / MIN_DURATION_MS, 1)
      const nextProgress = 100 * easeOutCubic(timeProgress)

      setProgress(nextProgress)

      if (elapsed >= MIN_DURATION_MS) {
        setProgress(100)

        if (!finished) {
          holdTimeout = window.setTimeout(finish, HOLD_AT_COMPLETE_MS)
        }

        return
      }

      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(holdTimeout)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  return { progress, isVisible, isExiting }
}
