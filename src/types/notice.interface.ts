export interface complaintCategoryRespDTO {
  complaintCategory: number
  name: string
  type: string
}

export interface writer {
  memberId: number
  nickname: string
}

export interface announcementCategory {
  announcementCategoryId: number
  name: string
  type: string
}

export interface complaint {
  complaintId?: number
  announcementId?: number
  complaintCategoryRespDTO: complaintCategoryRespDTO
  announcementCategory?: announcementCategory
  complaintStatus?: string
  writer: writer
  title: string
  createdAt: string
  view: number
  connectCnt: number
  agreeCnt: number
  secret: boolean
}

export interface noticeList {
  content: complaint[]
  totalPage: number
  totalElements: number
  pageNumber: number
  size: number
}

export interface noticeState {
  byComments: noticeList
  byPopularity: noticeList
  byImportance: noticeList
  byRecency: noticeList
}
