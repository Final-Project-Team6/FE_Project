'use client'

import React from 'react'
import styled from 'styled-components'

interface ChipProps {
  children: string
  color: string
  className?: string // className를 선택적으로 받기 위해 `?` 추가
}

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 16px;
  border-radius: 40px;

  ${({ theme }) => theme.fonts.caption._02};
  text-align: center;

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

function Chip({ children, color, className }: ChipProps) {
  return (
    <ChipContainer className={`${color} ${className}`}>
      {children}
    </ChipContainer>
  )
}

export default Chip
