'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header<{ $isMainPage: boolean }>`
  width: 100%;
  padding-top: ${({ $isMainPage }) => ($isMainPage ? '0px' : '200px')};
`

const HeaderContainer = styled.div<{
  $isMainPage: boolean
  $isScrolled: boolean
}>`
  transition:
    color 0.1s ease-in-out,
    background 0.1s ease-in-out;
  width: 100%;
  z-index: 100;
  position: fixed;
  top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: ${({ $isScrolled, $isMainPage }) =>
    $isMainPage
      ? $isScrolled
        ? 'white'
        : 'rgba(255, 255, 255, 0.3)'
      : 'white'};
  ${({ $isMainPage, $isScrolled }) =>
    $isMainPage &&
    !$isScrolled &&
    `
    -webkit-backdrop-filter: blur(4px);
    border-bottom: 1px solid white;
    box-shadow: none;

    &::before {
      content: '';
      display: block;
      width: 100%;
      top: 118px;
    }
  `}
`

const HeaderTop = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 1280px;
  padding: 58px 0 18px 80px;

  .logo {
    display: flex;
    align-items: flex-start;
    align-items: center;
    gap: 16px;
    ${({ theme }) => theme.fonts.menuTitle._01}
    color: ${({ theme }) => theme.colors.gray._10};

    span {
      letter-spacing: -0.28px;
    }
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

const NavDetail = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0px calc(50% - 640px);
  backdrop-filter: blur(5px);
  max-height: ${({ $isOpen }) => ($isOpen ? '500px' : '0')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  overflow: hidden;
  transition:
    max-height 0.5s ease-in-out,
    opacity 0.5s ease-in-out,
    color 0.5s ease-in-out,
    background 0.5s ease-in-out;

  .detail-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 250px;
    ${({ theme }) => theme.fonts.body._04}

    .detail-item {
      height: 72px;
      list-style: none;
      align-content: center;
      a {
        transition:
          font-size 0.2s ease-out,
          font-weight 0.2s ease-out;
        color: ${({ theme }) => theme.colors.gray._10};
      }
      :hover {
        font-size: 24px;
        font-weight: 900;
      }
    }
  }
`

const HeaderBottom = styled.div<{
  $isMainPage: boolean
  $isScrolled: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .nav-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0px calc(50% - 640px);
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
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
  const [$isScrolled, setIsScrolled] = useState(
    typeof window !== 'undefined' ? window.scrollY > 573 : false,
  )
  const pathname = usePathname()
  const mainPagePattern = /^\/[^\/]+$/
  const $isMainPage = mainPagePattern.test(pathname)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 573)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // const session = await getSession()

  return (
    <HeaderWrapper $isMainPage={$isMainPage}>
      <HeaderContainer
        $isMainPage={$isMainPage}
        $isScrolled={$isScrolled}>
        <HeaderTop>
          <Link
            href="/"
            className="logo">
            <Image
              width={155}
              height={42}
              src="/icons/logo.svg"
              alt=""
              className="logo-image"
            />
            <span>시그니엘레지던스</span>
          </Link>
          {/* <div className="chip-wrap">
            {session?.user ? (
              <>
                <form action={signOutWithForm}>
                  <Link
                    type="submit"
                    href="/login"
                    className="chip-link">
                    <CustomChip color="fill"> 로그아웃 </CustomChip>
                  </Link>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/join"
                  className="chip-link">
                  <CustomChip color="outline">회원가입</CustomChip>
                </Link>
                <Link
                  href="/login"
                  className="chip-link">
                  <CustomChip color="fill"> 로그인 </CustomChip>
                </Link>
              </>
            )}
          </div> */}
        </HeaderTop>
        <HeaderBottom
          $isMainPage={$isMainPage}
          $isScrolled={$isScrolled}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}>
          <div className="nav-wrap">
            <ul className="nav-top">
              <Link href="/">
                <li className="item">아파트 정보</li>
              </Link>
              <Link href="/">
                <li className="item">공지사항</li>
              </Link>
              <Link href="/">
                <li className="item">아파트 민원</li>
              </Link>
              <Link href="/">
                <li className="item">소통공간</li>
              </Link>
            </ul>
            <Link href="/">
              <Image
                className={$isMainPage ? 'mainUserIcon' : ''}
                width={37}
                height={35}
                src="/icons/user.svg"
                alt="userIcon"
              />
            </Link>
          </div>

          <NavDetail $isOpen={isHovering}>
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
    </HeaderWrapper>
  )
}
