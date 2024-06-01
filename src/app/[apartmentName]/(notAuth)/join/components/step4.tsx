import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Input from '@/components/common/Input/Input'
import { saveStep4Data } from '@/redux/joinSlice' // 경로는 실제 경로에 맞게 수정하세요.

type Step4Props = {
  onUpdate: (data: any) => void
}

const Step4: React.FC<Step4Props> = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    dong: '',
    ho: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveStep4Data({ data: formData }))
    onUpdate(formData)
    // onUpdate를 useEffect 의존성 배열에서 제거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, dispatch])

  // Step4에서 데이터가 변경될 때 호출되는 함수
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <div className="step">
      <div className="step-label">
        <span className="body_04">닉네임</span>
        <Input
          id="nickname"
          type="text"
          name="nickname"
          required
          placeholder="글자는 최소 2글자에서 최대 16글자"
          value={formData.nickname}
          onChange={handleChange}
        />
      </div>

      <div className="step-label">
        <span className="body_04">아파트 동</span>
        <Input
          id="dong"
          type="text"
          name="dong"
          required
          placeholder="아파트 동 입력(숫자만)"
          value={formData.dong}
          onChange={handleChange}
        />
      </div>

      <div className="step-label">
        <span className="body_04">아파트 호수</span>
        <Input
          id="ho"
          type="text"
          name="ho"
          required
          placeholder="아파트 호수 입력(숫자만)"
          value={formData.ho}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Step4
