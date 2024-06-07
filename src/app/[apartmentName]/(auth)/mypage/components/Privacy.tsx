'use client'

import './Privacy.scss'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Button from '@/components/common/Button'
import Dialog from '@/components/common/Dialog' // Dialog 컴포넌트 import
import Input from '@/components/common/Input/Input'
import { RootState } from '@/redux/store'
import { addHyphenToPhoneNum } from '@/utils/addHyphenToPhoneNum' // 유틸리티 함수 import

function Privacy() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  const [nickname, setNickname] = useState<string>('')
  const [originalNickname, setOriginalNickname] = useState<string>('')
  const [dong, setDong] = useState<string>('')
  const [originalDong, setOriginalDong] = useState<string>('')
  const [ho, setHo] = useState<string>('')
  const [originalHo, setOriginalHo] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [homeId, setHomeId] = useState<number | null>(null)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [dialogMessage, setDialogMessage] = useState<string>('')
  const [dialogType, setDialogType] = useState<'confirm' | 'find'>('confirm')

  useEffect(() => {
    const fetchHomeData = async () => {
      if (!accessToken) {
        return
      }

      try {
        const response = await axios.get(
          'https://aptner.shop/api/member/home/apartment',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        const homeData = response.data.data[0].home
        setDong(homeData.dong)
        setOriginalDong(homeData.dong)
        setHo(homeData.ho)
        setOriginalHo(homeData.ho)
        setHomeId(homeData.homeId)
      } catch (error: any) {
        console.error(error)
      }
    }

    fetchHomeData()
  }, [accessToken])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) {
        return
      }

      try {
        const response = await axios.get(
          'https://aptner.shop/api/member/information',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        const userData = response.data
        setNickname(userData.data.nickname)
        setOriginalNickname(userData.data.nickname)
        setPhone(addHyphenToPhoneNum(userData.data.phone))
      } catch (error: any) {
        console.error(error)
      }
    }

    fetchUserData()
  }, [accessToken])

  const handleNicknameChange = async () => {
    try {
      await axios.patch(
        'https://aptner.shop/api/member/nickname',
        { nickname },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      setOriginalNickname(nickname)
      setDialogMessage('닉네임이 성공적으로 변경되었습니다.')
      setDialogType('confirm')
      setShowDialog(true)
    } catch (error: any) {
      console.error(error)
    }
  }

  const handleHomeChange = async () => {
    if (!homeId) {
      return
    }

    try {
      await axios.put(
        `https://aptner.shop/api/member/home/${homeId}?dong=${dong}&ho=${ho}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      setOriginalDong(dong)
      setOriginalHo(ho)
      setDialogMessage('아파트 동/호가 성공적으로 변경되었습니다.')
      setDialogType('confirm')
      setShowDialog(true)
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <div className="privacy">
      <h2>개인정보</h2>
      <ul className="privacy-list body_04">
        <li className="privacy-list-item">
          <span className="label">휴대폰번호</span>
          <p className="value">{phone}</p>
        </li>

        <li className="privacy-list-item">
          <span className="label">닉네임</span>
          <Input
            id="nickname"
            type="text"
            name="nickname"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            required
            placeholder="닉네임 입력"
          />
          <Button
            onClick={handleNicknameChange}
            size="message"
            color="primary"
            disabled={nickname === originalNickname}>
            확인
          </Button>
        </li>

        <li className="privacy-list-item">
          <span className="label">아파트 동</span>
          <Input
            id="dong"
            type="text"
            name="dong"
            value={dong}
            onChange={e => setDong(e.target.value)}
            required
            placeholder="동 입력"
          />
        </li>

        <li className="privacy-list-item">
          <span className="label">아파트 호</span>
          <Input
            id="ho"
            type="text"
            name="ho"
            value={ho}
            onChange={e => setHo(e.target.value)}
            required
            placeholder="호 입력"
          />
          <Button
            onClick={handleHomeChange}
            size="message"
            color="primary"
            disabled={dong === originalDong && ho === originalHo}>
            확인
          </Button>
        </li>
      </ul>

      <Link
        href=""
        className="body_05 linkText">
        회원탈퇴 &gt;{' '}
      </Link>

      {showDialog && (
        <Dialog
          dialog={dialogType}
          onClose={() => setShowDialog(false)}>
          {dialogMessage}
        </Dialog>
      )}
    </div>
  )
}

export default Privacy
