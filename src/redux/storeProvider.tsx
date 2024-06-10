// src/redux/storeProvider.tsx
'use client'

import Cookies from 'js-cookie'
import { ReactNode, useEffect } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'

import { refreshAccessToken } from '@/auth'
import { clearTokens } from '@/auth'
import useAutoLogin from '@/hooks/useAutoLogin'

import { clearAccessToken, setAccessToken } from './authSlice'
import { RootState, store } from './store'

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  )
}

const AppInitializer = ({ children }: { children: ReactNode }) => {
  useAutoLogin()
  const dispatch = useDispatch()
  const isLoggedOut = useSelector((state: RootState) => state.auth.isLoggedOut) // 로그아웃 상태 확인

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
            Cookies.set('accessToken', newToken)
          } else {
            dispatch(clearAccessToken())
            clearTokens()
          }
        } catch (error) {
          console.error('Failed to refresh access token:', error)
          dispatch(clearAccessToken())
          clearTokens()
        }
      } else {
        dispatch(clearAccessToken())
      }
    }

    initializeAuth()
  }, [dispatch, isLoggedOut])

  return <>{children}</>
}
