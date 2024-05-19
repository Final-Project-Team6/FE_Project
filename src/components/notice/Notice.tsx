'use client'
import '@/styles/_mixins.module.scss'

import Link from 'next/link'
import { useState } from 'react'

import styles from '@/components/notice/Notice.module.scss'
import { noticeProps } from '@/types/notice.interface'

export default function Notice({
  noticeTitle,
  noticeOptions,
  noticeData,
  noticeType,
}: {
  noticeTitle: string
  noticeOptions: string[]
  noticeData: noticeProps[]
  noticeType: string
}) {
  const [optionState, setOptionState] = useState(noticeOptions[0])
  const [posts, setPosts] = useState(
    noticeData.filter(post => post.type === noticeData[0].type),
  )

  const handleTypeOne = () => {
    const optionOneList = noticeData.filter(
      post => post.type === noticeOptions[0],
    )
    setOptionState(noticeOptions[0])
    setPosts(optionOneList)
  }
  const handleTypeTwo = () => {
    const optionOneList = noticeData.filter(
      post => post.type === noticeOptions[1],
    )
    setOptionState(noticeOptions[1])
    setPosts(optionOneList)
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerTop}>
        <h1 className={styles.noticeText}>{noticeTitle}</h1>
        <div className={styles.buttons}>
          <button
            className={`${styles.button} ${optionState === noticeOptions[0] && styles.activeButton}`}
            onClick={handleTypeOne}>
            최신순
          </button>
          <button
            className={`${styles.button} ${optionState === noticeOptions[1] && styles.activeButton}`}
            onClick={handleTypeTwo}>
            중요글
          </button>
        </div>
      </div>
      <div className={styles.notices}>
        {posts.map((notice, idx) => {
          return (
            <Link
              key={idx}
              href={`/${notice.idx}`}>
              <div className={styles.noticeBox}>
                <span>{notice.title}</span>
                <p>{notice.date}</p>
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
