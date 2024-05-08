import '@/styles/global-styles'

import { Metadata } from 'next'
import { ReactNode } from 'react'

import Header from '@/components/common/Header'
import StyledComponentsRegistry from '@/lib/registry'

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
            <Header />
            {children}
          </StyledComponentsRegistry>
        </body>
      </html>
    </>
  )
}
