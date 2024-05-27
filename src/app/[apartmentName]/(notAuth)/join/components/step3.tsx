import React from 'react'

import Input from '@/components/common/Input/Input'
import { passwordChip } from '@/constants/passwordChip'

function Step3() {
  return (
    <div className="step">
      <div className="step-label">
        <span className="body_04">이름</span>
        <span className="step-label-text">박미경</span>
      </div>

      <div className="step-label">
        <span className="body_04">휴대폰 번호</span>
        <p className="step-label-text">010-1234-1234</p>
      </div>

      <div className="step-label">
        <span className="step-label-padding body_04">아이디</span>
        <Input
          id="id"
          type="id"
          required
          placeholder="도움 메세지"
          message="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."
        />
      </div>

      <div className="step-label">
        <span className="step-label-padding body_04">비밀번호</span>
        <Input
          chip={passwordChip}
          passwordIcon
          id="password"
          type="password"
          required
          placeholder="비밀번호 입력"
        />
      </div>

      <div className="step-label">
        <span className="body_04">
          비밀번호 <br /> 확인
        </span>
        <Input
          passwordIcon
          id="password"
          type="password"
          required
          placeholder="도움 메세지"
        />
      </div>
    </div>
  )
}

export default Step3
