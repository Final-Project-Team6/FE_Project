'use client'

import { createGlobalStyle } from 'styled-components'

//Pretendard 폰트
export const GlobalStyle = createGlobalStyle`
  html {
    --font-pretendard: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
  }
  body {
    font-family: var(--font-pretendard);
  }
`

// 폰트 크기
export const sizeMap = {
  xs: 1.25,
  sm: 1.5,
  lg: 1.75,
  xl: 2.5,
}

// 폰트 두께
export const weightMap = {
  regular: 400,
  medium: 500,
  bold: 700,
}
