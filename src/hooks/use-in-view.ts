import { useEffect, useState, type RefObject } from 'react'

type UseInViewOptions = {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.35, rootMargin = '0px', once = true }: UseInViewOptions = {},
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)

          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [once, ref, rootMargin, threshold])

  return inView
}
