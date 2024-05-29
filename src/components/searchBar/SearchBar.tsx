'use client'
import Image from 'next/image'
import arrow from 'public/icons/arrowDownGray10.svg'
import search from 'public/icons/search.svg'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import SearchBarProps from '@/types/searchBar.interface'

const InputContent = styled.div<{ $dropDown?: string[] }>`
  width: 628px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .inputContainer {
    display: flex;
    align-items: center;
    width: fit-content;
    justify-content: space-between;
    width: 452px;
    position: relative;
  }
  .dropDown {
    width: 150px;
    position: absolute;
    ${({ theme }) => theme.fonts.body._05}
  }
  .hasDropdown {
    padding-left: 150px;
  }
  .dropDown * {
    box-sizing: border-box;
  }
  .select {
    color: ${({ theme }) => theme.colors.gray._10};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 12px 12px 24px;
    cursor: pointer;
    transition: background 0.3s;
  }
  .carpet {
    transition: 0.2s;
  }
  .carpet-rotate {
    transform: rotate(180deg);
  }
  .menu {
    list-style: none;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray._10};
    position: absolute;
    top: 60px;
    left: 60px;
    width: 120px;
    transform: translateX(-50%);
    opacity: 0;
    display: none;
    transition: 0.2s;
    z-index: 1;
    border: 0px;
    border-radius: 8px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.25);
  }
  .menu li {
    padding: 0.7em 0.5em;
    cursor: pointer;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray._05};
    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom: none;
    }
  }
  .active {
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.gray._07};
  }
  .menu-open {
    display: block;
    opacity: 1;
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
    padding: 16px 16px 16px ${({ $dropDown }) => ($dropDown ? '160px' : '16px')};
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
    & {
      border-color: ${({ theme }) => theme.colors.black100};
      color: ${({ theme }) => theme.colors.black100};
    }
  }
`

export default function Input({
  id,
  placeholder,
  value,
  dropDown,
  onChange,
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value || '')
  const [selectClicked, setSelectClicked] = useState(false)
  const [selectedOption, setSelectedOption] = useState('전체')

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

  const toggleDropdown = () => {
    setSelectClicked(!selectClicked)
  }

  const selectOption = (option: string) => {
    setSelectedOption(option)
    setSelectClicked(false)
  }

  return (
    <InputContent
      className="container"
      $dropDown={dropDown}>
      <div className="inputContainer">
        {dropDown && (
          <div className="dropDown">
            <div
              className={'select'}
              onClick={toggleDropdown}>
              <span className="selected">{selectedOption}</span>
              <div
                className={`carpet ${selectClicked ? 'carpet-rotate' : ''}`}
              />
              <Image
                className={`carpet ${selectClicked ? 'carpet-rotate' : ''}`}
                src={arrow}
                width={24}
                height={24}
                alt="Clear input"
                priority
              />
            </div>
            <ul className={`menu ${selectClicked ? 'menu-open' : ''}`}>
              {dropDown.map(option => (
                <li
                  key={option}
                  className={option === selectedOption ? 'active' : ''}
                  onClick={() => selectOption(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
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
