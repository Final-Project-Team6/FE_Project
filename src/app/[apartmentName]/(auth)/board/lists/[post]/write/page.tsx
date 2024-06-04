import Image from 'next/image'
import Info from 'public/icons/info.svg'
import Next from 'public/icons/next.svg'
import React from 'react'

import CheckBox from '@/components/checkBox/CheckBox'
import Button from '@/components/common/Button'
import Chip from '@/components/common/Chip'
import Input from '@/components/common/Input/Input'
import Editor from '@/components/editor/Editor'
import { PostParamKeys, postParams } from '@/constants/params/postUrl.params'
import styles from '@/styles/writePage.module.scss'

export async function generateMetadata({
  params,
}: {
  params: { post: PostParamKeys }
}) {
  return {
    title: `${postParams[params.post]} | Write`,
    description: 'write 페이지',
  }
}

export default function Page({
  params,
}: {
  params: { post: PostParamKeys; listNum: string }
}) {
  return (
    <div className={styles.writeWrapper}>
      <h1 className={'title1 ' + styles.writeTitle}>
        {postParams[params.post]}
      </h1>
      <div className={styles.writeInfoWrapper}>
        <div className={styles.classifyWrapper}>
          <p className="body_03">분류</p>
          <div className={styles.writeChipWrapper}>
            <Chip
              color="fill_gray"
              className="">
              공동생활
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              엘리베이터
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              주차장
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              보안/경비
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              시설
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              시공하자보수
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              기타
            </Chip>
          </div>
        </div>
        <div className={styles.writeTitleWrapper}>
          <p className="body_03">제목</p>
          <Input
            width={696}
            placeholder={'"3자" 이상의 제목을 입력해주세요'}
          />
        </div>
        <div className={'caption_02 ' + styles.cautionWrapper}>
          <div className={styles.cautionTitle}>
            <Image
              src={Info}
              width={24}
              height={24}
              alt="정보"
              priority
            />
            <p>아파트 민원 작성 시 유의사항</p>
          </div>
          <p className={styles.cautionDesc}>
            작성한 게시글에 대한 법적 책임은 작성자에게 귀속되며 게시글 작성 시
            욕설, 특장 대상에 대한 비방, 허위사실 등의 내용을 포함할 경우
            운영정책과 관련 법률에 따라 제재될 수 있습니다.
          </p>
          <div className={styles.viewWrapper}>
            <span className={styles.viewPolicy}>운영 정책 보기</span>
            <Image
              src={Next}
              width={24}
              height={24}
              alt="운영 정책 보기"
              priority
            />
          </div>
        </div>
        <Editor />
        <div className={`caption_02 ${styles.secretSettingWrapper}`}>
          <CheckBox
            name="secret"
            $baseColor>
            비밀글 설정
          </CheckBox>
          <div>
            <p>
              다른 입주민에게 노출을 원하지 않는 민원의 경우 비밀글을
              설정하세요.
            </p>
            <p>
              비밀글 설정을 하면 아파트 민원 게시판에 노출되지 않고 관리사무소와
              작성자만 확인할 수 있습니다.
            </p>
          </div>
        </div>
        <div className={styles.writeConfirmWrapper}>
          <Button
            size="message"
            color="white">
            취소
          </Button>
          <Button
            size="message"
            color="primary">
            저장
          </Button>
        </div>
      </div>
    </div>
  )
}
