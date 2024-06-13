import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'
import { passwordChip, seccessChip } from '@/constants/passwordChip'
import { saveStep3Data } from '@/redux/joinSlice'
import { RootState } from '@/redux/store'

type Step3Props = {
  onUpdate: (data: any) => void
  handleNext: () => void
}

const Step3: React.FC<Step3Props> = ({ onUpdate, handleNext }) => {
  const fullName = useSelector((state: RootState) => state.step.data.fullName)
  const phone = useSelector((state: RootState) => state.step.data.phone)

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [usernameStatus, setUsernameStatus] = useState<
    'default' | 'error' | 'success'
  >('default')
  const [usernameError, setUsernameError] = useState<string | null>(null)
  const [usernameMessage, setUsernameMessage] = useState<string>(
    '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
  )
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [isPasswordMatch, setIsPasswordMatch] = useState<boolean>(false)
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const dispatch = useDispatch()

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleConfirmPasswordChange: React.ChangeEventHandler<
    HTMLInputElement
  > = e => {
    setConfirmPassword(e.target.value)
  }

  const checkUsernameAvailability = async (username: string) => {
    try {
      const response = await axios.get(
        `https://aptner.shop/api/member/check/username?username=${username}`,
      )
      if (response.data.code === 1) {
        setUsernameError(null)
        setUsernameMessage('')
        setUsernameStatus('success')
      } else {
        setUsernameError('사용할 수 없는 아이디입니다.')
        setUsernameMessage('사용할 수 없는 아이디입니다.')
        setUsernameStatus('error')
      }
    } catch (error) {
      setUsernameError(
        '사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요.',
      )
      setUsernameMessage(
        '사용할 수 없는 아이디입니다. 다른 아이디를 입력해주세요.',
      )
      setUsernameStatus('error')
    }
  }

  const handleUsernameBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (formData.username) {
      checkUsernameAvailability(formData.username)
    }
  }

  const handlePasswordBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (formData.password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.')
      setIsPasswordMatch(false)
    } else {
      setPasswordError(null)
      setIsPasswordMatch(true)
    }
  }

  const isFormValid = useCallback(() => {
    return (
      formData.username !== '' &&
      formData.password !== '' &&
      confirmPassword !== '' &&
      usernameStatus === 'success' &&
      isPasswordMatch
    )
  }, [formData, confirmPassword, usernameStatus, isPasswordMatch])

  useEffect(() => {
    dispatch(saveStep3Data({ data: formData }))
    onUpdate(formData)
    setIsButtonDisabled(!isFormValid())
  }, [
    formData,
    confirmPassword,
    usernameStatus,
    isPasswordMatch,
    dispatch,

    isFormValid,
  ])

  return (
    <div className="step">
      <div className="step-label center">
        <span className="body_04 nopadding">이름</span>
        <span className="step-label-text">{fullName}</span>
      </div>

      <div className="step-label center">
        <span className="body_04 nopadding">휴대폰 번호</span>
        <p className="step-label-text">{phone}</p>
      </div>

      <div className="step-label">
        <span className="step-label-padding body_04">아이디</span>
        <Input
          id="id"
          type="text"
          onChange={handleChange}
          onBlur={handleUsernameBlur}
          name="username"
          required
          placeholder="도움 메세지"
          message={usernameMessage}
          errorMessage={usernameError ? usernameError : ''}
          status={usernameStatus}
          checkIcon
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
          onBlur={handlePasswordBlur}
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
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={handlePasswordBlur}
          required
          placeholder="도움 메세지"
          errorMessage={passwordError}
          chip={isPasswordMatch ? seccessChip : undefined}
        />
      </div>
      <div className="left">
        <Button
          onClick={handleNext}
          size="confirm"
          color="primary"
          disabled={isButtonDisabled}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default Step3
