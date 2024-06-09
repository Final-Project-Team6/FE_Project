import Image from 'next/image'
import Link from 'next/link'
import calendar from 'public/icons/calendar.svg'
import car from 'public/icons/car.svg'
import phone1 from 'public/icons/phone1.svg'
import scan from 'public/icons/scan.svg'
import vote from 'public/icons/vote.svg'
import write from 'public/icons/write.svg'

import HelpContainer from '@/app/[apartmentName]/components/HelpContainer'
import Announcement from '@/components/announcement/Announcement'
import QuickMenu from '@/components/quickMenu/QuickMenu'
import {
  announcementOptions,
  announcementType,
} from '@/constants/mainPageAnnouncement'
import { testMenus } from '@/constants/quickMenu.dummy'
import { fetchApartmentDataUseName } from '@/serverActions/fetchApartmentData'
import styles from '@/styles/mainPage.module.scss'

export async function generateMetadata({
  params,
}: {
  params: { apartmentName: string }
}) {
  const apartmentData = await fetchApartmentDataUseName(params.apartmentName)

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
  const apartmentData = await fetchApartmentDataUseName(params.apartmentName)

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
                <Link
                  href={`${params.apartmentName}/board/lists/complaint/MANAGEMENT_OFFICE/1`}
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
                  href={`${params.apartmentName}/board/lists/communication/REPRESENT_COMMU/1`}
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
                  href={'#'}
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
                  href={'#'}
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
                  href={'#'}
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
                  href={'#'}
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
              <div className={styles.announcementContainer}>
                <Announcement
                  announcementTitle={'공지사항'}
                  announcementOptions={announcementOptions[0].options}
                  announcementType={announcementType.announcementAll}
                  apartmentEngName={apartmentData.data.engName}
                />
                <Announcement
                  announcementTitle={'입주민 소통공간'}
                  announcementOptions={announcementOptions[1].options}
                  announcementType={announcementType.community}
                  apartmentEngName={apartmentData.data.engName}
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
