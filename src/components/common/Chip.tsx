'use client'

import React from 'react'
import styled from 'styled-components'

interface ChipProps {
  children: string
  color: string
  textType?: string
  className?: string
  onClick?: () => void // onClick 핸들러를 선택적으로 받기 위해 추가
}

const ChipContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  align-items: center;
  padding: 2px 16px;
  border-radius: 40px;

  text-align: center;
  border: 2px solid transparent;
  ${({ theme }) => theme.fonts.caption._02};

  &.thin {
    ${({ theme }) => theme.fonts.caption._01};
  }

  &.fill {
    background-color: ${({ theme }) => theme.colors.primaryColor};
    color: ${({ theme }) => theme.colors.white};
  }

  &.outline {
    border: 2px solid ${({ theme }) => theme.colors.primaryColor};
    color: ${({ theme }) => theme.colors.primaryColor};
  }

  &.fill_black {
    background-color: ${({ theme }) => theme.colors.gray._10};
    color: ${({ theme }) => theme.colors.white};
  }

  &.fill_gray {
    background-color: ${({ theme }) => theme.colors.gray._03};
    color: ${({ theme }) => theme.colors.gray._10};
  }
`

function Chip({ children, color, className, textType, onClick }: ChipProps) {
  return (
    <ChipContainer
      className={`${color} ${className} ${textType}`}
      onClick={onClick}>
      {children}
    </ChipContainer>
  )
}

export default Chip
