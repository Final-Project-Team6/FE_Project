import { auth, signOut, update } from '@/auth'

export async function signInWithCredentials(
  username: string,
  password: string,
  apartmentId: string,
) {
  const payload = { username, password, apartmentId }

  try {
    const response = await fetch('https://aptner.shop/api/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    // code가 1이면 로그인 성공이라고 가정
    if (data.code === 1) {
      return { ok: true, data }
    } else {
      return { ok: false, message: data.message }
    }
  } catch (error) {
    return { ok: false, message: '로그인에 실패했습니다.' }
  }
}

export const signOutWithForm = async () => {
  await signOut()
}

export { auth as getSession, update as updateSession }
