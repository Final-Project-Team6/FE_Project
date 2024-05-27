import Image from 'next/image'
import Link from 'next/link'
import calendar from 'public/icons/calendar.svg'
import car from 'public/icons/car.svg'
import phone1 from 'public/icons/phone1.svg'
import scan from 'public/icons/scan.svg'
import vote from 'public/icons/vote.svg'
import write from 'public/icons/write.svg'

import HelpContainer from '@/app/[apartmentName]/components/HelpContainer'
import Notice from '@/components/notice/Notice'
import QuickMenu from '@/components/quickMenu/QuickMenu'
import { noticeOptions, noticeType } from '@/constants/mainPageNotice'
import { testMenus } from '@/constants/quickMenu.dummy'
import { getData } from '@/serverActions/fetchApartmentData'
import styles from '@/styles/mainPage.module.scss'

export async function generateMetadata({
  params,
}: {
  params: { apartmentName: string }
}) {
  const apartmentData = await getData(params.apartmentName)

  return {
    title: `${apartmentData?.data.name} | Main`,
    description: `${params.apartmentName} 메인 페이지`,
  }
}

export default async function App({
  params,
}: {
  params: { apartmentName: string }
}) {
  const apartmentData = await getData(params.apartmentName)
  return (
    <>
      <section
        className={styles.mainPageImage}
        style={{ backgroundImage: `url(${apartmentData?.data.banner})` }}
      />
      <section>
        <QuickMenu quickMenu={testMenus} />
        <div className={styles.container}>
          <div className={styles.mainContents}>
            <div className={styles.serviceContainer}>
              <span className={`${styles.serviceContainerText} title_01`}>
                자주 찾는 서비스
              </span>
              <ul className={styles.serviceBoxList}>
                <Link href={'/'}>
                  <Image
                    src={phone1}
                    width={70}
                    height={70}
                    alt="관리사무소 민원"
                    priority
                  />
                  <p className={styles.serviceText}>관리사무소 민원</p>
                </Link>
                <Link href={'/'}>
                  <Image
                    src={write}
                    width={70}
                    height={70}
                    alt="입대의 소통"
                    priority
                  />
                  <p className={styles.serviceText}>입대의 소통</p>
                </Link>
                <Link href={'/'}>
                  <Image
                    src={car}
                    width={70}
                    height={70}
                    alt="방문주차 등록"
                    priority
                  />
                  <p className={styles.serviceText}>방문주차 등록</p>
                </Link>
                <Link href={'/'}>
                  <Image
                    src={scan}
                    width={70}
                    height={70}
                    alt="커뮤니티 예약"
                    priority
                  />
                  <p className={styles.serviceText}>커뮤니티 예약</p>
                </Link>
                <Link href={'/'}>
                  <Image
                    src={vote}
                    width={70}
                    height={70}
                    alt="주민투표"
                    priority
                  />
                  <p className={styles.serviceText}>주민투표</p>
                </Link>
                <Link href={'/'}>
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
                  noticeTitle={'공지사항'}
                  noticeOptions={noticeOptions[0].options}
                  noticeType={noticeType.noticeAll}
                />
                <Notice
                  noticeTitle={'입주민 소통공간'}
                  noticeOptions={noticeOptions[1].options}
                  noticeType={noticeType.community}
                />
              </div>
            </div>
            <div className={styles.serviceContainer}>
              <span className={`${styles.serviceContainerText} title_01`}>
                도움이 필요하신가요?
              </span>
              <HelpContainer />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
