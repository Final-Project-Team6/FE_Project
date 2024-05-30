'use client'

import { ButtonHTMLAttributes } from 'react'
import { styled } from 'styled-components'

// ButtonHTMLAttributes로 button 태그에 기본으로 들어있는 속성 확장
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: 'phone' | 'message' | 'confirm'
  color?: 'white' | 'primary' | 'default'
  text?: 'thin' | 'thick'
}

/* Todo
  실제 브라우저에서는 버튼 크기가 굉장히 크게 나옴
  UIUX 디자이너와 협의 필요 (브라우저 환경에서 실제 어떤 지 보여줘야 함)
*/
const StyledButton = styled.button<ButtonProps>`
  border: 2px solid ${({ theme }) => theme.colors.primaryColor};
  border-radius: 8px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fonts.subTitle._02};
  &.phone {
    min-width: 110px;
    min-height: 48px;
    padding: 16px 20px;
  }
  &.message {
    min-width: 190px;
    min-height: 72px;
    padding: 24px 20px;
  }
  &.confirm {
    min-width: 628px;
    min-height: 72px;
    padding: 27px 20px;
  }
  &.default {
    border: 2px solid ${({ theme }) => theme.colors.gray._05};
    color: ${({ theme }) => theme.colors.gray._07};
    padding: 16px 40px;
    width: auto;
    ${({ theme }) => theme.fonts.body._05};
  }
  &.white {
    background: ${({ theme }) => theme.colors.white};
  }
  &.primary {
    background: ${({ theme }) => theme.colors.primaryColor};
    color: ${({ theme }) => theme.colors.white};
    border: none;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.gray._06};
    border: none;
    cursor: not-allowed;
  }
  &.thin {
    ${({ theme }) => theme.fonts.body._05};
  }
`
/**
 * @param size - *phone* - 110 x 56 | *message* - 190 x 72 | *confirm* - 628 x 72
 * @param color - *white* - #FFFFFF | *primary* - #2A3F6D
 * @description disabled 처리 시 gray06 색상 및 cursor allow X
 * @returns
 */
export default function Button({ ...props }: ButtonProps) {
  return (
    <StyledButton
      {...props}
      className={`${props.size} ${props.color} ${props.text}`}
    />
  )
}
