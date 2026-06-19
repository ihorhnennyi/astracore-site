import { AppProviders } from '@/app/providers'
import { PageLoader } from '@/components/common'
import { usePageLoader } from '@/hooks/use-page-loader'
import { HomePage } from '@/pages/home'

export default function App() {
  const { progress, isVisible, isExiting } = usePageLoader()

  return (
    <AppProviders>
      {isVisible ? <PageLoader progress={progress} exiting={isExiting} /> : null}
      <HomePage />
    </AppProviders>
  )
}
