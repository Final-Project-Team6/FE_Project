// 아파트 ID로 단건 조회
export async function fetchApartmentDataUseId(apartmentId: number) {
  const res = await fetch(
    `https://aptner.shop/api/apartment/apartmentId=${apartmentId}`,
    { cache: 'no-store' },
  )

  if (!res.ok) {
    throw new Error('아파트 ID로 단건 조회 실패')
  }

  return res.json()
}
// 아파트 이름으로 단건 조회
export async function fetchApartmentDataUseName(apartmentName: string) {
  // favicon.ico 요청 무시
  if (apartmentName === 'favicon.ico') {
    return null
  }

  const res = await fetch(
    `https://aptner.shop/api/apartment/find?apartmentName=${apartmentName}`,
    { cache: 'no-store' },
  )

  if (!res.ok) {
    throw new Error('아파트 이름으로 단건 조회 실패')
  }

  return res.json()
}
// 아파트 이름으로 목록 조회
export async function fetchApartmentListDataUseName(apartmentName: string) {
  // favicon.ico 요청 무시
  if (apartmentName === 'favicon.ico') {
    return null
  }

  const res = await fetch(
    `https://aptner.shop/api/apartment/search?apartmentName=${apartmentName}`,
    { cache: 'no-store' },
  )

  if (!res.ok) {
    throw new Error('아파트 이름으로 목록 조회 실패')
  }

  return res.json()
}
// 아파트 단순 전체 조회
export async function fetchAllApartmentData() {
  const res = await fetch('https://aptner.shop/api/apartment', {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('아파트 단순 전체 조회 실패')
  }

  return res.json()
}
