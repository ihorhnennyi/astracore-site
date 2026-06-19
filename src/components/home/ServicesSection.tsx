import type { LucideIcon } from 'lucide-react'
import {
  Bot,
  Cloud,
  Code2,
  Headphones,
  Lightbulb,
  Lock,
  MessageCircle,
  Monitor,
  Zap,
} from 'lucide-react'
import { ScrollReveal, SectionHeading } from '@/components/common'
import { SERVICE_IDS, type ServiceId } from '@/constants/home'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

const SERVICE_ICONS: Record<ServiceId, LucideIcon> = {
  web: Code2,
  ai: Bot,
  telegram: MessageCircle,
  support: Headphones,
  consulting: Lightbulb,
  crm: Monitor,
  cloud: Cloud,
  security: Lock,
  microgrid: Zap,
}

export function ServicesSection() {
  const { t } = useLocale()

  return (
    <section id="services" className="section-padding overflow-x-clip">
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-10 px-4 sm:px-6">
        <ScrollReveal direction="up">
          <SectionHeading
            label={t('home.servicesLabel')}
            title={t('home.servicesTitle')}
            description={t('home.servicesHint')}
          />
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_IDS.map((id, index) => {
            const Icon = SERVICE_ICONS[id]

            return (
              <ScrollReveal
                key={id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={80 + (index % 3) * 90}
              >
                <article
                  className={cn(
                    'glass-cosmic group h-full min-w-0 rounded-2xl p-5 transition-all sm:p-6',
                    'hover:border-astra-cyan/30 hover:shadow-[0_0_32px_oklch(78%_0.14_220_/_0.1)]',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl border border-astra-cyan/20 bg-astra-cyan/10 text-astra-cyan">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="type-label text-white/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold leading-snug break-words text-white sm:text-lg">
                    {t(`services.${id}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {t(`services.${id}.description`)}
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
