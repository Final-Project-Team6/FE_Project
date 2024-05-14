'use client'

import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

import Chip from './Chip'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-size: 30px;
  color: #111;
`
// caption 01로 덮어씌웁니다.
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

const NavDetail = styled.div`
  display: flex;

  width: 1280px;
  transition: 3s linear;

  .detail-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 250px;

    ${({ theme }) => theme.fonts.body._04}

    .detail-item {
      height: 72px;
      list-style: none;
    }
  }
`

const HeaderBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 1280px;

  &:hover + ${NavDetail} {
    display: flex;
  }

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
  const [isHovering, setIsHovering] = useState(0)

  return (
    <HeaderContainer>
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
            href="/"
            className="chip-link">
            <CustomChip color="fill"> 로그인 </CustomChip>
          </Link>
        </div>
      </HeaderTop>

      <HeaderBottom
        onMouseOver={() => setIsHovering(1)}
        onMouseOut={() => setIsHovering(0)}>
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

        {isHovering ? (
          <NavDetail>
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
        ) : (
          ''
        )}
      </HeaderBottom>
    </HeaderContainer>
  )
}
