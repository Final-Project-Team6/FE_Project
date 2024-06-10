import axios from 'axios'
import Cookies from 'js-cookie'
import error from 'next/error'
import NextAuth, { CredentialsSignin } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { clearAccessToken, setAccessToken } from './redux/authSlice'
import { store } from './redux/store'

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
  providers: [
    Credentials({
      authorize: async credentials => {
        const { username } = credentials
        let user = { id: '', name: '' }

        // 사용자 이름이 있는 경우, 회원가입!
        if (username) {
          // <회원가입 로직 ...>
          return { user, accessToken: '<ACCESS_TOKEN>' }
        }

        // <로그인 로직 ...>
        if (error) {
          throw new CredentialsSignin()
        }
        return { user, accessToken: '<ACCESS_TOKEN>' }
      },
    }),
  ],
  session: {
    strategy: 'jwt', // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: '/signin', // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async () => {
      return true
    },
    jwt: async ({ token, user, trigger, session }) => {
      if (user?.accessToken) {
        token.accessToken = user.accessToken
      }
      if (trigger === 'update' && session) {
        token = { ...token, ...session.user }
      }
      return token
    },
    session: async ({ session, token }) => {
      if (typeof token?.accessToken === 'string') {
        session.accessToken = token.accessToken
      }
      return session
    },
    // `redirect` 콜백 추가
    redirect: async ({ url, baseUrl }) => {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (url) {
        const { search, origin } = new URL(url)
        const callbackUrl = new URLSearchParams(search).get('callbackUrl')
        if (callbackUrl)
          return callbackUrl.startsWith('/')
            ? `${baseUrl}${callbackUrl}`
            : callbackUrl
        if (origin === baseUrl) return url
      }
      return baseUrl
    },
  },
})

export const clearTokens = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export const refreshAccessToken = async (refreshToken: string | null) => {
  if (!refreshToken) {
    return null
  }

  try {
    const response = await axios.post(
      'https://aptner.shop/api/token/refresh/reissue',
      { refreshToken },
    )
    if (response.data.code === 1 && response.data.data.accessToken) {
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data.data

      store.dispatch(setAccessToken(newAccessToken))
      Cookies.set('accessToken', newAccessToken)
      Cookies.set('refreshToken', newRefreshToken)

      if (localStorage.getItem('rememberMe') === 'true') {
        localStorage.setItem('accessToken', newAccessToken)
        localStorage.setItem('refreshToken', newRefreshToken)
      } else {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      }

      return newAccessToken
    } else {
      throw new Error('Failed to refresh access token')
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === -1
      ) {
        store.dispatch(clearAccessToken())
        clearTokens()
      }
    } else if (error instanceof Error) {
      console.error('Error refreshing access token:', error.message)
    } else {
      console.error('Unknown error refreshing access token')
    }
    return null
  }
}
