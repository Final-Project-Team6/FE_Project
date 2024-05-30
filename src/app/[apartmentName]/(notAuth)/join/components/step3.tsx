import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Input from '@/components/common/Input/Input'
import { passwordChip } from '@/constants/passwordChip'
import { saveStep3Data } from '@/redux/joinSlice'

type Step3Props = {
  onUpdate: (data: any) => void
}

const Step3: React.FC<Step3Props> = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const dispatch = useDispatch()

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }
  useEffect(() => {
    dispatch(saveStep2Data({ data: formData }))
    onUpdate(formData)
    // onUpdate를 useEffect 의존성 배열에서 제거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, dispatch])

  useEffect(() => {
    dispatch(saveStep3Data({ data: formData }))
    onUpdate(formData)
    // onUpdate를 useEffect 의존성 배열에서 제거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, dispatch])

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
          onChange={handleChange}
          name="username"
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
          name="password"
          onChange={handleChange}
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
