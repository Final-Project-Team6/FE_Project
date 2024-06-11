import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Input from '@/components/common/Input/Input'
import { saveStep4Data } from '@/redux/joinSlice'

type Step4Props = {
  onUpdate: (data: any) => void
  onValidationUpdate: (isValid: boolean) => void
}

const getRandomNickname = () => {
  const determiners = [
    '예쁜',
    '화난',
    '귀여운',
    '배고픈',
    '철학적인',
    '현학적인',
    '슬픈',
    '푸른',
    '비싼',
    '밝은',
  ]

  const animals = [
    '호랑이',
    '비버',
    '강아지',
    '부엉이',
    '여우',
    '치타',
    '문어',
    '고양이',
    '미어캣',
    '다람쥐',
  ]

  const randomDeterminer =
    determiners[Math.floor(Math.random() * determiners.length)]
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)]

  return `${randomDeterminer}${randomAnimal}`
}

const Step4: React.FC<Step4Props> = ({ onUpdate, onValidationUpdate }) => {
  const [formData, setFormData] = useState({
    nickname: getRandomNickname(),
    dong: '',
    ho: '',
  })

  const [nicknameStatus, setNicknameStatus] = useState<
    'default' | 'error' | 'success'
  >('default')
  const [nicknameError, setNicknameError] = useState<string>('')

  const [dongStatus, setDongStatus] = useState<'default' | 'error' | 'success'>(
    'default',
  )
  const [dongError, setDongError] = useState<string>('')

  const [hoStatus, setHoStatus] = useState<'default' | 'error' | 'success'>(
    'default',
  )
  const [hoError, setHoError] = useState<string>('')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveStep4Data({ data: formData }))
    onUpdate(formData)
    checkFormValidity()
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

  // 모든 필드가 작성되었는지 확인하는 함수
  const checkFormValidity = () => {
    const { nickname, dong, ho } = formData
    let isValid = true

    if (nickname.length < 2 || nickname.length > 16) {
      setNicknameStatus('error')
      setNicknameError('닉네임은 최소 2글자에서 최대 16글자여야 합니다.')

      isValid = false
    } else {
      setNicknameStatus('success')
      setNicknameError('')
    }

    if (!dong) {
      setDongStatus('error')
      setDongError('아파트 동을 입력해주세요.')

      isValid = false
    } else {
      setDongStatus('success')
      setDongError('')
    }

    if (!ho) {
      setHoStatus('error')
      setHoError('아파트 호수를 입력해주세요.')

      isValid = false
    } else {
      setHoStatus('success')
      setHoError('')
    }

    onValidationUpdate(!isValid)
  }

  useEffect(() => {
    checkFormValidity()
  }, [formData])

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
          status={nicknameStatus}
          errorMessage={nicknameError ? nicknameError : ''}
          checkIcon
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
          status={dongStatus}
          errorMessage={dongError ? dongError : ''}
          checkIcon
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
          status={hoStatus}
          errorMessage={hoError ? hoError : ''}
          checkIcon
        />
      </div>
    </div>
  )
}

export default Step4
