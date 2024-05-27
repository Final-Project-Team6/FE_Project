'use client'
import Image from 'next/image'
import phone2 from 'public/icons/phone2.svg'
import time from 'public/icons/time.svg'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'
import styles from '@/styles/mainPage.module.scss'

export default function HelpContainer() {
  const apartmentFetchData = useSelector((state: RootState) => state.apartment)
  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpBox}>
        <div className={styles.helpTextContainer}>
          <h3>관리사무소 TEL</h3>
          <span>{apartmentFetchData.data.tel}</span>
        </div>
        <Image
          src={phone2}
          width={70}
          height={70}
          alt="관리사무소 TEL"
          priority
        />
      </div>
      <div className={styles.helpBox}>
        <div className={styles.helpTextContainer}>
          <h3>관리사무소 운영시간</h3>
          <div>
            <span>{apartmentFetchData.data.dutyTime}</span>
            <p>(주말/공휴일 휴무 )</p>
          </div>
        </div>
        <Image
          src={time}
          width={70}
          height={70}
          alt="관리사무소 운영시간"
          priority
        />
      </div>
      <div className={`${styles.helpBox} ${styles.helpBoxGray}`}>
        <div className={styles.helpTextContainer}>
          <h3>아파트너 앱</h3>
          <p>카메라로 QR을 찍어 다운로드하세요</p>
        </div>
        <Image
          src={'/icons/qr.png'}
          width={70}
          height={70}
          alt="관리사무소 TEL"
          priority
        />
      </div>
    </div>
  )
}
