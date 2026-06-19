import { MilkyWayBg, ScrollReveal, SectionHeading } from '@/components/common'
import { BENEFIT_IDS } from '@/constants/home'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

export function BenefitsSection() {
  const { t } = useLocale()

  return (
    <section className="section-padding relative overflow-hidden border-y border-white/5 bg-white/[0.02]">
      <MilkyWayBg />

      <div className="relative z-10 mx-auto grid w-full min-w-0 max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <ScrollReveal direction="left">
          <SectionHeading label={t('home.benefitsLabel')} title={t('home.benefitsTitle')} />
        </ScrollReveal>

        <ol className="relative">
          {BENEFIT_IDS.map((id, index) => (
            <ScrollReveal
              key={id}
              direction="right"
              delay={100 + index * 70}
              className={cn(index < BENEFIT_IDS.length - 1 && 'mb-12 sm:mb-14')}
            >
              <li className="relative flex gap-5">
                {index < BENEFIT_IDS.length - 1 ? (
                  <span
                    className="absolute top-3 left-[11px] h-[calc(100%+3rem)] w-px bg-linear-to-b from-astra-cyan/50 to-white/10 sm:h-[calc(100%+3.5rem)]"
                    aria-hidden
                  />
                ) : null}
                <span className="relative z-10 mt-1.5 size-[22px] shrink-0 rounded-full border border-astra-cyan/40 bg-astra-cyan/15 shadow-[0_0_12px_oklch(78%_0.14_220_/_0.2)]" />
                <p className="min-w-0 pt-0.5 text-sm leading-relaxed break-words text-white/75 sm:text-base">
                  {t(`benefits.${id}`)}
                </p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
