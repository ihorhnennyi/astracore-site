import { CosmicButton, OrbitalVisual, ScrollReveal } from '@/components/common'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

type TitleLine = {
  text: string
  accent: boolean
}

function getTitleLines(value: unknown): TitleLine[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(
    (line): line is TitleLine =>
      typeof line === 'object' &&
      line !== null &&
      'text' in line &&
      'accent' in line &&
      typeof line.text === 'string' &&
      typeof line.accent === 'boolean',
  )
}

export function HeroSection() {
  const { t } = useLocale()
  const titleLines = getTitleLines(t('home.titleLines', { returnObjects: true }))

  return (
    <section id="home" className="section-padding relative overflow-x-hidden">
      <div className="mx-auto grid w-full min-w-0 max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal direction="up" className="min-w-0 space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <p className="type-label text-white/45">{t('home.badge')}</p>
            <p className="type-body text-astra-cyan">{t('home.partner')}</p>
          </div>

          <h1 className="space-y-1 break-words">
            {titleLines.map((line) => (
              <span
                key={line.text}
                className={cn(
                  'display-title hero-title block',
                  line.accent ? 'hero-gradient-text' : 'text-white',
                )}
              >
                {line.text}
              </span>
            ))}
          </h1>

          <ScrollReveal direction="up" delay={220}>
            <p className="type-body-lg mx-auto max-w-xl text-white/60 lg:mx-0">{t('home.description')}</p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={280}>
            <p className="type-body mx-auto max-w-xl text-white/45 lg:mx-0">{t('home.descriptionLong')}</p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={340}>
            <div className="flex w-full max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
              <CosmicButton href="#contact" className="w-full sm:w-auto">
                {t('home.ctaPrimary')}
              </CosmicButton>
              <CosmicButton href="#services" variant="outline" className="w-full sm:w-auto">
                {t('home.ctaSecondary')}
              </CosmicButton>
            </div>
          </ScrollReveal>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={180} className="flex min-w-0 justify-center lg:justify-end">
          <OrbitalVisual />
        </ScrollReveal>
      </div>
    </section>
  )
}
