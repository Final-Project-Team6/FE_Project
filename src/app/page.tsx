// 'use client';

import CheckBox from '@/components/checkBox/CheckBox'
import DotNum from '@/components/common/DotNum'
import ProgressBar from '@/components/common/ProgressBar'
import styles from '@/styles/_mixins.module.scss'

export default function App() {
  return (
    <>
      <CheckBox>여자</CheckBox>
      <DotNum number={6} />
      <ProgressBar />
      <p className={styles.menuTitle1}>test1</p>
    </>
  )
}
