'use client'

import './join.scss'
import './step.scss'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Button from '@/components/common/Button'
import ProgressBar from '@/components/common/ProgressBar'

import AlternativeComponent from './components/AlternativeComponent'
import Step1 from './components/step1'
import Step2 from './components/step2'
import Step3 from './components/step3'
import Step4 from './components/step4'
import Step5 from './components/step5'

const Page: React.FC = () => {
  const [completedItems, setCompletedItems] = useState(1)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [showAlternative, setShowAlternative] = useState(false)
  const [isDataValid, setIsDataValid] = useState(false) // 버튼활성화
  const [formData, setFormData] = useState({
    termsService: false,
    privateInformationCollection: false,
    snsMarketingInformationReceive: false,
    fullName: '',
    birthFirst: 0,
    gender: 0,
    phone: 0,
    username: '',
    password: '',
    nickname: '',
    dong: '',
    ho: '',
    apartmentId: 0,
  })

  const handleLink = () => {
    setShowAlternative(true)
  }

  const handleNextClick = () => {
    if (showAlternative) {
      setShowAlternative(false)
      setCompletedItems(completedItems + 1)
    } else if (completedItems < 5) {
      setCompletedItems(completedItems + 1)
    }
  }

  const handleAllChecked = (checked: boolean) => {
    setIsButtonDisabled(!checked)
  }

  const handleDataUpdate = (data: any) => {
    setFormData(prev => ({
      ...prev,
      ...data,
    }))
  }

  const handleValidationUpdate = (isValid: boolean) => {
    setIsDataValid(isValid)
  }

  const handleSubmit = async () => {
    try {
      await axios.post('https://aptner.shop/api/member/join', formData)
      // console.log('회원가입이 성공적으로 처리되었습니다.')
    } catch (error) {
      console.error('회원가입 중 오류가 발생했습니다:', error)
    }
  }

  const handleNext = () => {
    if (completedItems < 4) {
      handleNextClick()
    } else {
      handleSubmit()
    }
  }

  useEffect(() => {
    if (completedItems === 2) {
      setIsButtonDisabled(!isDataValid)
    }
  }, [isDataValid, completedItems])

  return (
    <div className="commonLayout join-wrap">
      <div>
        <h1 className="join-wrap-title">회원가입</h1>
        <ProgressBar completedItems={completedItems} />
      </div>

      {completedItems === 2 && !showAlternative && (
        <div className="step-link">
          <p>본인인증을 할수없다면?</p>
          <Link
            href=""
            onClick={handleLink}>
            본인인증없이 회원가입
          </Link>
        </div>
      )}

      {showAlternative && (
        <div className="linkBox">
          <p className="step-number body_03">
            휴대폰 본인인증이 불가능한 경우, 휴대폰 소유여부만 확인하고
            회원가입을 할 수 있습니다. <br /> 단, 투표 시 모바일 전자투표 참여가
            어려울 수 있습니다.
          </p>

          <div className="link">
            <Link
              href=""
              onClick={() => setShowAlternative(false)}>
              본인인증 회원가입
            </Link>
          </div>
        </div>
      )}

      {showAlternative ? (
        <div className="join-wrap-step">
          <AlternativeComponent />
        </div>
      ) : (
        <>
          {completedItems === 4 && (
            <p className="body_03">
              아파트 동, 호 정보를 입력한 후, 관리사무소의 인증을 받아야
              아파트너 서비스를 이용할 수 있습니다.
            </p>
          )}
          <div className="join-wrap-step">
            {completedItems === 1 && (
              <Step1
                onAllChecked={handleAllChecked}
                onUpdate={data => handleDataUpdate(data)}
              />
            )}
            {completedItems === 2 && (
              <Step2
                handleNext={handleNext}
                onUpdate={(data: any) => handleDataUpdate(data)}
                onValidationUpdate={handleValidationUpdate} // 유효성 검사 결과 업데이트
              />
            )}
            {completedItems === 3 && (
              <Step3 onUpdate={(data: any) => handleDataUpdate(data)} />
            )}
            {completedItems === 4 && (
              <Step4 onUpdate={(data: any) => handleDataUpdate(data)} />
            )}
            {completedItems === 5 && <Step5 />}
          </div>
        </>
      )}

      <div className={completedItems === 1 ? 'center' : 'left'}>
        {completedItems < 5 && (
          <div className={completedItems === 1 ? 'center' : 'left'}>
            <Button
              disabled={isButtonDisabled && completedItems === 1}
              onClick={handleNext}
              size="confirm"
              color="primary">
              {completedItems === 5 ? '다음' : '확인'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Page
