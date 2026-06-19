import type { LucideIcon } from 'lucide-react'
import { Handshake, Lightbulb, ShieldCheck, Target } from 'lucide-react'
import { ScrollReveal, SectionHeading } from '@/components/common'
import { VALUE_IDS, type ValueId } from '@/constants/home'
import { useLocale } from '@/hooks/use-locale'

const VALUE_ICONS: Record<ValueId, LucideIcon> = {
  innovation: Lightbulb,
  results: Target,
  partnership: Handshake,
  security: ShieldCheck,
}

export function ValuesSection() {
  const { t } = useLocale()

  return (
    <section id="about" className="section-padding overflow-x-clip">
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-10 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <SectionHeading
            label={t('home.valuesLabel')}
            title={t('home.valuesTitle')}
            description={t('home.valuesHint')}
            align="center"
          />
        </ScrollReveal>

        <div className="grid gap-4 overflow-x-hidden sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_IDS.map((id, index) => {
            const Icon = VALUE_ICONS[id]

            return (
              <ScrollReveal key={id} direction="up" delay={60 + index * 100}>
                <article className="glass-cosmic h-full min-w-0 rounded-2xl p-5 text-center transition-colors hover:border-astra-cyan/25 sm:p-6">
                  <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-astra-cyan">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold break-words text-white">{t(`values.${id}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {t(`values.${id}.description`)}
                  </p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
