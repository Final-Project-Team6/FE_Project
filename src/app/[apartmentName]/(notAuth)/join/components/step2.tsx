import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@/components/common/Button'
import Dialog from '@/components/common/Dialog'
import DotNum from '@/components/common/DotNum'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder } from '@/constants/inputPlaceholder'
import { saveStep2Data } from '@/redux/joinSlice'

interface Carrier {
  code: string
  name: string
}

interface Step2Props {
  handleNext: () => void
  onUpdate: (data: any) => void
  onValidationUpdate: (isValid: boolean) => void
}

interface DecodedToken {
  phone: string
}

const Step2: React.FC<Step2Props> = ({
  handleNext,
  onUpdate,
  onValidationUpdate,
}) => {
  const [isMessageSubmitted, setIsMessageSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    birthFirst: '',
    gender: '',
    phone: '',
  })

  const [number, setNumber] = useState({
    carrier: '',
    certificationNumber: '',
  })

  const [carriers, setCarriers] = useState<Carrier[]>([])
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [isPhoneNumberValidated, setIsPhoneNumberValidated] = useState(false)
  const [dialogMessage, setDialogMessage] = useState<string | null>(null)
  const [dialogType, setDialogType] = useState<'confirm' | 'find'>('confirm')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const dispatch = useDispatch()

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const sanitizedValue = name === 'phone' ? value.replace(/-/g, '') : value
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      ...(name === 'phone' && { phone: sanitizedValue }),
    }))
  }, [])

  const handleCarrierSelect = useCallback((carrierCode: string) => {
    setNumber(prevNumber => ({
      ...prevNumber,
      carrier: carrierCode,
    }))
  }, [])

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const response = await axios.get(
          'https://v2dev.aptner.com/user/kcb/codes/mobilecom',
        )
        setCarriers(response.data.mobilecomCodeList)
      } catch (error) {
        console.error('Failed to fetch carriers:', error)
      }
    }

    fetchCarriers()
  }, [])

  useEffect(() => {
    dispatch(saveStep2Data({ data: formData }))
    onUpdate(formData)
    // onUpdate를 useEffect 의존성 배열에서 제거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, dispatch])

  const isFormValid = useCallback(() => {
    const { fullName, birthFirst, gender, phone } = formData
    return !!(fullName && birthFirst && gender && phone)
  }, [formData])

  useEffect(() => {
    const isValid =
      isFormValid() &&
      isMessageSubmitted &&
      number.carrier !== '' &&
      number.certificationNumber !== '' &&
      isPhoneNumberValidated
    onValidationUpdate(isValid)
    setIsButtonDisabled(!isValid)
  }, [
    formData,
    isMessageSubmitted,
    number.carrier,
    number.certificationNumber,
    isPhoneNumberValidated,
    onValidationUpdate,
    isFormValid,
  ])

  const messageSubmit = async () => {
    const sanitizedPhone = formData.phone.replace(/-/g, '')
    try {
      const response = await axios.post(
        'https://v2dev.aptner.com/user/sms/certification/signup',
        {
          name: formData.fullName,
          phone: sanitizedPhone,
        },
      )
      setTransactionId(response.data.transactionId)
      setIsMessageSubmitted(true)
    } catch (error) {
      console.error('오류:', error)
    }
  }

  const validatePhoneNumber = (token: string, phoneNumber: string): boolean => {
    try {
      const decodedToken = jwtDecode(token) as DecodedToken
      const tokenPhoneNumber: string = decodedToken.phone
      const normalizedTokenPhoneNumber = tokenPhoneNumber
        .replace(/-/g, '')
        .trim()
      const normalizedInputPhoneNumber = phoneNumber.replace(/-/g, '').trim()
      return normalizedTokenPhoneNumber === normalizedInputPhoneNumber
    } catch (error) {
      console.error('Failed to decode token:', error)
      return false
    }
  }

  const phoneSubmit = async () => {
    const sanitizedPhone = formData.phone.replace(/-/g, '')
    try {
      const checkResponse = await axios.get(
        `https://aptner.shop/api/member/check/phone?phone=${sanitizedPhone}`,
      )
      if (checkResponse.data.code === -1) {
        setDialogMessage('이미 존재하는 휴대전화번호 입니다.')
        setDialogType('find')
        return
      }

      const response = await axios.post(
        'https://v2dev.aptner.com/user/sms/verification/signup',
        {
          transactionId: transactionId,
          certificationNumber: number.certificationNumber,
        },
      )
      const token = response.data.token
      const isValidPhoneNumber = validatePhoneNumber(token, formData.phone)
      setIsPhoneNumberValidated(isValidPhoneNumber)

      if (isValidPhoneNumber) {
        setDialogMessage('인증을 완료하였습니다.')
        setDialogType('confirm')
      } else {
        setDialogMessage('전화번호가 일치하지 않습니다.')
        setDialogType('confirm')
      }
    } catch (error) {
      console.error('오류:', error)
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400 && error.response.data.code === -1) {
          setDialogMessage('이미 존재하는 휴대전화번호 입니다.')
          setDialogType('find')
        } else {
          setDialogMessage(
            error.response.data.message || '인증 중 오류가 발생했습니다.',
          )
          setDialogType('confirm')
        }
      } else {
        setDialogMessage('인증 중 오류가 발생했습니다.')
        setDialogType('confirm')
      }
    }
  }

  const closeDialog = () => {
    setDialogMessage(null)
  }

  const handleNextClick = () => {
    dispatch(saveStep2Data({ data: formData }))
    onUpdate(formData)
    handleNext()
  }

  return (
    <div className="step">
      <div className="step-label">
        <span className="body_04">이름</span>
        <Input
          type="text"
          name="fullName"
          required
          placeholder="이름입력"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="step-label center">
        <span className="body_04 nopadding">주민번호</span>
        <Input
          width={302}
          type="text"
          name="birthFirst"
          required
          placeholder="생년월일 입력"
          value={formData.birthFirst}
          onChange={handleChange}
        />
        <span className="body_04">-</span>
        <Input
          width={85}
          type="text"
          name="gender"
          required
          placeholder="0"
          value={formData.gender}
          onChange={handleChange}
        />
        <DotNum number={6} />
      </div>

      <div className="step-label">
        <span className="body_04">통신사 선택</span>
        <div className="step-label-tel">
          <div className="btn">
            {carriers.slice(0, 3).map(carrier => (
              <Button
                key={carrier.code}
                size="phone"
                color={number.carrier === carrier.code ? 'primary' : 'default'}
                onClick={() => handleCarrierSelect(carrier.code)}>
                {carrier.name}
              </Button>
            ))}
          </div>
          <div className="btn">
            {carriers.slice(3).map(carrier => (
              <Button
                key={carrier.code}
                size="phone"
                color={number.carrier === carrier.code ? 'primary' : 'default'}
                className={
                  number.carrier === carrier.code ? 'selected' : 'selecteds'
                }
                onClick={() => handleCarrierSelect(carrier.code)}>
                {carrier.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="step-label">
        <span className="body_04">휴대폰 번호</span>
        <div className="step-label-phone">
          <div className="phoneItem">
            <Input
              width={411}
              type="tel"
              name="phone"
              required
              placeholder={joinPlaceholder.phoneNum}
              value={formData.phone}
              onChange={handleChange}
            />
            <Button
              size="message"
              disabled={!isFormValid()}
              color="primary"
              onClick={messageSubmit}>
              인증번호 요청
            </Button>
          </div>
          {isMessageSubmitted && (
            <div className="phoneItem">
              <Input
                width={411}
                type="text"
                name="certificationNumber"
                required
                placeholder={joinPlaceholder.authNum}
                value={number.certificationNumber}
                onChange={e =>
                  setNumber(prev => ({
                    ...prev,
                    certificationNumber: e.target.value,
                  }))
                }
              />
              <Button
                size="message"
                disabled={!number.certificationNumber || !transactionId}
                color="primary"
                onClick={phoneSubmit}>
                확인
              </Button>
            </div>
          )}
        </div>
      </div>
      {dialogMessage && dialogType === 'find' && (
        <Dialog
          dialog="find"
          onClose={closeDialog}>
          {dialogMessage}
        </Dialog>
      )}
      {dialogMessage && dialogType === 'confirm' && (
        <Dialog
          dialog="confirm"
          onClose={closeDialog}>
          {dialogMessage}
        </Dialog>
      )}
      <div className="left">
        <Button
          onClick={handleNextClick}
          size="confirm"
          color="primary"
          disabled={isButtonDisabled}>
          다음
        </Button>
      </div>
    </div>
  )
}

export default Step2
