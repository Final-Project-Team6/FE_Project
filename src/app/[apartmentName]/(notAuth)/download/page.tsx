import Image from 'next/image'
import Link from 'next/link'
import appStoreDownloadImg from 'public/imgs/appStoreDownload.png'
import googleDownloadImg from 'public/imgs/googlePlayDownload.png'

import styles from './download.module.scss'

export async function generateMetadata() {
  return {
    title: '앱 다운로드 | Download',
    description: 'download 페이지',
  }
}

export default function Page() {
  return (
    <div className="commonLayout">
      <h1 className={'title1 ' + styles.downloadTitle}>앱 다운로드</h1>
      <div className={styles.subContents}>
        <div>
          <p>Life Plus, Work Minus</p>
          <p>스마트 홈라이프의 시작, 아파트너</p>
        </div>
        <div>
          <Link
            href={
              'https://play.google.com/store/apps/details?id=kr.co.azsmart.apartner'
            }>
            <Image
              src={googleDownloadImg}
              width={184}
              height={55}
              alt="구글 다운로드"
              priority
            />
          </Link>
          <Link
            href={
              'https://apps.apple.com/kr/app/%EC%95%84%ED%8C%8C%ED%8A%B8%EB%84%88-no-1-%EC%95%84%ED%8C%8C%ED%8A%B8%EC%95%B1/id1243505765'
            }>
            <Image
              src={appStoreDownloadImg}
              width={184}
              height={55}
              alt="앱스토어 다운로드"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
