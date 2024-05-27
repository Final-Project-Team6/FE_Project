import React from 'react'

import Button from '@/components/common/Button'
import DotNum from '@/components/common/DotNum'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder } from '@/constants/inputPlaceholder'

function Step2() {
  return (
    <div className="step">
      <div className="step-label">
        <span className="body_04">이름</span>
        <Input
          id="name"
          type="name"
          required
          placeholder="이름입력"
        />
      </div>

      <div className="step-label">
        <span className="body_04">주민번호</span>
        <Input
          width={302}
          id="name"
          type="name"
          required
          placeholder="생년월일 입력"
        />
        <span className="body_04">-</span>
        <Input
          width={85}
          id="name"
          type="name"
          required
          placeholder="0"
        />
        <DotNum number={6} />
      </div>

      <div className="step-label">
        <span className="body_04">통신사 선택</span>
        <div className="step-label-tel">
          <div className="btn">
            <Button
              size="phone"
              color="default">
              SKT
            </Button>
            <Button
              size="phone"
              color="default">
              KT
            </Button>
            <Button
              size="phone"
              color="default">
              LG U+
            </Button>
          </div>
          <div className="btn">
            <Button
              size="phone"
              color="default">
              SKT 알뜰폰
            </Button>
            <Button
              size="phone"
              color="default">
              KT 알뜰폰
            </Button>
            <Button
              size="phone"
              color="default">
              LG U+ 알뜰폰
            </Button>
          </div>
        </div>
      </div>

      <div className="step-label">
        <span className="body_04">휴대폰 번호</span>
        <Input
          width={411}
          id="tel"
          type="tel"
          required
          placeholder={joinPlaceholder.phoneNum}
        />
        <Button
          size="message"
          disabled
          color="primary">
          인증번호 요청
        </Button>
      </div>
    </div>
  )
}

export default Step2
