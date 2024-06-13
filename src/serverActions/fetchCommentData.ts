// 댓글 생성
export async function createComment(
  postId: number,
  commentType: string,
  contents: string,
) {
  const payload = { commentType, contents }

  const res = await fetch(`https://aptner.shop/api/post/comment/${postId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('댓글 생성 실패')
  }

  return res.json()
}

// 댓글 조회
export async function fetchComment(commentType: string, postId: number) {
  const res = await fetch(
    `https://aptner.shop/api/post/comment/${postId}?commentType=${commentType}`,
    { cache: 'no-store' },
  )

  if (!res.ok) {
    throw new Error('댓글 조회 실패')
  }

  return res.json()
}

// 내 댓글 조회
export async function fetchMyComment(pageNumber: number, pageSize: number) {
  const res = await fetch(
    `https://aptner.shop/api/post/comment/?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    { cache: 'no-store' },
  )

  if (!res.ok) {
    throw new Error('내 댓글 조회 실패')
  }

  return res.json()
}

// 댓글 수정
export async function patchComment(postId: number, contents: string) {
  const payload = { contents }

  const res = await fetch(`https://aptner.shop/api/post/comment/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('댓글 수정 실패')
  }

  return res.json()
}

// 댓글 삭제
export async function deleteComment(postId: number) {
  const res = await fetch(`https://aptner.shop/api/post/comment/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('댓글 삭제 실패')
  }

  return res.json()
}
