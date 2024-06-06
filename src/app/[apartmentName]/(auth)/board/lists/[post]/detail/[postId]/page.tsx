import Image from 'next/image'
import ImgIcon from 'public/icons/commentAddImg.svg'
import SecretIcon from 'public/icons/lock.svg'
import ReplyIcon from 'public/icons/reply.svg'
import UserIcon from 'public/icons/user.svg'
import React from 'react'

import CommentLike from '@/components/commentLike/CommentLike'
import Button from '@/components/common/Button'
import Emoji from '@/components/emoji/Emoji'
import { PostParamKeys, postParams } from '@/constants/params/postUrl.params'
import { fetchPostDetailData } from '@/serverActions/fetchPostData'
import styles from '@/styles/postDetailPage.module.scss'
import { postCommentType } from '@/types/post.interface'

import CommentTextArea from './components/CommentTextArea'

export async function generateMetadata({
  params,
}: {
  params: { post: PostParamKeys; postId: string }
}) {
  return {
    title: `${postParams[params.post]} | Detail`,
    description: 'detail 페이지',
  }
}

export default async function Page({
  params,
}: {
  params: { post: PostParamKeys; postId: string }
}) {
  const postDetailData = await fetchPostDetailData(
    params.post,
    Number(params.postId),
  )

  return (
    <>
      <div className={styles.postDetailWrapper}>
        <h1 className={'title1 ' + styles.postTitle}>
          {postParams[params.post]}
        </h1>
        <div>
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
                  <h3 className="caption_02">
                    {postDetailData.writer.nickname}
                  </h3>
                  <h4 className="body_05">{postDetailData.createdAt}</h4>
                  <p className="body_05">조회수 {postDetailData.view}</p>
                </div>
              </div>
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
            </div>
            <div className={styles.postDetailInfo}>
              <p>{postDetailData.contents}</p>
            </div>
            <div className={styles.postDetailLikeWrapper}>
              <p className="body_05">
                <span className="caption_02">{postDetailData.agreeCnt}</span>{' '}
                명이 이글에 공감합니다.
              </p>
              <div className={styles.postDetailLikeButtonWrapper}>
                <Emoji
                  iconType="like"
                  count={postDetailData.agreeCnt}
                  active={postDetailData.yourVote}
                />
                <Emoji
                  iconType="hate"
                  count={postDetailData.disagreeCnt}
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
        </div>
        <div className={styles.postDetailCommentWrapper}>
          <div className={styles.postDetailCommentTop}>
            <span className="body_01">
              댓글 ({postDetailData.comments.length})
            </span>
          </div>
          {/* 댓글 칸 */}
          {postDetailData.comments.map((comment: postCommentType) => (
            <div
              className={styles.commentWrapper}
              key={`comment${comment.commentId}`}>
              <div>
                <div className={styles.postDetailTitle}>
                  <Image
                    src={comment.commentWriter.profileImage || UserIcon}
                    width={40}
                    height={40}
                    alt="댓글 이미지"
                    priority
                  />
                  <div className={styles.postDetailTopInfo}>
                    <h3 className="caption_02">
                      {comment.commentWriter.nickname}
                    </h3>
                    <h4 className="body_05">{comment.createdAt}</h4>
                  </div>
                </div>
                <div className={styles.commentBottomWrapper}>
                  <div>
                    <p>{comment.contents}</p>
                  </div>
                  <div className={`body_05 ${styles.commentLikeWrapper}`}>
                    <CommentLike
                      count={comment.agree}
                      active={true}
                    />
                    ・ <p>답글 달기</p> ・ <p>수정</p> ・ <p>삭제</p>
                  </div>
                </div>
              </div>
              {comment.children &&
                comment.children.map((subComment: postCommentType) => (
                  <div
                    className={styles.commentChildrenList}
                    key={
                      subComment.commentWriter.nickname + subComment.commentId
                    }>
                    <div className={styles.commentChildren}>
                      <Image
                        src={ReplyIcon}
                        width={22}
                        height={22}
                        alt="대댓글 줄바꿈"
                        priority
                      />
                      <div className={styles.commentChildrenWrapper}>
                        <div className={styles.postDetailTitle}>
                          <Image
                            src={
                              subComment.commentWriter.profileImage || UserIcon
                            }
                            width={40}
                            height={40}
                            alt="댓글 이미지"
                            priority
                          />
                          <div className={styles.postDetailTopInfo}>
                            <h3 className="caption_02">
                              {subComment.commentWriter.nickname}
                            </h3>
                            <h4 className="body_05">{subComment.createdAt}</h4>
                          </div>
                        </div>
                        <div className={styles.commentBottomWrapper}>
                          <div>
                            <p>{subComment.contents}</p>
                          </div>
                          <div
                            className={`body_05 ${styles.commentLikeWrapper}`}>
                            <CommentLike
                              count={subComment.agree}
                              active={true}
                            />
                            ・ <p>답글 달기</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
          {/* 댓글 작성칸 */}
          <div className={styles.commentWriteWrapper}>
            <CommentTextArea />
            <div className={styles.commentWriteBottom}>
              {/* 이미지 첨부 */}
              <div className={styles.commentAddImageWrapper}>
                <Image
                  src={ImgIcon}
                  width={18}
                  height={18}
                  alt="이미지를 첨부"
                  priority
                />
                <p className="body_03">이미지를 첨부</p>
              </div>
              <Button
                size="phone"
                $text="thin"
                color="primary">
                댓글 등록
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
