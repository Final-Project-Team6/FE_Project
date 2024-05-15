import '@/app/globals.css'

import { Metadata } from 'next'
import { ReactNode } from 'react'

import Header from '@/components/common/Header'
import StyledComponentsRegistry from '@/lib/registry'
import ThemeClient from '@/providers/ThemeClient'

export const metadata: Metadata = {
  title: 'title',
  description: 'description',
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
            </ThemeClient>
          </StyledComponentsRegistry>
        </body>
      </html>
    </>
  )
}
