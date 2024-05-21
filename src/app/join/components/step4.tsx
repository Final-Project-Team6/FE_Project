import React from 'react'

import Input from '@/components/common/Input/Input'

function Step4() {
  return (
    <div className="step">
      <div className="step-label">
        <span className="body_04">닉네임</span>
        <Input
          id="id"
          type="id"
          required
          placeholder="글자는 최소 2글자에서 최대 16글자"
        />
      </div>

      <div className="step-label">
        <span className="body_04">아파트 동</span>
        <Input
          id="id"
          type="id"
          required
          placeholder="아파트 동 입력(숫자만)"
        />
      </div>

      <div className="step-label">
        <span className="body_04">아파트 호수</span>
        <Input
          id="id"
          type="id"
          required
          placeholder="아파트 호수 입력(숫자만)"
        />
      </div>
    </div>
  )
}

export default Step4
