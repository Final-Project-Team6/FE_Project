'use client'

import React, { useEffect, useState } from 'react'

import CheckBox from '../../../components/checkBox/CheckBox'
import ScrollBox1 from './scrollBox1'
import ScrollBox2 from './scrollBox2'
import ScrollBox3 from './scrollBox3'

const Step1 = ({
  onAllChecked,
}: {
  onAllChecked: (_checked: boolean) => void
}) => {
  const [checks, setChecks] = useState({
    allChecked: false,
    check2: false,
    check3: false,
    check4: false,
  })

  useEffect(() => {
    const allChecked = Object.values(checks).every(Boolean)
    onAllChecked(allChecked)
  }, [checks, onAllChecked])

  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target

    if (name === 'allChecked') {
      setChecks({
        allChecked: checked,
        check2: checked,
        check3: checked,
        check4: checked,
      })
    } else {
      setChecks(prevChecks => {
        const newChecks = {
          ...prevChecks,
          [name]: checked,
        }
        newChecks.allChecked =
          newChecks.check2 && newChecks.check3 && newChecks.check4
        return newChecks
      })
    }
  }

  return (
    <div className="step1">
      <CheckBox
        name="allChecked"
        checked={checks.allChecked}
        onChange={handleCheckChange}
        big>
        전체 약관 동의
      </CheckBox>

      <div className="step1-item1">
        <ScrollBox1 />
        <CheckBox
          name="check2"
          checked={checks.check2}
          onChange={handleCheckChange}>
          서비스 이용약관 동의(필수)
        </CheckBox>
      </div>

      <div>
        <ScrollBox2 />
        <CheckBox
          name="check3"
          checked={checks.check3}
          onChange={handleCheckChange}>
          개인정보 수집(필수)
        </CheckBox>
      </div>

      <div>
        <ScrollBox3 />
        <CheckBox
          name="check4"
          checked={checks.check4}
          onChange={handleCheckChange}>
          마케팅 정보 수신 동의(선택)
        </CheckBox>
      </div>
    </div>
  )
}

export default Step1
