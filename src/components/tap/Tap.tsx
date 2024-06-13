'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { TabLinkProps, TabSelectProps } from '@/types/tab.interface'

const Tabs = styled.nav`
  margin-top: 50px;
  font-size: 15px;
  padding: 0;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
  display: inline-block;
  position: relative;
`

const StyledLink = styled(Link)<TabLinkProps>`
  text-decoration: none;
  color: ${props =>
    props.$active ? props.theme.colors.gray._10 : props.theme.colors.gray._07};
  text-transform: uppercase;
  padding: 10px 20px;
  display: inline-block;
  position: relative;
  z-index: 1;
  transition-duration: 0.6s;
`

const Selector = styled.div<TabSelectProps>`
  height: 2px;
  display: inline-block;
  position: absolute;
  left: ${props => props.$left}px;
  width: ${props => props.$width}px;
  top: 46px;
  z-index: 1;
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background: ${({ theme }) => theme.colors.primaryColor};
`

export default function ElasticTabs({ tapList }: { tapList: string[] }) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectorStyle, setSelectorStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const activeItem = document.querySelector('.tabs a.active') as HTMLElement
    if (activeItem) {
      setSelectorStyle({
        left: activeItem.offsetLeft,
        width: activeItem.offsetWidth,
      })
    }
  }, [activeTab])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <Tabs className="tabs">
      {tapList.map((tab, idx) => (
        <StyledLink
          href="#"
          className={`body_03 ${activeTab === idx ? 'active' : ''}`}
          $active={activeTab === idx}
          onClick={() => handleTabClick(idx)}
          key={idx}>
          {tab}
        </StyledLink>
      ))}
      <Selector
        className="selector"
        $left={selectorStyle.left}
        $width={selectorStyle.width}
      />
    </Tabs>
  )
}
