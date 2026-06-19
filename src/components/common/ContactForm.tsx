import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { CosmicButton } from './CosmicButton'
import { EMAIL } from '@/constants/contact'
import { useLocale } from '@/hooks/use-locale'
import { cn } from '@/lib/utils'

type FormState = 'idle' | 'submitting' | 'success'

type ContactFormData = {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

const initialData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
}

export function ContactForm({ className }: { className?: string }) {
  const { t } = useLocale()
  const [formState, setFormState] = useState<FormState>('idle')
  const [data, setData] = useState<ContactFormData>(initialData)

  const updateField = (field: keyof ContactFormData, value: string) => {
    setData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!data.name.trim() || !data.email.trim() || !data.message.trim()) {
      return
    }

    setFormState('submitting')

    const subject = encodeURIComponent(`Consultation request from ${data.name}`)
    const body = encodeURIComponent(
      [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        data.phone ? `Phone: ${data.phone}` : null,
        data.company ? `Company: ${data.company}` : null,
        '',
        data.message,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`

    window.setTimeout(() => {
      setFormState('success')
      setData(initialData)
    }, 600)
  }

  if (formState === 'success') {
    return (
      <div
        className={cn(
          'glass-cosmic flex flex-col items-center justify-center gap-4 rounded-2xl px-6 py-12 text-center',
          className,
        )}
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full border border-astra-cyan/30 bg-astra-cyan/10 text-astra-cyan">
          <CheckCircle2 className="size-7" />
        </span>
        <p className="max-w-sm text-sm leading-relaxed text-white/75">{t('form.success')}</p>
        <CosmicButton size="sm" variant="outline" onClick={() => setFormState('idle')}>
          OK
        </CosmicButton>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('glass-cosmic space-y-5 rounded-2xl p-6 sm:p-8', className)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="cosmic-label" htmlFor="contact-name">
            {t('form.name')}
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            className="cosmic-input"
            placeholder={t('form.namePlaceholder')}
            value={data.name}
            onChange={(event) => updateField('name', event.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="cosmic-label" htmlFor="contact-email">
            {t('form.email')}
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            className="cosmic-input"
            placeholder={t('form.emailPlaceholder')}
            value={data.email}
            onChange={(event) => updateField('email', event.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="cosmic-label" htmlFor="contact-phone">
            {t('form.phone')}{' '}
            <span className="normal-case tracking-normal text-white/30">({t('form.optional')})</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className="cosmic-input"
            placeholder={t('form.phonePlaceholder')}
            value={data.phone}
            onChange={(event) => updateField('phone', event.target.value)}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="cosmic-label" htmlFor="contact-company">
            {t('form.company')}{' '}
            <span className="normal-case tracking-normal text-white/30">({t('form.optional')})</span>
          </label>
          <input
            id="contact-company"
            type="text"
            autoComplete="organization"
            className="cosmic-input"
            placeholder={t('form.companyPlaceholder')}
            value={data.company}
            onChange={(event) => updateField('company', event.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="cosmic-label" htmlFor="contact-message">
          {t('form.message')}
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          className="cosmic-input resize-none"
          placeholder={t('form.messagePlaceholder')}
          value={data.message}
          onChange={(event) => updateField('message', event.target.value)}
        />
      </div>

      <div className="space-y-4 pt-1">
        <CosmicButton type="submit" className="w-full gap-2 sm:w-auto" disabled={formState === 'submitting'}>
          {formState === 'submitting' ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              ...
            </>
          ) : (
            <>
              <Send className="size-4" />
              {t('form.submit')}
            </>
          )}
        </CosmicButton>
        <p className="text-xs leading-relaxed text-white/35">{t('form.privacy')}</p>
      </div>
    </form>
  )
}
