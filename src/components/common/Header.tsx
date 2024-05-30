'use client'

import './Header.scss'

import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchApartmentReducer } from '@/redux/apartmentSlice'
import { clearAccessToken } from '@/redux/authSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { findApartmentData } from '@/types/apartmentData'

import Chip from './Chip'

export default function Header({
  apartmentData,
}: {
  apartmentData: findApartmentData
}) {
  //경로
  const apartmentName = apartmentData?.data?.name || 'defaultApartment'
  const dispatch: AppDispatch = useDispatch()
  const [isScrolled, setIsScrolled] = useState(
    typeof window !== 'undefined' ? window.scrollY > 573 : false,
  )
  const pathname = usePathname()
  const mainPagePattern = /^\/[^\/]+$/
  const isMainPage = mainPagePattern.test(pathname)

  //로그아웃
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const router = useRouter()

  const handleLogout = () => {
    dispatch(clearAccessToken())
    Cookies.remove('accessToken')
    router.replace('/')
  }

  useEffect(() => {
    dispatch(fetchApartmentReducer(apartmentData))
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 573)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [dispatch, apartmentData])

  return (
    <header className={`header-wrapper ${isMainPage ? 'is-main-page' : ''}`}>
      <div
        className={`header-container ${isMainPage ? 'is-main-page' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="header-top">
          <Link
            href="/"
            className="logo menuTitle1">
            <Image
              width={155}
              height={42}
              src={apartmentData?.data.icon}
              alt=""
              className="logo-image"
            />
            <span>{apartmentData?.data.name}</span>
          </Link>
          <div className="chip-wrap">
            {!accessToken ? (
              <>
                <Link
                  href={`/${apartmentName}/join`}
                  className="chip-link caption_02">
                  <Chip
                    color="outline"
                    className="custom-chip">
                    회원가입
                  </Chip>
                </Link>
                <Link
                  href={`/${apartmentName}/login`}
                  className="chip-link">
                  <Chip
                    color="fill"
                    className="custom-chip caption_01">
                    로그인
                  </Chip>
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={`/${apartmentName}/mypage`}
                  className="chip-link">
                  <Chip
                    color="outline"
                    className="custom-chip">
                    마이페이지
                  </Chip>
                </Link>
                <Link
                  href="/"
                  className="chip-link">
                  <Chip
                    onClick={handleLogout}
                    color="fill"
                    className="custom-chip caption_01">
                    로그아웃
                  </Chip>
                </Link>
              </>

              // <button onClick={handleLogout}>로그아웃</button>
            )}
          </div>
        </div>
        <div
          className={`header-bottom ${isMainPage ? 'is-main-page' : ''} ${isScrolled ? 'is-scrolled' : ''}`}>
          <div className="nav-wrap">
            <ul className="nav-top menuTitle2">
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
                className={isMainPage ? 'mainUserIcon' : ''}
                width={37}
                height={35}
                src="/icons/user.svg"
                alt="userIcon"
              />
            </Link>
          </div>

          <div className="nav-detail">
            <ul className="detail-wrap body_04">
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

            <ul className="detail-wrap body_04">
              <li className="detail-item">
                <Link href="/"> 공지사항 </Link>
              </li>
              <li className="detail-item">
                <Link href="/"> 의무공개 </Link>
              </li>
            </ul>

            <ul className="detail-wrap body_04">
              <li className="detail-item">
                <Link href="/"> 관리사무소 인원 </Link>
              </li>
            </ul>

            <ul className="detail-wrap body_04">
              <li className="detail-item">
                <Link href="/"> 입주민 소통 </Link>
              </li>
              <li className="detail-item">
                <Link href="/"> 입대의 소통 </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}
