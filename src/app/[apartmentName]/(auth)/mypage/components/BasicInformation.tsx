'use client'

import './BasicInformation.scss'

import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import arrowRight from 'public/icons/arrowRightBlue08.svg'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'

function BasicInformation() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [name, setName] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [authStatus, setAuthStatus] = useState<boolean>(false)

  useEffect(() => {
    const fetchHomeData = async () => {
      if (!accessToken) {
        return
      }

      console.log('Access Token:', accessToken)

      try {
        const response = await axios.get(
          'https://aptner.shop/api/member/information',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        console.log('API Response:', response.data)

        const userData = response.data
        setName(userData.data.fullName)
        setUserName(userData.data.username)
        setAuthStatus(userData.data.authenticationStatus)
      } catch (error: any) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchHomeData()
  }, [accessToken])

  return (
    <div className="basicInfo">
      <h2 className="subTitle1">기본정보</h2>

      <ul className="basicInfo-list body_04">
        <li className="basicInfo-list-item">
          <span className="label">이름</span>
          <span className="value menuTitle2">{name}님</span>
        </li>

        <li className="basicInfo-list-item">
          <span className="label">아이디</span>
          <span className="value">{userName}</span>
        </li>

        <li className="basicInfo-list-item">
          <span className="label">등급</span>
          <span className="value">
            {authStatus ? '인증회원' : '비인증회원'}
          </span>
        </li>

        <li className="basicInfo-list-item">
          <span className="label">비밀번호</span>
          <Link
            className="value blue menuTitle2"
            href="">
            비밀번호 변경
            <Image
              src={arrowRight}
              width={18}
              height={18}
              alt="이미지를 첨부"
              priority
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BasicInformation
