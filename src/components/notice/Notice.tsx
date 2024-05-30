'use client'
import '@/styles/_mixins.module.scss'

import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import Skeleton from '@/components/common/skeleton/Skeleton'
import styles from '@/components/notice/Notice.module.scss'
import useFetchNoticeList from '@/hooks/useFetchPostList'
import { RootState } from '@/redux/store'
import { post } from '@/types/post.interface'
import { formatDate } from '@/utils/formatDate'

export default function Notice({
  noticeTitle,
  noticeOptions,
  noticeType,
}: {
  noticeTitle: string
  noticeOptions: string[]
  noticeType: string
}) {
  const apartmentData = useSelector((state: RootState) => state.apartment)

  const [optionState, setOptionState] = useState(noticeOptions[0])

  const handleTypeChange = (newType: string) => {
    setOptionState(newType)
  }

  const { isLoading, error, data } = useFetchNoticeList(
    noticeTitle,
    apartmentData.data.apartmentId,
    optionState,
    'MANAGEMENT_OFFICE',
    {
      enabled: apartmentData.data.apartmentId !== 0,
    },
  )

  if (isLoading) {
    return (
      <div className={styles.container}>
        <Skeleton
          width={628}
          height={491}
        />
      </div>
    )
  }
  if (error) {
    return <h1 className={styles.noticeText}>{error.message}</h1>
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
          data.content.map((notice: post, idx: number) => {
            return (
              <div key={notice.complaintId}>
                <Link href={`/${notice.complaintId || notice.announcementId}`}>
                  <div className={styles.noticeBox}>
                    <span>{notice.title}</span>
                    <p>{formatDate(notice.createdAt)}</p>
                  </div>
                  {data.content.length != ++idx && (
                    <div className={styles.noticeBoxLine} />
                  )}
                </Link>
              </div>
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
