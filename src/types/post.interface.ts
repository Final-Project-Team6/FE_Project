import { complaintStatusParamKeys } from '@/constants/params/complaintStatus.params'

// 카테고리
export interface CategoryType {
  communicationCategoryId?: number
  announcementCategoryId?: number
  informationCategoryId?: number
  complaintCategory?: number
  name: string
  type: string
}

// 작성자
export interface writerType {
  memberId: number
  nickname: string
  profileImage: string
}

// 댓글
export interface postCommentType {
  commentId: number
  contents: string
  commentWriter: writerType
  createdAt: string
  status: string
  agree: number
  disagree: number
  yourVote: any
  children: postCommentType[]
}

// 게시글
export interface postType {
  announcementId?: number
  announcementCategory?: CategoryType
  communicationId?: number
  communicationCategory?: CategoryType
  complaintId?: number
  complaintCategory?: CategoryType
  informationId?: number
  informationCategory?: CategoryType
  writer: writerType
  title: string
  createdAt: string
  view: number
  complaintStatus?: complaintStatusParamKeys
  secret?: boolean
  commentCnt?: number
  agreeCnt?: number
  disagreeCnt?: number
}

// 게시글 응답
export interface postListType {
  content: postType[]
  totalPages: number
  totalElements: number
  pageNumber: number
  size: number
}
