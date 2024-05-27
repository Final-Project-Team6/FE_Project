'use client'
import '@/styles/_mixins.module.scss'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '@/components/notice/Notice.module.scss'
import useFetchNoticeList from '@/hooks/useFetchNoticeList'
import {
  setNoticesByComments,
  setNoticesByImportance,
  setNoticesByPopularity,
  setNoticesByRecency,
} from '@/redux/complaintSlice'
import { RootState } from '@/redux/store'
import { complaint } from '@/types/notice.interface'

export default function Notice({
  noticeTitle,
  noticeOptions,
  noticeType,
}: {
  noticeTitle: string
  noticeOptions: string[]
  noticeType: string
}) {
  const dispatch = useDispatch()
  const apartmentData = useSelector((state: RootState) => state.apartment)
  const noticesByComments = useSelector(
    (state: RootState) => state.notice.byComments.content,
  )
  const noticesByPopularity = useSelector(
    (state: RootState) => state.notice.byPopularity.content,
  )
  const noticesByImportance = useSelector(
    (state: RootState) => state.notice.byImportance.content,
  )
  const noticesByRecency = useSelector(
    (state: RootState) => state.notice.byRecency.content,
  )

  const [optionState, setOptionState] = useState(noticeOptions[0])
  const [type, setType] = useState('최신글')

  const handleTypeChange = (newType: string) => {
    setType(newType)
    setOptionState(newType)
  }

  // useQuery 공지내용 요청
  const { isLoading, error, data } = useFetchNoticeList(
    noticeTitle,
    apartmentData.data.apartmentId,
    type === '최신글' ? 'DATE' : type === '중요글' ? '' : '',
    'MANAGEMENT_OFFICE',
    {
      enabled: apartmentData.data.apartmentId !== 0,
    },
  )

  // data를 전역상태에 저장
  useEffect(() => {
    if (data) {
      dispatch(setNoticesByComments(data))
      dispatch(setNoticesByPopularity(data))
      dispatch(setNoticesByImportance(data))
      dispatch(setNoticesByRecency(data))
    }
  }, [data, dispatch])

  // 변경된 데이터 확인
  useEffect(() => {
    // console.log('apartmentId', apartmentData)
    // console.log('type', type)
    // console.log('noticesByComments:', noticesByComments)
    // console.log('noticesByPopularity:', noticesByPopularity)
    // console.log('noticesByImportance:', noticesByImportance)
    // console.log('noticesByRecency:', noticesByRecency)
  }, [
    noticesByComments,
    noticesByPopularity,
    noticesByImportance,
    noticesByRecency,
  ])

  if (isLoading) return 'Loading...'
  if (error) {
    // console.log('error', error)
    return error.message
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <h1 className={styles.noticeText}>{noticeTitle}</h1>
        <div className={styles.buttons}>
          {noticeOptions.map(option => (
            <button
              key={option}
              className={`${styles.button} ${optionState === option && styles.activeButton}`}
              onClick={() => handleTypeChange(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.notices}>
        {data &&
          data.content &&
          data.content.map((notice: complaint) => {
            return (
              <Link
                key={notice.complaintId}
                href={`/${notice.complaintId || notice.announcementId}`}>
                <div className={styles.noticeBox}>
                  <span>{notice.title}</span>
                  <p>{notice.createdAt}</p>
                </div>
              </Link>
            )
          })}
      </div>
      <Link href={'/'}>
        <div className={`${styles.containerBottom} body_03`}>
          <p>
            {noticeType} {'>'}
          </p>
        </div>
      </Link>
    </div>
  )
}
