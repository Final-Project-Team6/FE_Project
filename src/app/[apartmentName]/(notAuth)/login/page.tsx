// src/pages/login.tsx
'use client'

import './login.scss'

import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckBox from '@/components/checkBox/CheckBox'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder, loginPlaceholder } from '@/constants/inputPlaceholder'
import { setAccessToken } from '@/redux/authSlice'
import { RootState } from '@/redux/store'
import { signInWithCredentials } from '@/serverActions/auth'

function LoginForm() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const apartmentId = useSelector(
    (state: RootState) => state.apartment.data.apartmentId,
  )

  const onChangeId: ChangeEventHandler<HTMLInputElement> = e => {
    setId(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value)
  }

  const loginHandler: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      const response = await signInWithCredentials(
        id,
        password,
        apartmentId.toString(),
      )

      if (response.ok) {
        const accessToken = response.data.data.accessToken
        const refreshToken = response.data.data.refreshToken
        dispatch(setAccessToken(accessToken))
        Cookies.set('accessToken', accessToken, { expires: 1 }) // 액세스 토큰 저장
        Cookies.set('refreshToken', refreshToken, { expires: 7 }) // 리프레시 토큰 저장 (예: 7일 동안 유지)
        router.replace('/')
      } else {
        const errorMessage =
          '아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요'
        setMessage(errorMessage)
      }
    } catch (err) {
      // console.log('Error:', err)
    }
  }

  return (
    <form
      onSubmit={loginHandler}
      className="commonLayout">
      <h1 className="title title1">로그인</h1>
      <div className="input-box">
        <div className="input-box-item">
          <Input
            id="id"
            type="id"
            onChange={onChangeId}
            required
            placeholder={joinPlaceholder.id}
          />
          <Input
            id="password"
            type="password"
            required
            onChange={onChangePassword}
            placeholder={loginPlaceholder.password}
            passwordIcon
          />
        </div>
        <CheckBox
          name="login"
          $big>
          자동로그인
        </CheckBox>
        <p className="input-box-error body_06">{message}</p>
      </div>
      <div className="btn-box">
        <div className="btn-box-login">
          <Button
            type="submit"
            size="confirm"
            color="primary">
            로그인
          </Button>
          <div className="serch body_05">
            <Link href="/">아이디 찾기</Link>
            <Link href="/">비밀번호 찾기</Link>
          </div>
        </div>
        <Button size="confirm">회원가입</Button>
      </div>
    </form>
  )
}

export default LoginForm
