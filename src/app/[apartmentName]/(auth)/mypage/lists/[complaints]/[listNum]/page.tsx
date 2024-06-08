'use client'

import '../../../mypage.scss'

import { useParams } from 'next/navigation'

import { dropDown } from '@/constants/dropDown'
import {
  MypageParamKeys,
  mypageParams,
} from '@/constants/params/mypageUrl.params'
import styles from '@/styles/postPage.module.scss'

import Mypage_SearchBar from '../../../components/Mypage_SearchBar'
import MypageList from '../../../components/MypageList'

export default function Page() {
  const params = useParams()
  const postKey = params.complaints as MypageParamKeys

  return (
    <>
      <div>
        <h1 className={'title1 ' + styles.postTitle}>
          {mypageParams[postKey] || '제목이 없습니다'}
        </h1>
        <div className="right">
          <Mypage_SearchBar
            id={postKey}
            placeholder="검색어를 입력해주세요"
            dropDown={dropDown}
          />
        </div>
      </div>
      <MypageList />
      <div className={styles.postBottomWrapper} />
    </>
  )
}
