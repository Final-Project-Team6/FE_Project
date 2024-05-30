// 카테고리
export interface announcementCategory {
  announcementCategoryId: number
  name: string
  type: string
}
export interface communicationCategory {
  communicationCategoryId: number
  name: string
  type: string
}
export interface complaintCategoryRespDTO {
  complaintCategory: number
  name: string
  type: string
}
export interface informationCategory {
  informationCategoryId: number
  name: string
  type: string
}

// 작성자
export interface writer {
  memberId: number
  nickname: string
}

// 댓글
export interface postComment {
  commentId: number
  contents: string
}

// 게시글
export interface post {
  announcementId?: number
  announcementCategory?: announcementCategory
  communicationId?: number
  communicationCategory?: communicationCategory
  complaintId?: number
  complaintCategoryRespDTO?: complaintCategoryRespDTO
  informationId?: number
  informationCategory?: informationCategory
  writer: writer
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
export interface postList {
  content: post[]
  totalPages: number
  totalElements: number
  pageNumber: number
  size: number
}
