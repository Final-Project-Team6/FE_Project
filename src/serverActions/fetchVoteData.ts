// 공감/비공감 생성
export async function createVote({
  postId,
  voteType,
  opinion,
  accessToken,
}: {
  postId: number
  voteType: string
  opinion: boolean
  accessToken: string
}) {
  const res = await fetch(
    `https://aptner.shop/api/post/vote/${postId}?voteType=${voteType}&opinion=${opinion}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('공감/비공감 생성 실패')
  }

  return res
}

// 공감/비공감 수정
export async function patchVote({
  postId,
  voteType,
  opinion,
  accessToken,
}: {
  postId: number
  voteType: string
  opinion: boolean
  accessToken: string
}) {
  const res = await fetch(
    `https://aptner.shop/api/post/vote/${postId}?voteType=${voteType}&opinion=${opinion}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('공감/비공감 수정 실패')
  }

  return res
}

// 공감/비공감 삭제
export async function deleteVote({
  postId,
  voteType,
  accessToken,
}: {
  postId: number
  voteType: string
  accessToken: string
}) {
  const res = await fetch(
    `https://aptner.shop/api/post/vote/${postId}?voteType=${voteType}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('공감/비공감 삭제 실패')
  }

  return res
}
