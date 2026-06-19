import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  label?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'space-y-3',
        align === 'center' && 'mx-auto max-w-3xl text-center',
        className,
      )}
    >
      {label ? <p className="type-label text-astra-cyan">{label}</p> : null}
      <h2 className="display-title text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="type-body-lg max-w-2xl text-white/55">{description}</p>
      ) : null}
    </div>
  )
}
