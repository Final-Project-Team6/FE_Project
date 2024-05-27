import React from 'react'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder } from '@/constants/inputPlaceholder'

function AlternativeComponent() {
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
        <span className="body_04">휴대폰 번호</span>
        <Input
          width={425}
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

      <div className="step-label">
        <span className="body_04">휴대폰 번호</span>
        <Input
          width={425}
          id="timerExpire"
          type="text"
          required
          placeholder={joinPlaceholder.authNum}
          timer={'시간 종료'}
          clearIcon={true}
        />
        <Button
          size="message"
          color="primary">
          확인
        </Button>
      </div>
    </div>
  )
}

export default AlternativeComponent
