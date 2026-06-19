import { SeoHead } from '@/components/seo/SeoHead'
import {
  AudienceSection,
  BenefitsSection,
  CtaSection,
  HeroSection,
  ServicesSection,
  StatsSection,
  ValuesSection,
} from '@/components/home'
import { MainLayout } from '@/components/layout'

export function HomePage() {
  return (
    <MainLayout>
      <SeoHead />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <AudienceSection />
      <ValuesSection />
      <StatsSection />
      <CtaSection />
    </MainLayout>
  )
}
