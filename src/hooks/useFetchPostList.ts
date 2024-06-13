import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const fetchPostList = async (
  announcementTitle: string,
  apartmentId: number,
  orderType: string,
) => {
  let response
  if (announcementTitle === '공지사항') {
    response = await axios.get(
      `https://aptner.shop/api/post/announcement/search/${apartmentId}?pageNumber=1&pageSize=5${orderType === '중요글' ? '&important=true' : orderType === '최신순' ? '&orderType=DATE' : ''}&orderBy=DESC`,
    )
  } else {
    response = await axios.get(
      `https://aptner.shop/api/post/communication/search/${apartmentId}?pageNumber=1&pageSize=5${orderType === '인기순' ? '&orderType=VOTE' : orderType === '댓글 TOP' ? '&orderType=COMMENT' : ''}&orderBy=DESC&communicationType=USER_COMMU`,
    )
  }
  return response.data
}

const useFetchAnnouncementList = (
  announcementTitle: string,
  apartmentId: number,
  orderType: string,
  complaintType: string,
  options = {},
) => {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (apartmentId !== 0) {
      setEnabled(true)
    } else {
      setEnabled(false)
    }
  }, [apartmentId])
  return useQuery({
    queryKey: [announcementTitle, apartmentId, orderType],
    queryFn: () => fetchPostList(announcementTitle, apartmentId, orderType),
    enabled: enabled,
    ...options,
  })
}

export default useFetchAnnouncementList
