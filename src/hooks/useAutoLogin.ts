import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { refreshAccessToken } from '@/auth'
import {
  clearAccessToken,
  setAccessToken,
  setLoggedOut,
  setRefreshToken,
} from '@/redux/authSlice'
import { RootState } from '@/redux/store'

const useAutoLogin = () => {
  const dispatch = useDispatch()
  const isLoggedOut = useSelector((state: RootState) => state.auth.isLoggedOut)

  useEffect(() => {
    const initializeAuth = async () => {
      if (isLoggedOut) return // 로그아웃 상태이면 자동 로그인 로직 건너뛰기

      const token = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')

      if (token) {
        dispatch(setAccessToken(token))
      } else if (refreshToken) {
        try {
          const newToken = await refreshAccessToken(refreshToken)
          if (newToken) {
            dispatch(setAccessToken(newToken))
            dispatch(setRefreshToken(refreshToken))
            Cookies.set('accessToken', newToken)
          } else {
            dispatch(clearAccessToken())
            dispatch(setLoggedOut())
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
          }
        } catch (error) {
          console.error('Failed to refresh access token:', error)
          dispatch(clearAccessToken())
          dispatch(setLoggedOut())
          Cookies.remove('accessToken')
          Cookies.remove('refreshToken')
        }
      } else {
        dispatch(clearAccessToken())
      }
    }

    initializeAuth()
  }, [dispatch, isLoggedOut])
}

export default useAutoLogin
