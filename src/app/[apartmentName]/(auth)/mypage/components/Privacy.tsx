import './Privacy.scss'

import Link from 'next/link'
import React from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'

function Privacy() {
  return (
    <div className="privacy">
      <h2>개인정보</h2>
      <ul className="privacy-list body_04">
        <li className="privacy-list-item">
          <span className="label">휴대폰번호</span>
          <p className="value">010-1234-1234</p>
        </li>

        <li className="privacy-list-item">
          <span className="label">닉네임</span>
          <Input
            id="name"
            type="text"
            name="fullName"
            required
            placeholder="이름입력"
          />
          <Button
            disabled
            size="message"
            color="primary">
            확인
          </Button>
        </li>

        <li className="privacy-list-item">
          <span className="label">아파트 동</span>
          <Input
            id="name"
            type="text"
            name="fullName"
            required
            placeholder="이름입력"
          />
        </li>

        <li className="privacy-list-item">
          <span className="label">아파트 호</span>
          <Input
            id="name"
            type="text"
            name="fullName"
            required
            placeholder="이름입력"
          />
          <Button
            disabled
            size="message"
            color="primary">
            확인
          </Button>
        </li>
      </ul>

      <Link
        href=""
        className="body_05 linkText">
        회원탈퇴 &gt;{' '}
      </Link>
    </div>
  )
}

export default Privacy
