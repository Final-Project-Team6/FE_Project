'use client'

import './login.scss'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'

import CheckBox from '@/components/checkBox/CheckBox'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder, loginPlaceholder } from '@/constants/inputPlaceholder'
import { signInWithCredentials } from '@/serverActions/auth'

function LoginForm() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const onChangeId: ChangeEventHandler<HTMLInputElement> = e => {
    setId(e.target.value)
  }

  const onChangePassword: ChangeEventHandler<HTMLInputElement> = e => {
    setPassword(e.target.value)
  }

  const loginHandler: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    try {
      // 아이디와 비밀번호를 고정값으로 설정하여 signInWithCredentials 함수 호출
      const response = await signInWithCredentials(id, password, '1')

      // 응답 데이터 구조를 기반으로 로그인 성공 여부를 확인
      if (response.ok) {
        // 'code'가 1인 경우 로그인 성공이라고 가정
        router.replace('/')
      } else {
        // 사용자에게 표시할 메시지를 조건에 따라 설정
        const errorMessage =
          response.message === '회원이 존재하지 않습니다.'
            ? '아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요'
            : response.message === '유효하지 않은 인증 입니다.'
              ? '유효하지 않은 인증입니다. 다시 시도해주세요.'
              : response.message

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
      <h1 className="title">로그인</h1>
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
          big>
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
