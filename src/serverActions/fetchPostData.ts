import { FetchPostListDataParams } from '@/types/fetchProps/fetchPostListDataParams.interface'

// 아파트 게시글 카테고리 생성
export async function createPostCategory(
  apartmentId: number,
  postType: string,
  name: string,
  type: string,
) {
  const payload = { name, type }

  const res = await fetch(
    `https://aptner.shop/api/admin/post/${postType}/category/${apartmentId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 카테고리 생성 실패')
  }

  return res.json()
}

// 아파트 게시글 카테고리 조회
export async function fetchPostCategory({
  postType,
  apartmentId,
  complaintType,
  announcementType,
  communicationType,
  informationType,
}: {
  postType: string
  apartmentId: number
  complaintType?: string
  announcementType?: string
  communicationType?: string
  informationType?: string
}) {
  const res = await fetch(
    `https://aptner.shop/api/post/${postType}/category/${apartmentId}?${
      complaintType
        ? `complaintType=${complaintType}`
        : announcementType
          ? `announcementType=${announcementType}`
          : communicationType
            ? `communicationType=${communicationType}`
            : informationType
              ? `informationType=${informationType}`
              : ''
    }`,
    {
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 카테고리 조회 실패')
  }

  return res.json()
}

// 아파트 게시글 카테고리 수정
export async function patchPostCategory(
  apartmentCategoryId: number,
  name: string,
  type: string,
) {
  const payload = { name, type }

  const res = await fetch(
    `https://aptner.shop/api/admin/post/announcement/category/${apartmentCategoryId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 카테고리 수정 실패')
  }

  return res.json()
}

// 아파트 게시글 카테고리 삭제
export async function deletePostCategory(
  postType: string,
  apartmentCategoryId: number,
) {
  const res = await fetch(
    `https://aptner.shop/api/admin/post/${postType}/category/${apartmentCategoryId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 카테고리 삭제 실패')
  }

  return res.json()
}

// 아파트 게시글 생성
export async function createPost({
  apartmentId,
  postType,
  title,
  contents,
  complaintCategoryId,
  informationCategoryId,
  announcementCategoryId,
  communicationCategoryId,
  important,
  status,
  secret,
  accessToken,
}: {
  apartmentId: number
  postType: string
  title: string
  contents: string
  complaintCategoryId?: number
  informationCategoryId?: number
  announcementCategoryId?: number
  communicationCategoryId?: number
  important?: number
  status?: string
  secret?: boolean
  accessToken: string | null
}) {
  const payload = {
    apartmentId,
    postType,
    title,
    contents,
    ...(announcementCategoryId !== undefined && { announcementCategoryId }),
    ...(status !== undefined && { status }),
    ...(important !== undefined && { important }),
    ...(complaintCategoryId !== undefined && { complaintCategoryId }),
    ...(secret !== undefined && { secret }),
    ...(communicationCategoryId !== undefined && { communicationCategoryId }),
    ...(informationCategoryId !== undefined && { informationCategoryId }),
  }

  const res = await fetch(
    `https://aptner.shop/api/post/${postType}/${apartmentId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 생성 실패')
  }

  return res
}

// 아파트 게시글 수정
export async function patchPost(
  apartmentId: number,
  postType: string,
  title: string,
  contents: boolean,
  complaintCategoryId?: number,
  informationCategoryId?: number,
  announcementCategoryId?: number,
  communicationCategoryId?: number,
  important?: number,
  status?: string,
  secret?: boolean,
) {
  const payload = {
    apartmentId,
    postType,
    title,
    contents,
    ...(announcementCategoryId !== undefined && { announcementCategoryId }),
    ...(status !== undefined && { status }),
    ...(important !== undefined && { important }),
    ...(complaintCategoryId !== undefined && { complaintCategoryId }),
    ...(secret !== undefined && { secret }),
    ...(communicationCategoryId !== undefined && { communicationCategoryId }),
    ...(informationCategoryId !== undefined && { informationCategoryId }),
  }

  const res = await fetch(
    `https://aptner.shop/api/admin/post/${postType}/${apartmentId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 생성 실패')
  }

  return res.json()
}

// 아파트 게시글 삭제
export async function deletePost(
  postType: string,
  announcementId?: number, // 공지사항 삭제
  complaintId?: number, // 민원 삭제
  communicationId?: number, // 소통공간 삭제
  informationId?: number, // 정보공간 삭제
) {
  const res = await fetch(
    `https://aptner.shop/api${announcementId ? '/admin' : ''}/post/${postType}/${
      announcementId
        ? `${announcementId}`
        : complaintId
          ? `${complaintId}`
          : communicationId
            ? `${communicationId}`
            : informationId
              ? `${informationId}`
              : ''
    }`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 생성 실패')
  }

  return res.json()
}

// 아파트 공지사항 숨기기
export async function patchHideAnnouncement(announcementId: number) {
  const res = await fetch(
    `https://aptner.shop/api/admin/post/announcement/hide/${announcementId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 생성 실패')
  }

  return res.json()
}

// 아파트 게시글 목록 데이터 조회
export async function fetchPostListData({
  postType,
  apartmentId,
  pageNumber,
  pageSize,
  orderBy,
  orderType,
  categoryId,
  keyword,
  searchType,
  announcementType,
  complaintType,
  communicationType,
  informationType,
  myComplaint,
  period,
  important,
  accessToken,
}: FetchPostListDataParams) {
  // 쿼리 파라미터를 객체로 정리
  const queryParams = {
    pageNumber,
    pageSize,
    searchType,
    orderType,
    orderBy,
    keyword,
    announcementType,
    complaintType,
    communicationType,
    informationType,
    categoryId,
    myComplaint,
    period,
    important,
  }

  // 정의된 값만을 사용하여 쿼리 스트링 생성
  const queryString = Object.entries(queryParams)
    .filter(([_, value]) => value !== undefined && _)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&')

  const res = await fetch(
    `https://aptner.shop/api/post/${postType}/search/${apartmentId}?${queryString}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 목록 데이터 조회 실패')
  }

  if (res.status === 204) {
    return '게시글이 없습니다.'
  }

  return res.json()
}

// 아파트 게시글 상세 데이터 조회
export async function fetchPostDetailData(
  postType: string,
  postId: number,
  accessToken?: string | null,
) {
  const res = await fetch(
    `https://aptner.shop/api/post/${postType}/${postId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('아파트 게시글 상세 데이터 조회 실패')
  }

  return res.json()
}
