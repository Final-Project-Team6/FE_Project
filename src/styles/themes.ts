'use client'

import { DefaultTheme } from 'styled-components'

// 01.Typography
const menuTitle1 =
  'font-family: Pretendard Variable; font-size: 28px; line-height: 36px;'
const menuTitle2 =
  'font-family: Pretendard Variable; font-size: 20px; line-height: 28px;'
const title1 =
  'font-family: Pretendard Variable; font-size: 40px; line-height: 48px;'
const subTitle1 =
  'font-family: Pretendard Variable; font-size: 24px; line-height: 32px;'
const subTitle2 =
  'font-family: Pretendard Variable; font-size: 20px; line-height: 28px;'
const body1 =
  'font-family: Pretendard Variable; font-size: 28px; line-height: 36px;'
const body2 =
  'font-family: Pretendard Variable; font-size: 24px; line-height: 32px;'
const body3 =
  'font-family: Pretendard Variable; font-size: 20px; line-height: 28px;'
const body4 =
  'font-family: Pretendard Variable; font-size: 18px; line-height: 24px;'
const body5 =
  'font-family: Pretendard Variable; font-size: 16px; line-height: 24px;'
const body6 =
  'font-family: Pretendard Variable; font-size: 12px; line-height: 18px;'
const caption1 =
  'font-family: Pretendard Variable; font-size: 16px; line-height: 24px;'
const caption2 =
  'font-family: Pretendard Variable; font-size: 16px; line-height: 24px;'

// 피그마에 있지만 아직 사용하지 않아 주석처리
// const regular = 'font-weight: 400;'
const medium = 'font-weight: 500;'
const bold = 'font-weight: 700;'

const fonts = {
  menuTitle: {
    _1: menuTitle1 + medium,
    _2: menuTitle2 + bold,
  },
  title: title1 + bold,
  subTitle: {
    _1: subTitle1 + bold,
    _2: subTitle2 + bold,
  },
  body: {
    _1: body1 + medium,
    _2: body2 + medium,
    _3: body3 + medium,
    _4: body4 + medium,
    _5: body5 + medium,
    _6: body6 + medium,
  },
  caption: {
    _1: caption1 + medium,
    _2: caption2 + bold,
  },
}

const theme: DefaultTheme = {
  fonts,
}

export default theme
