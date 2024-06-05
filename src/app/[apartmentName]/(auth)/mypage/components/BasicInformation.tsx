import './BasicInformation.scss'

import Link from 'next/link'
import React from 'react'

function BasicInformation() {
  return (
    <div className="basicInfo">
      <h2 className="subTitle1">기본정보</h2>

      <ul className="basicInfo-list body_04">
        <li className="basicInfo-list-item">
          <span className="label">이름</span>
          <span className="value menuTitle2">박미경님</span>
        </li>

        <li className="basicInfo-list-item">
          <span className="label">아이디</span>
          <span className="value">fastcam_v2</span>
        </li>

        <li className="basicInfo-list-item">
          <span className="label">등급</span>
          <span className="value">인증회원</span>
        </li>

        <li className="basicInfo-list-item">
          <span className="label">비밀번호</span>
          <Link
            className="value blue menuTitle2"
            href="">
            비밀번호 변경{' '}
            <img
              src="/"
              alt=""
            />{' '}
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default BasicInformation
