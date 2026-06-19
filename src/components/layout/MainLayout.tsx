import type { ReactNode } from 'react'
import { Starfield } from '@/components/common'
import { Footer } from './Footer'
import { Header } from './Header'

type MainLayoutProps = {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="relative min-h-svh w-full overflow-x-clip bg-astra-space font-sans text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-astra-cyan focus:px-4 focus:py-2 focus:text-astra-space"
      >
        Skip to content
      </a>
      <Starfield />
      <Header />
      <main id="main-content" className="relative z-10 w-full min-w-0 overflow-x-clip pt-16">
        {children}
      </main>
      <Footer />
    </div>
  )
}
