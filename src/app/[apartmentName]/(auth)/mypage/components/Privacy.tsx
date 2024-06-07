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
  const [dialogType, setDialogType] = useState<
    'confirm' | 'find' | 'confirmWithCancel'
  >('confirm')
  const [confirmAction, setConfirmAction] = useState<
    'nickname' | 'home' | null
  >(null)

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
      setDialogMessage('닉네임 변경을 완료하였습니다.')
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
      setDialogMessage('동/호 변경을 완료하였습니다.')
      setDialogType('confirm')
      setShowDialog(true)
    } catch (error: any) {
      console.error(error)
    }
  }

  const openConfirmDialog = (action: 'nickname' | 'home') => {
    setConfirmAction(action)
    setDialogMessage(
      action === 'nickname'
        ? '닉네임을 변경하시겠습니까?'
        : '동/호를 변경하시면 미인증회원으로 변경이 됩니다.<br />관리사무소 확인 후 인증회원으로 변경되어집니다.<br />계속 진행하시겠습니까?',
    )
    setDialogType('confirmWithCancel')
    setShowDialog(true)
  }

  const handleConfirm = () => {
    if (confirmAction === 'nickname') {
      handleNicknameChange()
    } else if (confirmAction === 'home') {
      handleHomeChange()
    }
    setConfirmAction(null)
    setDialogType('confirm')
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
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
            onClick={() => openConfirmDialog('nickname')}
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
            onClick={() => openConfirmDialog('home')}
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
          onClose={closeDialog}
          onConfirm={handleConfirm}>
          {dialogMessage}
        </Dialog>
      )}
    </div>
  )
}

export default Privacy
