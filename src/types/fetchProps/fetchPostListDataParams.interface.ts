export interface FetchPostListDataParams {
  postType: string
  apartmentId: number
  pageNumber: number
  pageSize: number
  orderBy: string
  categoryId?: number
  orderType?: string
  keyword?: string
  searchType?: string
  announcementType?: string
  complaintType?: string
  communicationType?: string
  informationType?: string
  myComplaint?: boolean
  period?: string
  important?: boolean
}
