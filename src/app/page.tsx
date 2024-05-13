// 'use client';

import CheckBox from '@/components/checkBox/CheckBox'
import DotNum from '@/components/common/DotNum'
import ProgressBar from '@/components/common/ProgressBar'

export default function App() {
  return (
    <>
      <CheckBox>여자</CheckBox>
      <DotNum number={6} />
      <ProgressBar />
    </>
  )
}
