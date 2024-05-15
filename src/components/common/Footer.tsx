import './Footer.scss'

import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className="Footer">
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
    </div>
  )
}

export default Footer
