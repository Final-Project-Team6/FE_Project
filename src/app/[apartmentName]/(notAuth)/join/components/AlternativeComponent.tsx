import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import Button from '@/components/common/Button'
import Dialog from '@/components/common/Dialog'
import Input from '@/components/common/Input/Input'
import { joinPlaceholder } from '@/constants/inputPlaceholder'
import { saveStep2Data } from '@/redux/joinSlice'

interface DecodedToken {
  phone: string
}

interface AlternativeComponentProps {
  onUpdate: (data: any) => void
  onValidationUpdate: (isValid: boolean) => void
}

const AlternativeComponent: React.FC<AlternativeComponentProps> = ({
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
  })
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [certificationNumber, setCertificationNumber] = useState('')
  const [isMessageSubmitted, setIsMessageSubmitted] = useState(false)

  const [dialogMessage, setDialogMessage] = useState<string | null>(null)
  const [dialogType, setDialogType] = useState<'confirm' | 'find'>('confirm')
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

  useEffect(() => {
    dispatch(saveStep2Data({ data: formData }))
    onUpdate(formData)
  }, [formData, dispatch, onUpdate])

  const isFormValid = () => {
    const { fullName, phone } = formData
    return !!(fullName && phone)
  }

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
      const decodedToken = jwtDecode<DecodedToken>(token)
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
      // 먼저 전화번호 중복 체크
      const checkResponse = await axios.get(
        `https://aptner.shop/api/member/check/phone?phone=${sanitizedPhone}`,
      )

      if (checkResponse.data.code === -1) {
        setDialogMessage('이미 존재하는 휴대전화번호 입니다.')
        setDialogType('find')
        return
      }

      // 중복이 아닌 경우 인증번호 확인
      const response = await axios.post(
        'https://v2dev.aptner.com/user/sms/verification/signup',
        {
          transactionId: transactionId,
          certificationNumber: certificationNumber,
        },
      )
      const token = response.data.token
      const isValidPhoneNumber = validatePhoneNumber(token, formData.phone)

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

  return (
    <div className="step">
      <div className="step-label">
        <span className="body_04">이름</span>
        <Input
          id="name"
          type="text"
          name="fullName"
          required
          placeholder="이름입력"
          value={formData.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="step-label">
        <span className="body_04">휴대폰 번호</span>
        <Input
          width={425}
          id="tel"
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
        <div className="step-label">
          <span className="body_04">인증번호</span>
          <Input
            width={425}
            id="timerExpire"
            type="text"
            required
            placeholder={joinPlaceholder.authNum}
            value={certificationNumber}
            onChange={e => setCertificationNumber(e.target.value)}
          />
          <Button
            size="message"
            color="primary"
            onClick={phoneSubmit}
            disabled={!certificationNumber || !transactionId}>
            확인
          </Button>
        </div>
      )}

      {dialogMessage && (
        <Dialog
          dialog={dialogType}
          onClose={closeDialog}>
          {dialogMessage}
        </Dialog>
      )}
    </div>
  )
}

export default AlternativeComponent
