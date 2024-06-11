import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { refreshAccessToken } from '@/auth'
import { setAccessToken } from '@/redux/authSlice'
import { clearAccessToken } from '@/redux/authSlice'
import { RootState } from '@/redux/store'

const useAutoLogin = () => {
  const dispatch = useDispatch()
  const isLoggedOut = useSelector((state: RootState) => state.auth.isLoggedOut)

  useEffect(() => {
    const initializeAuth = async () => {
      if (isLoggedOut) return
      const token =
        localStorage.getItem('accessToken') ||
        sessionStorage.getItem('accessToken')
      const refreshToken =
        localStorage.getItem('refreshToken') ||
        sessionStorage.getItem('refreshToken')

      if (token) {
        dispatch(setAccessToken(token))
      } else if (refreshToken) {
        try {
          const newToken = await refreshAccessToken(refreshToken)
          if (newToken) {
            dispatch(setAccessToken(newToken))
            Cookies.set('accessToken', newToken)
          } else {
            dispatch(clearAccessToken())
          }
        } catch (error) {
          console.error('Failed to refresh access token:', error)
          dispatch(clearAccessToken())
        }
      } else {
        dispatch(clearAccessToken())
      }
    }

    initializeAuth()
  }, [dispatch])
}

export default useAutoLogin
