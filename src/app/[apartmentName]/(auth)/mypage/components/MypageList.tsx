'use client'

import axios from 'axios'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'
import lock from 'public/icons/lock.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import Chip from '@/components/common/Chip'
import { RootState } from '@/redux/store'

import Mypage_ElasticTabs from './Mypage_Tap'
import Mypage_NumberBar from './MypageNumberBar'

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
  tbody tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray._05};
  }
`

const PostWidth164 = styled.th`
  width: 164px;
`
const PostWidth300 = styled.th`
  width: 300px;
  text-align: left;
  padding-left: 16px;
`

const PostWidth120 = styled.th`
  width: 120px;
`

const PostTextAlignCenter = styled.td`
  text-align: center;
`
const PostTextAlignLeft = styled.th`
  text-align: left;
`

const PostTitleData = styled.td`
  display: flex;
  gap: 8px;
  height: inherit;
  align-items: center;
`

const AlignItemsCenter = styled.td`
  display: flex;
  justify-content: center;
`

const PostTitleContentData = styled.td`
  display: flex;
  gap: 8px;
  height: inherit;
  align-items: center;
  width: 100%;
`

const Positions = styled.div`
  position: absolute;
  top: 443px;
`

const CenterItem = styled.div`
  display: flex;
  justify-content: center;
