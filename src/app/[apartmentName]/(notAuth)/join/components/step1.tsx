import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import CheckBox from '@/components/checkBox/CheckBox'
import { saveStep1Data } from '@/redux/joinSlice'

import ScrollBox1 from './scrollBox1'
import ScrollBox2 from './scrollBox2'
import ScrollBox3 from './scrollBox3'

type Step1Props = {
  onAllChecked: (checked: boolean) => void
  onUpdate: (data: any) => void
}

const Step1: React.FC<Step1Props> = ({ onAllChecked, onUpdate }) => {
  const [checks, setChecks] = useState({
    termsService: false,
    privateInformationCollection: false,
    snsMarketingInformationReceive: false,
  })

  const [allChecked, setAllChecked] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(saveStep1Data({ data: checks }))
    onUpdate(checks)
    // onUpdate를 useEffect 의존성 배열에서 제거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checks, dispatch])

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    let newChecks

    if (name === 'allChecked') {
      newChecks = {
        termsService: checked,
        privateInformationCollection: checked,
        snsMarketingInformationReceive: checked,
      }
      setAllChecked(checked)
    } else {
      newChecks = {
        ...checks,
        [name]: checked,
      }
      setAllChecked(
        newChecks.termsService &&
          newChecks.privateInformationCollection &&
          newChecks.snsMarketingInformationReceive,
      )
    }

    setChecks(newChecks)

    const allChecked =
      newChecks.termsService &&
      newChecks.privateInformationCollection &&
      newChecks.snsMarketingInformationReceive
    onAllChecked(allChecked)
  }

  return (
    <div className="step1">
      <CheckBox
        name="allChecked"
        checked={allChecked}
        onChange={handleCheckChange}
        $big>
        전체 약관 동의
      </CheckBox>

      <div className="step1-item1">
        <ScrollBox1 />
        <CheckBox
          name="termsService"
          checked={checks.termsService}
          onChange={handleCheckChange}>
          서비스 이용약관 동의(필수)
        </CheckBox>
      </div>

      <div>
        <ScrollBox2 />
        <CheckBox
          name="privateInformationCollection"
          checked={checks.privateInformationCollection}
          onChange={handleCheckChange}>
          개인정보 수집(필수)
        </CheckBox>
      </div>

      <div>
        <ScrollBox3 />
        <CheckBox
          name="snsMarketingInformationReceive"
          checked={checks.snsMarketingInformationReceive}
          onChange={handleCheckChange}>
          마케팅 정보 수신 동의(선택)
        </CheckBox>
      </div>
    </div>
  )
}

export default Step1
