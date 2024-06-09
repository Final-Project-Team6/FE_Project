'use client'
import Image from 'next/image'
import SecretIcon from 'public/icons/lock.svg'
import UserIcon from 'public/icons/user.svg'
import { useSelector } from 'react-redux'

import Button from '@/components/common/Button'
import Emoji from '@/components/emoji/Emoji'
import { PostCategoryParamKeys } from '@/constants/params/postCategoryUrl.params'
import { RootState } from '@/redux/store'
import styles from '@/styles/postDetailPage.module.scss'

export default function PostDetailTopWrapper({
  params,
}: {
  params: {
    post: string
    postType: PostCategoryParamKeys
    listNum: string
    postId: number
  }
}) {
  const postDetailData = useSelector((state: RootState) => state.postDetail)
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)

  return (
    <div className={styles.postDetailTopWrapper}>
      <div className={styles.postDetailTop}>
        <h2 className="subTitle2">{postDetailData.title}</h2>
        <div className={styles.postDetailTitle}>
          <Image
            src={postDetailData.writer.profileImage || UserIcon}
            width={24}
            height={24}
            alt="게시글 작성자 아이콘"
            priority
          />
          <div className={styles.postDetailTopInfo}>
            <h3 className="caption_02">{postDetailData.writer.nickname}</h3>
            <h4 className="body_05">{postDetailData.createdAt}</h4>
            <p className="body_05">조회수 {postDetailData.view}</p>
          </div>
        </div>
        {postDetailData.secret && (
          <div className={`body_06 ${styles.secretWrapper}`}>
            <Image
              src={SecretIcon}
              width={24}
              height={24}
              alt="비밀글"
              priority
            />
            <p>비밀글</p>
            <p>비밀글은 작성자와 관리사무소만 확인할 수 있습니다</p>
          </div>
        )}
      </div>
      <div
        id="contents"
        className={styles.postDetailInfo}
        dangerouslySetInnerHTML={{ __html: postDetailData.contents }}
      />
      <div className={styles.postDetailLikeWrapper}>
        <p className="body_05">
          <span className="caption_02">{postDetailData.agreeCnt}</span> 명이
          이글에 공감합니다.
        </p>
        <div className={styles.postDetailLikeButtonWrapper}>
          <Emoji
            iconType="like"
            count={postDetailData.agreeCnt}
            active={postDetailData.yourVote}
            postId={Number(params.postId)}
            accessToken={accessToken}
          />
          <Emoji
            iconType="hate"
            count={postDetailData.disagreeCnt}
            active={postDetailData.yourVote}
            postId={Number(params.postId)}
            accessToken={accessToken}
          />
        </div>
      </div>
      <div className={styles.postDetailNavButtonWrapper}>
        <div className={styles.postDetailNavButtons}>
          {postDetailData.writer.memberId === 2 && (
            <>
              <Button
                size="phone"
                $text="thin"
                color="white">
                수정
              </Button>
              <Button
                size="phone"
                $text="thin"
                color="white">
                삭제
              </Button>
            </>
          )}
        </div>
        <div className={styles.postDetailNavButtons}>
          <Button
            size="phone"
            $text="thin"
            color="white">
            이전글
          </Button>
          <Button
            size="phone"
            $text="thin"
            color="white">
            다음글
          </Button>
          <Button
            size="phone"
            $text="thin"
            color="primary">
            목록
          </Button>
        </div>
      </div>
    </div>
  )
}
