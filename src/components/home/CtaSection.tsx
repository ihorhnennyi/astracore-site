import { ContactForm, ScrollReveal, SectionHeading } from '@/components/common'
import { EMAIL, EMAIL_HREF, PHONE_HREF, PHONE_NUMBER } from '@/constants/contact'
import { useLocale } from '@/hooks/use-locale'
import { Mail, Phone } from 'lucide-react'

export function CtaSection() {
  const { t } = useLocale()

  return (
    <section id="contact" className="section-padding">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="glass-cosmic-strong relative overflow-hidden rounded-3xl p-6 sm:p-10 lg:p-12">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,180,255,0.16),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,80,160,0.12),transparent_50%)]"
              aria-hidden
            />

            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12 xl:gap-16">
              <ScrollReveal direction="left" className="space-y-8">
                <SectionHeading
                  label={t('home.ctaLabel')}
                  title={t('home.ctaTitle')}
                  description={t('home.ctaDescription')}
                />

                <div className="space-y-4 border-t border-white/10 pt-6">
                  <a
                    href={PHONE_HREF}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-astra-cyan"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Phone className="size-4" />
                    </span>
                    {PHONE_NUMBER}
                  </a>
                  <a
                    href={EMAIL_HREF}
                    className="flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-astra-cyan"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5">
                      <Mail className="size-4" />
                    </span>
                    {EMAIL}
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={140}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
