import '@/app/globals.css'
import '../styles/globals.scss'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Metadata } from 'next'
import { ReactNode } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import StyledComponentsRegistry from '@/lib/registry'
import ThemeClient from '@/providers/ThemeClient'

import ReactQueryProviders from '../providers/provider'

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
          <ReactQueryProviders>
            <StyledComponentsRegistry>
              <ThemeClient>
                <Header />
                {children}
                <Footer />
              </ThemeClient>
            </StyledComponentsRegistry>
            <ReactQueryDevtools initialIsOpen={false} />
          </ReactQueryProviders>
        </body>
      </html>
    </>
  )
}
