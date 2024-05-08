'use client'

import styled from 'styled-components'

import { sizeMap, weightMap } from '@/styles/themes'

interface TitleProps {
  children: string
  size: keyof typeof sizeMap
  weight: keyof typeof weightMap
}

const MenuTitle = styled.h1<TitleProps>`
  font-size: ${props => sizeMap[props.size]}rem;
  font-family: Pretendard;
  font-weight: ${props => weightMap[props.weight]};
  color: #111;
`

const Title = ({ children, size, weight }: TitleProps) => {
  return (
    <MenuTitle
      size={size}
      weight={weight}>
      {children}
    </MenuTitle>
  )
}

export default Title
