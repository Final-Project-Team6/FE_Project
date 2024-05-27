// 아파트 고유번호 호출
export async function getData(apartmentName: string) {
  // favicon.ico 요청 무시
  if (apartmentName === 'favicon.ico') {
    return null
  }

  const res = await fetch(
    `https://aptner.shop/api/apartment/find?apartmentName=${apartmentName}`,
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
