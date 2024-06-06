'use client'

import Image from 'next/image'
import Link from 'next/link'
import lock from 'public/icons/lock.svg'
import newIcon from 'public/icons/new.svg'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Chip from '@/components/common/Chip'
import { complaintStatusParams } from '@/constants/params/complaintStatus.params'
import { PostParamKeys } from '@/constants/params/postUrl.params'
import { fetchPostListData } from '@/serverActions/fetchPostData'
import { postType } from '@/types/post.interface'
import { checkNewPost } from '@/utils/checkNewPost'
import { formatDate } from '@/utils/formatDate'

const PostWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black100};
  }
  th {
    ${({ theme }) => theme.fonts.body._05};
  }
  tr {
    height: 64px;
  }
  tbody a {
    display: contents;
  }
  tbody tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray._05};
  }
  td {
    height: 64px;
  }
  td p {
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`
const PostWidth164 = styled.th`
  width: 164px;
`
const PostWidth160 = styled.th`
  width: 160px;
`
const PostWidth120 = styled.th`
  width: 120px;
`
const PostTextAlignCenter = styled.td`
  text-align: center;
  p {
    justify-content: center;
  }
`
const PostTextAlignLeft = styled.th`
  text-align: left;
`
const PostTitleData = styled.td`
  align-items: center;
`
const AlignItemsCenter = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StatusBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default function PostList({
  params,
}: {
  params: { post: PostParamKeys; listNum: string }
}) {
  const [postList, setPostList] = useState<postType[]>()

  useEffect(() => {
    const fetchPostList = async () => {
      const response = await fetchPostListData({
        postType: params.post,
        apartmentId: 1,
        pageNumber: Number(params.listNum),
        pageSize: 10,
        orderBy: 'DESC',
      })
      setPostList(response.content)
    }
    fetchPostList()
  }, [params.post])

  return (
    <>
      {postList !== undefined && postList.length !== 0 && (
        <PostWrapper>
          <thead>
            <tr>
              <PostWidth164>분류</PostWidth164>
              <PostTextAlignLeft>제목</PostTextAlignLeft>
              <PostWidth160>작성자</PostWidth160>
              <PostWidth120>조회수</PostWidth120>
              <PostWidth120>등록일</PostWidth120>
              {postList[0].complaintStatus !== undefined && (
                <PostWidth120>민원상태</PostWidth120>
              )}
            </tr>
          </thead>
          <tbody>
            {postList.map((post: postType, idx: number) => (
              <tr key={post.title + idx}>
                <PostTextAlignCenter>
                  <Link
                    href={`detail/${post.announcementId || post.communicationId || post.complaintId || post.informationId || ''}`}>
                    <p>
                      {post.announcementCategory?.name ||
                        post.communicationCategory?.name ||
                        post.complaintCategory?.name ||
                        post.informationCategory?.name ||
                        ''}
                    </p>
                  </Link>
                </PostTextAlignCenter>
                <PostTitleData>
                  <Link
                    href={`detail/${post.announcementId || post.communicationId || post.complaintId || post.informationId || ''}`}>
                    <p>
                      {post.secret && (
                        <Image
                          className="lockIcon"
                          src={lock}
                          width={24}
                          height={24}
                          alt="비밀 글"
                          priority
                        />
                      )}
                      {post.title}
                      {checkNewPost(post.createdAt) && (
                        <Image
                          className="newIcon"
                          src={newIcon}
                          width={24}
                          height={24}
                          alt="새로운 글"
                          priority
                        />
                      )}
                      {post.commentCnt !== 0 &&
                        post.commentCnt !== undefined && (
                          <span>[{post.commentCnt}]</span>
                        )}
                    </p>
                  </Link>
                </PostTitleData>
                <PostTextAlignCenter>
                  <Link
                    href={`detail/${post.announcementId || post.communicationId || post.complaintId || post.informationId || ''}`}>
                    <p>{post.writer.nickname}</p>
                  </Link>
                </PostTextAlignCenter>
                <PostTextAlignCenter>
                  <Link
                    href={`detail/${post.announcementId || post.communicationId || post.complaintId || post.informationId || ''}`}>
                    <p>{post.view}</p>
                  </Link>
                </PostTextAlignCenter>
                <PostTextAlignCenter>
                  <Link
                    href={`detail/${post.announcementId || post.communicationId || post.complaintId || post.informationId || ''}`}>
                    <p>{formatDate(post.createdAt)}</p>
                  </Link>
                </PostTextAlignCenter>
                {post.complaintStatus !== undefined && (
                  <AlignItemsCenter>
                    <Link
                      href={`detail/${post.announcementId || post.communicationId || post.complaintId || post.informationId || ''}`}>
                      <StatusBox>
                        <Chip
                          color={
                            post.complaintStatus === 'COMPLETED'
                              ? 'fill'
                              : 'outline'
                          }
                          className="caption_01">
                          {complaintStatusParams[post.complaintStatus]}
                        </Chip>
                      </StatusBox>
                    </Link>
                  </AlignItemsCenter>
                )}
              </tr>
            ))}
          </tbody>
        </PostWrapper>
      )}
    </>
  )
}
