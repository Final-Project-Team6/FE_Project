// 공감/비공감 생성
export async function createVote(
  postId: number,
  voteType: string,
  option: boolean,
) {
  const res = await fetch(
    `https://aptner.shop/api/post/vote/${postId}?voteType=${voteType}&option=${option}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('공감/비공감 생성 실패')
  }

  return res.json()
}

// 공감/비공감 수정
export async function patchVote(
  postId: number,
  voteType: string,
  option: boolean,
) {
  const res = await fetch(
    `https://aptner.shop/api/post/vote/${postId}?voteType=${voteType}&option=${option}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('공감/비공감 수정 실패')
  }

  return res.json()
}

// 공감/비공감 삭제
export async function deleteVote(postId: number, voteType: string) {
  const res = await fetch(
    `https://aptner.shop/api/post/vote/${postId}?voteType=${voteType}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('공감/비공감 삭제 실패')
  }

  return res.json()
}
