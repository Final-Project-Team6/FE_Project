'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Chip from './Chip'

const HeaderContainer = styled.div<{ isMainPage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 30px;
  color: #111;
  ${({ isMainPage }) =>
    isMainPage
      ? `
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-bottom: 1px solid white;
    box-shadow: none;

    &::before {
      content: '';
      display: block;
      width: 100%;
      position: absolute;
      top: 118px;
      border: 1px solid white;
    }
  `
      : `
    background-color: white;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
`

const CustomChip = styled(Chip)`
  ${({ theme }) => theme.fonts.caption._01}
`

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1280px;
  padding: 58px 0 18px 80px;

  .logo {
    display: flex;
    align-items: center;
    gap: 16px;
    ${({ theme }) => theme.fonts.menuTitle._01}
    color: ${({ theme }) => theme.colors.gray._10};
  }

  .chip-wrap {
    display: flex;
    gap: 16px;

    .chip-link {
      display: flex;
      align-items: center;
      ${({ theme }) => theme.fonts.caption._01};
    }
  }
`

const NavDetail = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: flex-start;

  width: 1280px;
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  overflow: hidden;
  transition:
    max-height 0.5s ease-in-out,
    opacity 0.5s ease-in-out;

  .detail-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    ${({ theme }) => theme.fonts.body._04}

    .detail-item {
      height: 72px;
      list-style: none;
      a {
        color: ${({ theme }) => theme.colors.gray._10};
      }
    }
  }
`

const HeaderBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 1280px;

  .nav-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .nav-top {
    display: flex;
    ${({ theme }) => theme.fonts.menuTitle._02}
    color: ${({ theme }) => theme.colors.gray._10};

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      height: 76px;
    }
  }
`

export default function Header() {
  const [isHovering, setIsHovering] = useState(false)
  const [isMainPage, setIsMainPage] = useState(false)
  const pathname = usePathname()

  // 메인페이지일 경우 배경 투병으로 변경
  useEffect(() => {
    setIsMainPage(pathname === '/')
  }, [pathname])

  return (
    <HeaderContainer isMainPage={isMainPage}>
      <HeaderTop>
        <Link
          href="/"
          className="logo">
          <img
            src="/icons/logo.svg"
            alt=""
            className="logo-image"
          />
          시그니엘레지던스
        </Link>
        <div className="chip-wrap">
          <Link
            href="/"
            className="chip-link">
            <CustomChip color="outline">회원가입</CustomChip>
          </Link>
          <Link
            href="/login"
            className="chip-link">
            <CustomChip color="fill"> 로그인 </CustomChip>
          </Link>
        </div>
      </HeaderTop>

      <HeaderBottom
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}>
        <div className="nav-wrap">
          <ul className="nav-top">
            <li className="item">아파트 정보</li>
            <li className="item">공지사항</li>
            <li className="item">아파트 민원</li>
            <li className="item">소통공간</li>
          </ul>
          <Link href="/">
            <img
              src="/icons/user.svg"
              alt="userIcon"
            />
          </Link>
        </div>

        <NavDetail isOpen={isHovering}>
          <ul className="detail-wrap">
            <li className="detail-item">
              <Link href="/"> 인사말 </Link>
            </li>
            <li className="detail-item">
              <Link href="/"> 단지전경 </Link>
            </li>
            <li className="detail-item">
              <Link href="/"> 연락처정보 </Link>
            </li>
            <li className="detail-item">
              <Link href="/"> 커뮤니티시설 </Link>
            </li>
          </ul>

          <ul className="detail-wrap">
            <li className="detail-item">
              <Link href="/"> 공지사항 </Link>
            </li>
            <li className="detail-item">
              <Link href="/"> 의무공개 </Link>
            </li>
          </ul>

          <ul className="detail-wrap">
            <li className="detail-item">
              <Link href="/"> 관리사무소 인원 </Link>
            </li>
          </ul>

          <ul className="detail-wrap">
            <li className="detail-item">
              <Link href="/"> 입주민 소통 </Link>
            </li>
            <li className="detail-item">
              <Link href="/"> 입대의 소통 </Link>
            </li>
          </ul>
        </NavDetail>
      </HeaderBottom>
    </HeaderContainer>
  )
}
