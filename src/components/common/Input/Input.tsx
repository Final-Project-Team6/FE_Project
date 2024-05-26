'use client'
import Image from 'next/image'
import check from 'public/icons/check.svg'
import chipCheck from 'public/icons/check_black.svg'
import close from 'public/icons/close.svg'
import hidePassword from 'public/icons/hidePassword.svg'
import showPassword from 'public/icons/showPassword.svg'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import InputProps from '@/types/input.interface'
import { addHyphenToPhoneNum } from '@/utils/addHyphenToPhoneNum'

const InputContent = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : '628px')};

  .inputContainer {
    display: flex;
    align-items: center;
    width: fit-content;
    justify-content: space-between;
    width: 100%;
    position: relative;
  }
  .iconContainer {
    position: absolute;
    right: 16px;
    display: flex;
    height: 100%;
    align-items: center;
    gap: 8px;
    & > img {
      cursor: pointer;
    }
    & > .noCursor {
      cursor: auto;
    }
  }
  .chipContainer {
    margin-top: 8px;
    display: flex;
    gap: 8px;
  }
  .inputArea {
    width: 100%;
    height: 72px;
    outline: 0;
    ${({ theme }) => theme.fonts.body._04}
    color: ${({ theme }) => theme.colors.black100};
    background: ${({ theme }) => theme.colors.white};
    line-height: 24px;
    letter-spacing: -0.18px;
    padding: 16px;
    border: 2px solid ${({ theme }) => theme.colors.gray._05};
    border-radius: 8px;
    + img {
      position: relative;
      cursor: pointer;
      display: block;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray._05};
    }
    &:focus {
      border-color: ${({ theme }) => theme.colors.black100};
      color: ${({ theme }) => theme.colors.black100};
    }
  }
  .timeOver {
    background-color: ${({ theme }) => theme.colors.gray._04};
  }
  .timer {
    ${({ theme }) => theme.fonts.body._04}
    user-select: none;
  }
  .message {
    ${({ theme }) => theme.fonts.body._06}
    color: ${({ theme }) => theme.colors.gray._07};
    padding-left: 16px;
    margin: 8px 0 0 0;
  }
  .error {
    border-color: red;
  }
  .errorMessage {
    color: red;
  }
  .success {
    border-color: ${({ theme }) => theme.colors.subColor};
  }
  .chip {
    ${({ theme }) => theme.fonts.body._04}
    color: ${({ theme }) => theme.colors.gray._10};
    display: flex;
    padding: 6px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: fit-content;
    border-radius: 30px;
    background: ${({ theme }) => theme.colors.gray._03};
  }
`

export default function Input({
  id = 'default',
  type = 'default',
  disabled,
  placeholder,
  required,
  value,
  status,
  timer,
  clearIcon,
  passwordIcon,
  checkIcon,
  message,
  chip,
  width,
  onChange,
}: InputProps) {
  const [passwordWatch, setPasswordWatch] = useState(false)
  const [inputValue, setInputValue] = useState(value || '')

  const handlePassWordWatchClick = useCallback(() => {
    setPasswordWatch(prevState => !prevState)
  }, [])

  const handleClearInputValue = useCallback(() => {
    setInputValue('')
  }, [])

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value

      const formattedValue =
        type === 'tel' ? addHyphenToPhoneNum(newValue) : newValue

      setInputValue(formattedValue)

      // 변경된 부분: onChange prop 호출
      if (onChange) {
        onChange(e) // onChange prop에 이벤트 객체 전달
      }
    },
    [type, onChange], // onChange 추가
  )

  return (
    <InputContent
      className="container"
      width={width}>
      <div className="inputContainer">
        <input
          className={`inputArea${status ? ' ' + status : ''}${timer === '시간 종료' ? ' timeOver' : ''}`}
          id={id}
          type={type === 'password' && passwordWatch ? 'text' : type}
          disabled={timer === '시간 종료' || disabled}
          placeholder={placeholder}
          onChange={onChangeText}
          value={inputValue}
          required={required}
        />
        <div className="iconContainer">
          {inputValue && clearIcon && (
            <Image
              onClick={handleClearInputValue}
              src={close}
              width={15}
              height={15}
              alt="Clear input"
              priority
            />
          )}
          {passwordIcon && (
            <Image
              onClick={handlePassWordWatchClick}
              src={passwordWatch ? showPassword : hidePassword}
              width={24}
              height={24}
              alt="Toggle password visibility"
              priority
            />
          )}
          {timer && (
            <span className={`timer ${timer === '시간 종료' && 'timeOver'}`}>
              {timer}
            </span>
          )}
          {checkIcon && (
            <Image
              className="noCursor"
              src={check}
              width={16}
              height={16}
              alt="Check input"
              priority
            />
          )}
        </div>
      </div>
      {message && <p className={`message ${status}Message`}>{message}</p>}
      {chip && (
        <div className="chipContainer">
          {chip.map((text, idx) => {
            return (
              <div
                className="chip"
                key={idx}>
                {text}
                {/* ⬇️ idx는 추후 비밀번호의 조건 통과에 대한 값을 넣어주세요. */}
                {idx % 2 === 0 && (
                  <Image
                    src={chipCheck}
                    width={16}
                    height={16}
                    alt="clear input"
                    priority
                  />
                )}
              </div>
            )
          })}
        </div>
      )}
    </InputContent>
  )
}
