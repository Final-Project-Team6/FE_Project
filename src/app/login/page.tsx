import './login.scss'

import Link from 'next/link'
import React from 'react'

import CheckBox from '@/components/checkBox/CheckBox'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder, loginPlaceholder } from '@/constants/inputPlaceholder'

function page() {
  return (
    <div className="commonLayout">
      <h1 className="title">로그인</h1>
      <div className="input-box">
        <div className="input-box-item">
          <Input
            id="id"
            type="id"
            required
            placeholder={joinPlaceholder.id}
          />

          <Input
            id="password1"
            type="password"
            required
            placeholder={loginPlaceholder.password}
            passwordIcon
          />
        </div>

        <CheckBox big>자동로그인</CheckBox>

        <p className="input-box-error body_06">
          아이디 또는 비밀번호가 올바르지 않습니다. 다시 확인해주세요
        </p>
      </div>

      <div className="btn-box">
        <div className="btn-box-login">
          <Button
            size="confirm"
            color="primary">
            로그인
          </Button>
          <div className="serch body_05">
            <Link href="/"> 아이디 찾기</Link>
            <Link href="/"> 비밀번호 찾기</Link>
          </div>
        </div>

        <Button size="confirm">회원가입</Button>
      </div>
    </div>
  )
}

export default page
