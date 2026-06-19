import { ScrollReveal, SectionHeading, StatOrbitalRing } from '@/components/common'
import { STATS } from '@/constants/stats'
import { useInView } from '@/hooks/use-in-view'
import { useLocale } from '@/hooks/use-locale'
import { useRef } from 'react'

export function StatsSection() {
  const { t } = useLocale()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden border-y border-white/5"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,180,255,0.1),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full min-w-0 max-w-7xl space-y-10 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <SectionHeading label={t('home.statsLabel')} title={t('home.statsTitle')} align="center" />
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 overflow-x-hidden sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <ScrollReveal key={stat.id} direction="up" delay={100 + index * 90}>
              <StatOrbitalRing
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals}
                progress={stat.progress}
                active={inView}
                delay={index * 140}
                label={t(`stats.${stat.id}.label`)}
                hint={t(`stats.${stat.id}.hint`)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
