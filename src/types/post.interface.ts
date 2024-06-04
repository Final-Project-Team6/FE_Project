// 카테고리
export interface announcementCategoryType {
  announcementCategoryId: number
  name: string
  type: string
}
export interface communicationCategoryType {
  communicationCategoryId: number
  name: string
  type: string
}
export interface complaintCategoryRespDTOType {
  complaintCategory: number
  name: string
  type: string
}
export interface informationCategoryType {
  informationCategoryId: number
  name: string
  type: string
}

// 작성자
export interface writerType {
  memberId: number
  nickname: string
}

// 댓글
export interface postCommentType {
  commentId: number
  contents: string
}

// 게시글
export interface postType {
  announcementId?: number
  announcementCategory?: announcementCategoryType
  communicationId?: number
  communicationCategory?: communicationCategoryType
  complaintId?: number
  complaintCategoryRespDTO?: complaintCategoryRespDTOType
  informationId?: number
  informationCategory?: informationCategoryType
  writer: writerType
  title: string
  createdAt: string
  view: number
  complaintStatus?: string
  secret?: boolean
  commentCnt?: number
  agreeCnt?: number
  disagreeCnt?: number
}

// 게시글 리스트
export interface postListType {
  content: postType[]
  totalPages: number
  totalElements: number
  pageNumber: number
  size: number
}
