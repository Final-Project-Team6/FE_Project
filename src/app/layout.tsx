import '@/app/globals.css'

import { Metadata } from 'next'
import { ReactNode } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import StyledComponentsRegistry from '@/lib/registry'
import ThemeClient from '@/providers/ThemeClient'

export const metadata: Metadata = {
  title: {
    template: 'Apatner | %s Page',
    default: 'Apatner',
  },
  description: 'Apatner 6조 프로젝트',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="ko">
        <body>
          <StyledComponentsRegistry>
            <ThemeClient>
              <Header />
              {children}
              <Footer />
            </ThemeClient>
          </StyledComponentsRegistry>
        </body>
      </html>
    </>
  )
}
