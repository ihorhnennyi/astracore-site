import type { LucideIcon } from 'lucide-react'
import {
  Briefcase,
  Factory,
  GraduationCap,
  Megaphone,
  Rocket,
  ShoppingCart,
} from 'lucide-react'
import { ScrollReveal, SectionHeading } from '@/components/common'
import { AUDIENCE_IDS, type AudienceId } from '@/constants/home'
import { useLocale } from '@/hooks/use-locale'

const AUDIENCE_ICONS: Record<AudienceId, LucideIcon> = {
  smb: Briefcase,
  startups: Rocket,
  manufacturing: Factory,
  education: GraduationCap,
  agencies: Megaphone,
  ecommerce: ShoppingCart,
}

export function AudienceSection() {
  const { t } = useLocale()

  return (
    <section id="audience" className="section-padding border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <SectionHeading
            label={t('home.audienceLabel')}
            title={t('home.audienceTitle')}
            description={t('home.audienceHint')}
            align="center"
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCE_IDS.map((id, index) => {
            const Icon = AUDIENCE_ICONS[id]

            return (
              <ScrollReveal key={id} direction="up" delay={70 + index * 80}>
                <article className="glass-cosmic h-full rounded-2xl p-6 text-center transition-colors hover:border-astra-cyan/25">
                  <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full border border-astra-cyan/25 bg-astra-cyan/10 text-astra-cyan">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white">{t(`audience.${id}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {t(`audience.${id}.description`)}
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
