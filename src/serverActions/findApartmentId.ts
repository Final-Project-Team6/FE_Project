'use server'

import { fetchApartmentReducer } from '@/redux/apartmentSlice'
import { AppDispatch } from '@/redux/store'

export const fetchApartmentId = async (
  dispatch: AppDispatch,
  apartmentName: string,
) => {
  // API 요청으로 아파트 고유번호 찾기
  const response = await fetch(
    `https://aptner.shop/api/apartment/find?apartmentName=${encodeURIComponent(apartmentName)}`,
  )
  // 해당 응답을 전역상태에 아파트고유번호로 저장
  const data = await response.json()
  dispatch(fetchApartmentReducer(data.data))
}
