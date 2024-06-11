// 파일 업로드
export async function createImage({
  category,
  accessToken,
  imageUrl,
}: {
  category: string
  accessToken: string
  imageUrl: string
}) {
  const formData = new FormData()
  formData.append('file', imageUrl)

  const headers: Record<string, string> = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  }

  const res = await fetch(
    `https://aptner.shop/api/file?category=${encodeURIComponent(category)}`,
    {
      method: 'POST',
      headers,
      body: formData,
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('파일 업로드 실패')
  }

  return res
}
