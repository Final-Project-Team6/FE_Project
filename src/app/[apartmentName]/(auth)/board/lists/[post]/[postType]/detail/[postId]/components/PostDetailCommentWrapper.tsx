'use client'
import Image from 'next/image'
import ImgIcon from 'public/icons/commentAddImg.svg'
import ReplyIcon from 'public/icons/reply.svg'
import UserIcon from 'public/icons/user.svg'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CommentLike from '@/components/commentLike/CommentLike'
import Button from '@/components/common/Button'
import { PostCategoryParamKeys } from '@/constants/params/postCategoryUrl.params'
import { setPostDetailReducer } from '@/redux/postDetailSlice'
import { RootState } from '@/redux/store'
import { fetchPostDetailData } from '@/serverActions/fetchPostData'
import styles from '@/styles/postDetailPage.module.scss'
import { postCommentType } from '@/types/post.interface'

import CommentTextArea from './CommentTextArea'

export default function PostDetailCommentWrapper({
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
  const dispatch = useDispatch()

  const fetchPostDetail = async () => {
    const response = await fetchPostDetailData(
      params.post,
      Number(params.postId),
      accessToken,
    )
    dispatch(setPostDetailReducer(response))
  }

  useEffect(() => {
    if (accessToken !== null) {
      fetchPostDetail()
    }
  }, [accessToken])

  return (
    <>
      {postDetailData.title !== '' && (
        <div className={styles.postDetailCommentWrapper}>
          <div className={styles.postDetailCommentTop}>
            <span className="body_01">댓글 ({postDetailData.commentCnt})</span>
          </div>
          {postDetailData.comments?.map((comment: postCommentType) => (
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
      )}
    </>
  )
}
