import '@/app/globals.css'
import '@/styles/globals.scss'

import { Metadata } from 'next'
import { ReactNode } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import StyledComponentsRegistry from '@/lib/registry'
import ReactQueryProviders from '@/providers/provider'
import ThemeClient from '@/providers/ThemeClient'
import { StoreProvider } from '@/redux/storeProvider'
import { getData } from '@/serverActions/fetchApartmentData'

// 기본 Metadata
export const metadata: Metadata = {
  title: {
    template: 'Apatner | %s Page',
    default: 'Apatner',
  },
  description: 'Apatner 6조 프로젝트',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { apartmentName: string }
}) {
  const apartmentData = await getData(params.apartmentName)
  return (
    <html lang="ko">
      <body>
        <StoreProvider>
          <ReactQueryProviders>
            <StyledComponentsRegistry>
              <ThemeClient>
                <Header apartmentData={apartmentData} />
                {children}
                <Footer />
              </ThemeClient>
            </StyledComponentsRegistry>
          </ReactQueryProviders>
        </StoreProvider>
      </body>
    </html>
  )
}
