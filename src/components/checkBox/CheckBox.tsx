'use client'

import { useState } from 'react'
import styled, { css } from 'styled-components'

interface CheckBoxProps {
  children: string
  big?: boolean
}

const CheckContent = styled.div<{ big?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.fonts.body._05}
  color: ${({ theme }) => theme.colors.gray._07};
  /* 큰 경우에는 원하는 크기로 조정 */
  ${({ big }) =>
    big &&
    css`
      ${({ theme }) => theme.fonts.menuTitle._02}
      color: ${({ theme }) => theme.colors.gray._10};
    `}

  .input {
    display: none;
  }

  .label-box {
    border-radius: 3em;
    box-sizing: border-box;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border: 2px solid ${({ theme }) => theme.colors.gray._07};

    ${({ big }) =>
      big &&
      css`
        width: 24px;
        height: 24px;
      `}
  }

  .input:checked + .label-box {
    background-image: url('icons/checkbox.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: ${({ theme }) => theme.colors.primaryColor};
    border: none;
  }

  .checked {
    color: ${({ theme }) => theme.colors.gray._10};
  }
`

export default function CheckBox({ children, big }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false)
  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <CheckContent big={big}>
      <input
        type="checkbox"
        name=""
        id="check"
        className="input"
        onChange={handleChange}
      />
      <label
        htmlFor="check"
        className="label-box"
      />
      <span className={isChecked ? 'checked' : ''}>{children}</span>
    </CheckContent>
  )
}
