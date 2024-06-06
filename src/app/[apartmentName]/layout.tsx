import '@/app/globals.css'
import '@/styles/globals.scss'

import { Metadata } from 'next'
import Script from 'next/script'
import { ReactNode } from 'react'

import Footer from '@/components/common/Footer'
import Header from '@/components/common/Header'
import StyledComponentsRegistry from '@/lib/registry'
import ReactQueryProviders from '@/providers/provider'
import ThemeClient from '@/providers/ThemeClient'
import { setApartmentData } from '@/redux/authSlice'
import { store } from '@/redux/store'
import { StoreProvider } from '@/redux/storeProvider'
import { fetchApartmentDataUseName } from '@/serverActions/fetchApartmentData'

// 기본 Metadata
export const metadata: Metadata = {
  title: {
    template: '%s Page',
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
  const apartmentData = await fetchApartmentDataUseName(params.apartmentName)

  // Redux 스토어에 초기 데이터 설정
  store.dispatch(setApartmentData(apartmentData))

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
        <Script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.18/lang/summernote-ko-KR.min.js"
          strategy="beforeInteractive"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css"
          rel="stylesheet"
        />
      </body>
    </html>
  )
}
