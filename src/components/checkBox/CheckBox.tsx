'use client'

import { useState } from 'react'
import styled from 'styled-components'
// import RadioImg from '../../../public/checkbox.svg'

interface CheckBoxProps {
  children: string
}
// test svg경로
const RadioImg = '/checkbox.svg'

const CheckContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => theme.fonts.body._05}
  color: ${({ theme }) => theme.colors.gray._07};

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
  }

  /* 체크되었을 때 스타일 변경 */
  .input:checked + .label-box {
    /* background-image: url('/checkbox.svg'); */
    background-image: url(${RadioImg});
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

export default function CheckBox({ children }: CheckBoxProps) {
  // check일경우 글씨색 변경
  const [isChecked, setIsChecked] = useState(false)
  const handleChange = () => {
    setIsChecked(!isChecked)
  }

  return (
    <CheckContent>
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