`

interface Post {
  boardType: string
  postTitle: string
  communicationCategory: {
    name: string
  }
  complaintId: number
  complaintCategory: {
    complaintCategory: number
    name: string
    type: string
  }
  complaintStatus: string
  writer: {
    memberId: number
    nickname: string
    profileImage: string | null
  }
  title: string
  createdAt: string
  view: number
  commentCnt: number
  agreeCnt: number
  secret: boolean
}

interface Comment {
  postTitle: string
  commentId: number
  contents: string
  commentWriter: {
    memberId: number
    nickname: string
    profileImage: string | null
  }
  createdAt: string
}

export default function MypageList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [commentTotalPages, setCommentTotalPages] = useState(1)
  const [communicationTotalPages, setCommunicationTotalPages] = useState(1)
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const searchParams = useSearchParams()
  const params = useParams()

  const pageNumber = parseInt(searchParams.get('pageNumber') || '1', 10)
  const postType =
    (Array.isArray(params['complaints'])
      ? params['complaints'][0]
      : params['complaints']) ||
    (Array.isArray(params['communication'])
      ? params['communication'][0]
      : params['communication']) ||
    (params['comment'] as string)

  const typeKey = postType === 'comment' ? 'commentType' : 'communicationType'
  const typeValue =
    searchParams.get(typeKey) ||
    (postType === 'comment' ? 'ANNOUNCEMENT' : 'USER_COMMU')

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}.${month}.${day}`
  }

  const getApiEndpoint = (postType: string) => {
    switch (postType) {
      case 'complaints':
        return `https://aptner.shop/api/post/complaint/search/${pageNumber}`
      case 'communication':
        return `https://aptner.shop/api/post/communication/search/${pageNumber}`
      case 'comment':
        return 'https://aptner.shop/api/post/comment/'
      default:
        return ''
    }
  }

  const getApiParams = (postType: string) => {
    switch (postType) {
      case 'complaints':
        return {
          pageSize: 10,
          searchType: 'TITLE_CONTENTS',
          orderType: 'DATE',
          orderBy: 'DESC',
          myComplaint: true,
        }
      case 'communication':
        return {
          pageSize: 10,
          searchType: 'TITLE',
          orderType: 'DATE',
          orderBy: 'DESC',
          communicationType: typeValue,
          myCommunication: true,
        }
      case 'comment':
        return {
          pageNumber,
          pageSize: 10,
          commentType: typeValue,
        }
      default:
        return {}
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (!accessToken) {
        return
      }

      const apiEndpoint = getApiEndpoint(postType)
      const apiParams = getApiParams(postType)

      try {
        const response = await axios.get(apiEndpoint, {
          params: apiParams,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (postType === 'comment') {
          const content = response.data.content.map((comment: Comment) => ({
            ...comment,
            createdAt: formatDate(comment.createdAt),
          }))

          setComments(content)
          setCommentTotalPages(response.data.totalPages || 1)
        } else {
          const content = response.data.content.map((post: Post) => ({
            ...post,
            createdAt: formatDate(post.createdAt),
          }))

          setPosts(content)
          setCommunicationTotalPages(response.data.totalPages || 1)
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error)
        setPosts([]) // API 요청이 실패한 경우 빈 배열로 초기화
        setComments([]) // 댓글 요청이 실패한 경우 빈 배열로 초기화
      }
    }

    fetchPosts()
  }, [accessToken, pageNumber, postType, typeValue])

  const communicationTabs = [
    { value: 'USER_COMMU', label: '입주민 소통' },
    { value: 'REPRESENT_COMMU', label: '입대의 소통' },
  ]

  const commentTabs = [
    { value: 'ANNOUNCEMENT', label: '공지사항' },
    { value: 'COMPLAINT', label: '아파트 민원' },
    { value: 'COMMUNICATION', label: '소통 공간' },
  ]

  return (
    <>
      {postType === 'communication' && (
        <Positions>
          <Mypage_ElasticTabs
            tabList={communicationTabs}
            typeKey="communicationType"
          />
        </Positions>
      )}
      {postType === 'comment' && (
        <Positions>
          <Mypage_ElasticTabs
            tabList={commentTabs}
            typeKey="commentType"
          />
        </Positions>
      )}
      <PostWrapper>
        <thead>
          <tr>
            {postType === 'comment' ? (
              <>
                <PostWidth300>제목</PostWidth300>
                <PostTextAlignLeft>내용</PostTextAlignLeft>
                <PostWidth120>등록일</PostWidth120>
              </>
            ) : postType === 'communication' ? (
              <>
                <PostWidth164>분류</PostWidth164>
                <PostTextAlignLeft>제목</PostTextAlignLeft>
                <PostWidth120>조회수</PostWidth120>
                <PostWidth120>등록일</PostWidth120>
              </>
            ) : (
              <>
                <PostWidth164>분류</PostWidth164>
                <PostTextAlignLeft>제목</PostTextAlignLeft>
                <PostWidth120>조회수</PostWidth120>
                <PostWidth120>등록일</PostWidth120>
                <PostWidth120>민원상태</PostWidth120>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {postType === 'comment' ? (
            comments.length > 0 ? (
              comments.map(comment => (
                <tr key={comment.commentId}>
                  <PostTextAlignLeft>{comment.postTitle}</PostTextAlignLeft>
                  <PostTitleContentData>
                    <p>{comment.contents}</p>
                  </PostTitleContentData>
                  <PostTextAlignCenter>{comment.createdAt}</PostTextAlignCenter>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>등록된 글이 없습니다.</td>
              </tr>
            )
          ) : posts.length > 0 ? (
            posts.map(post => (
              <tr key={post.complaintId}>
                <PostTextAlignCenter>
                  {post.complaintCategory?.name ||
                    post.communicationCategory?.name ||
                    post.boardType}
                </PostTextAlignCenter>
                <PostTitleData>
                  {post.secret && (
                    <Image
                      className="rightIcon"
                      src={lock}
                      width={24}
                      height={24}
                      alt="다음"
                    />
                  )}
                  <p>{post?.title || post?.postTitle} </p>
                  {post.commentCnt > 0 && <p>[{post.commentCnt}]</p>}
                </PostTitleData>
                <PostTextAlignCenter>{post.view}</PostTextAlignCenter>
                <PostTextAlignCenter>{post.createdAt}</PostTextAlignCenter>
                {postType !== 'communication' && (
                  <AlignItemsCenter>
                    <Chip
                      color={
                        post.complaintStatus === '처리완료' ? 'fill' : 'outline'
                      }
                      className="caption_01">
                      {post.complaintStatus === 'SUBMITTED'
                        ? '처리중'
                        : post.complaintStatus === 'PROCESSING'
                          ? '진행중'
                          : '처리완료'}
                    </Chip>
                  </AlignItemsCenter>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={postType === 'communication' ? 4 : 5}>
                등록된 글이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </PostWrapper>
      <CenterItem>
        <Mypage_NumberBar
          totalPages={
            postType === 'comment' ? commentTotalPages : communicationTotalPages
          }
          pageNumber={pageNumber}
        />
      </CenterItem>
    </>
  )
}
