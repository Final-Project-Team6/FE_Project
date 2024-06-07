'use client'
import Image from 'next/image'
import search from 'public/icons/search.svg'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import SearchBarProps from '@/types/searchBar.interface'

const InputContent = styled.div<{ $dropDown?: string[] }>`
  width: 452px;
  height: 52px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .inputContainer {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
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

  .inputArea {
    width: 100%;
    height: 52px;
    outline: 0;
    ${({ theme }) => theme.fonts.body._05}
    color: ${({ theme }) => theme.colors.black100};
    background: ${({ theme }) => theme.colors.white};
    line-height: 24px;
    letter-spacing: -0.18px;
    padding: 16px 14px;
    border: 2px solid ${({ theme }) => theme.colors.gray._05};
    border-radius: 35px;
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
`

export default function Mypage_SearchBar({
  id,
  placeholder,
  value,
  dropDown,
  onChange,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value || '')

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      if (onChange) {
        onChange(e)
      }
    },
    [onChange],
  )

  return (
    <InputContent $dropDown={dropDown}>
      <div className="inputContainer">
        <input
          className="inputArea"
          id={id}
          type="text"
          placeholder={placeholder}
          onChange={onChangeText}
          value={inputValue}
        />
        <div className="iconContainer">
          <Image
            src={search}
            width={24}
            height={24}
            alt="Clear input"
            priority
          />
        </div>
      </div>
    </InputContent>
  )
}
