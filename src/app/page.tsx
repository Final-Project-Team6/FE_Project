import Image from 'next/image'
import Link from 'next/link'
import calendar from 'public/icons/calendar.svg'
import car from 'public/icons/car.svg'
import phone1 from 'public/icons/phone1.svg'
import phone2 from 'public/icons/phone2.svg'
import scan from 'public/icons/scan.svg'
import time from 'public/icons/time.svg'
import vote from 'public/icons/vote.svg'
import write from 'public/icons/write.svg'

import Notice from '@/components/notice/Notice'
import QuickMenu from '@/components/quickMenu/QuickMenu'
import {
  noticeData,
  noticeOptions,
  noticeTitle,
  noticeType,
} from '@/constants/notice.dummy'
import { testMenus } from '@/constants/quickMenu.dummy'
import styles from '@/styles/mainPage.module.scss'

export const metadata = {
  title: 'Main',
  description: '메인 페이지',
}

export default function App() {
  return (
    <>
      <section className={styles.mainPageImage} />
      <section>
        <QuickMenu quickMenu={testMenus} />
        <div className={styles.container}>
          <div className={styles.mainContents}>
            <div className={styles.serviceContainer}>
              <span className={`${styles.serviceContainerText} title_01`}>
                자주 찾는 서비스
              </span>
              <ul className={styles.serviceBoxList}>
                <Link
                  href={'/'}
                  className={styles.serviceBox}>
                  <Image
                    src={phone1}
                    width={70}
                    height={70}
                    alt="관리사무소 민원"
                    priority
                  />
                  <p className={styles.serviceText}>관리사무소 민원</p>
                </Link>
                <Link
                  href={'/'}
                  className={styles.serviceBox}>
                  <Image
                    src={write}
                    width={70}
                    height={70}
                    alt="입대의 소통"
                    priority
                  />
                  <p className={styles.serviceText}>입대의 소통</p>
                </Link>
                <Link
                  href={'/'}
                  className={styles.serviceBox}>
                  <Image
                    src={car}
                    width={70}
                    height={70}
                    alt="방문주차 등록"
                    priority
                  />
                  <p className={styles.serviceText}>방문주차 등록</p>
                </Link>
                <Link
                  href={'/'}
                  className={styles.serviceBox}>
                  <Image
                    src={scan}
                    width={70}
                    height={70}
                    alt="커뮤니티 예약"
                    priority
                  />
                  <p className={styles.serviceText}>커뮤니티 예약</p>
                </Link>
                <Link
                  href={'/'}
                  className={styles.serviceBox}>
                  <Image
                    src={vote}
                    width={70}
                    height={70}
                    alt="주민투표"
                    priority
                  />
                  <p className={styles.serviceText}>주민투표</p>
                </Link>
                <Link
                  href={'/'}
                  className={styles.serviceBox}>
                  <Image
                    src={calendar}
                    width={70}
                    height={70}
                    alt="일정표"
                    priority
                  />
                  <p className={styles.serviceText}>일정표</p>
                </Link>
              </ul>
            </div>
            <div
              className={`${styles.serviceContainer} ${styles.serviceContainerGray}`}>
              <span className={`${styles.serviceContainerText} title_01`}>
                아파트 이야기
              </span>
              <div className={styles.noticeContainer}>
                <Notice
                  noticeTitle={noticeTitle}
                  noticeOptions={noticeOptions}
                  noticeData={noticeData}
                  noticeType={noticeType.noticeAll}
                />
                <Notice
                  noticeTitle={noticeTitle}
                  noticeOptions={noticeOptions}
                  noticeData={noticeData}
                  noticeType={noticeType.community}
                />
              </div>
            </div>
            <div className={styles.serviceContainer}>
              <span className={`${styles.serviceContainerText} title_01`}>
                도움이 필요하신가요?
              </span>
              <div className={styles.helpContainer}>
                <div className={styles.helpBox}>
                  <div className={styles.helpTextContainer}>
                    <h3>관리사무소 TEL</h3>
                    <span>1600-3123</span>
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
                      <span>09:00~18:00</span>
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
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
