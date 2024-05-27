import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'

const fetchNoticeList = async (
  noticeTitle: string,
  apartmentId: number,
  orderType: string,
  complaintType: string,
) => {
  let response
  if (noticeTitle === '공지사항') {
    response = await axios.get(
      `https://aptner.shop/api/post/announcement/search/${apartmentId}?pageNumber=1&pageSize=5${orderType === '중요글' ? '&important=true' : ''}&orderBy=DESC`,
    )
  } else {
    response = await axios.get(
      `https://aptner.shop/api/post/complaint/search/${apartmentId}?pageNumber=1&pageSize=5${orderType && `&orderType=${orderType}`}&orderBy=DESC${complaintType && `&complaintType=${complaintType}`}`,
    )
  }
  return response.data
}

const useFetchNoticeList = (
  noticeTitle: string,
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
    queryKey: [
      'noticeList',
      noticeTitle,
      apartmentId,
      orderType,
      complaintType,
    ],
    queryFn: () =>
      fetchNoticeList(noticeTitle, apartmentId, orderType, complaintType),
    enabled: enabled,
    ...options,
  })
}

export default useFetchNoticeList
