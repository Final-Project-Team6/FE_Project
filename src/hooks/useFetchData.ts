import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchData = async (
  apartmentId: number,
  orderType: string,
  complaintType: string,
) => {
  const response = await axios.get(
    `https://aptner.shop/api/post/complaint/search/${apartmentId}?pageNumber=1&pageSize=5${orderType && `&orderType=${orderType}`}&orderBy=DESC${complaintType && `&complaintType=${complaintType}`}`,
  )
  return response.data
}

const useFetchData = (
  apartmentId: number,
  orderType: string,
  complaintType: string,
) => {
  return useQuery({
    queryKey: ['announcementList', apartmentId, orderType, complaintType],
    queryFn: () => fetchData(apartmentId, orderType, complaintType),
  })
}

export default useFetchData
