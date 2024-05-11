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
    _01: menuTitle1 + medium,
    _02: menuTitle2 + bold,
  },
  title: title1 + bold,
  subTitle: {
    _01: subTitle1 + bold,
    _02: subTitle2 + bold,
  },
  body: {
    _01: body1 + medium,
    _02: body2 + medium,
    _03: body3 + medium,
    _04: body4 + medium,
    _05: body5 + medium,
    _06: body6 + medium,
  },
  caption: {
    _01: caption1 + medium,
    _02: caption2 + bold,
  },
}

// 02.Color
const color = {
  // Theme / Brand
  primaryColor: '#2A3F6D',
  subColor: '#1674B7',

  // Gray
  white: '#ffffff',
  black100: '#222222',

  gray: {
    _01: '#F9F9F9',
    _02: '#F7F7F7',
    _03: '#EEEEEE',
    _04: '#DDDDDD',
    _05: '#BBBBBB',
    _06: '#999999',
    _07: '#777777',
    _08: '#666666',
    _09: '#555555',
    _10: '#333333',
  },
}

const devices = {
  mobile: '414px', // 미정
  tablet: '820px', // 미정
  laptop: '1440px',
}

const theme: DefaultTheme = {
  fonts,
  colors: color,
  devices,
}

export default theme
