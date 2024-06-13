'use client'

import '@/components/common/Footer.scss'

import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { clearTokens, refreshAccessToken } from '@/auth'
import { clearAccessToken, setAccessToken } from '@/redux/authSlice'

function Footer() {
  const dispatch = useDispatch()

  const checkTokenExpiration = async () => {
    const token = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000
      const currentTime = Date.now()

      if (expirationTime - currentTime < 30 * 60 * 1000) {
        if (refreshToken) {
          try {
            const newToken = await refreshAccessToken(refreshToken)

            if (newToken) {
              dispatch(setAccessToken(newToken))
              Cookies.set('accessToken', newToken)
            } else {
              dispatch(clearAccessToken())
              clearTokens()
            }
          } catch (error) {
            dispatch(clearAccessToken())
            clearTokens()
          }
        } else {
          dispatch(clearAccessToken())
          clearTokens()
        }
      }
    }
  }

  useEffect(() => {
    checkTokenExpiration() // UseEffect가 호출될 때 한 번 바로 실행
    const interval = setInterval(checkTokenExpiration, 30 * 60 * 1000) // 30분마다 체크
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="Footer">
      <ul className="link-box body_05 ">
        <li className="link-item">
          <Link href="/"> 이용약관 </Link>
        </li>

        <li className="link-item">
          <Link href="/"> 개인정보취급방침 </Link>
        </li>

        <li className="link-item">
          <Link href="/"> 게시글 운영정책 </Link>
        </li>

        <li className="link-item">
          <Link href="/"> LICENSE </Link>
        </li>

        <li className="link-item">
          <Link href="/"> 앱 다운로드 </Link>
        </li>

        <li className="link-item">
          <Link href="/"> APTNER </Link>
        </li>
      </ul>

      <ul className="link-box body_05 info">
        <li className="link-item">문의 1600-3123</li>
        <li className="link-item">팩스 02-6008-6879</li>
        <li className="link-item copyright">
          <p>서비스문의 help@aptner.com</p>
          <p>Copyright ⓒ Aptner inc. All right reserved</p>
        </li>
      </ul>
    </footer>
  )
}

export default Footer
