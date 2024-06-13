'use client'
import '@/styles/_mixins.module.scss'

import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import styles from '@/components/announcement/Announcement.module.scss'
import Skeleton from '@/components/common/skeleton/Skeleton'
import useFetchAnnouncementList from '@/hooks/useFetchPostList'
import { RootState } from '@/redux/store'
import { postType } from '@/types/post.interface'
import { formatDate } from '@/utils/formatDate'

export default function Announcement({
  announcementTitle,
  announcementOptions,
  announcementType,
  apartmentEngName,
}: {
  announcementTitle: string
  announcementOptions: string[]
  announcementType: string
  apartmentEngName: string
}) {
  const apartmentData = useSelector((state: RootState) => state.apartment)

  const [optionState, setOptionState] = useState(announcementOptions[0])

  const handleTypeChange = (newType: string) => {
    setOptionState(newType)
  }

  const { isLoading, error, data } = useFetchAnnouncementList(
    announcementTitle,
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
    return <h1 className={styles.announcementText}>{error.message}</h1>
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <h1 className={styles.announcementText}>{announcementTitle}</h1>
        <div className={styles.buttons}>
          {announcementOptions.map(option => (
            <button
              key={option}
              className={`${styles.button} ${optionState === option && styles.activeButton}`}
              onClick={() => handleTypeChange(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.announcements}>
        {data &&
          data.content &&
          data.content.map((post: postType, idx: number) => {
            return (
              <div key={post.title}>
                <Link
                  href={`${apartmentEngName}/board/lists/${post.announcementId ? `announcement/${post.announcementCategory?.type}` : post.communicationId ? `communication/${post.communicationCategory?.type}` : post.complaintId ? `complaint/${post.complaintCategory?.type}` : post.informationId ? `information/${post.informationCategory?.type}` : ''}/detail/${post.announcementId || post.communicationId}`}>
                  <div className={styles.announcementBox}>
                    <span>{post.title}</span>
                    <p>{formatDate(post.createdAt)}</p>
                  </div>
                  {data.content.length != ++idx && (
                    <div className={styles.announcementBoxLine} />
                  )}
                </Link>
              </div>
            )
          })}
      </div>
      <Link
        href={`${apartmentEngName}/board/lists/${announcementTitle === '공지사항' ? 'announcement/NOTICE' : 'communication/USER_COMMU'}/1`}>
        <div className={`${styles.containerBottom} body_03`}>
          <p>
            {announcementType} {'>'}
          </p>
        </div>
      </Link>
    </div>
  )
}
