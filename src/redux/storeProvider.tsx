// src/redux/storeProvider.tsx
'use client'

import Cookies from 'js-cookie'
import { ReactNode, useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'

import { refreshAccessToken } from '@/auth'

import { clearAccessToken, setAccessToken } from './authSlice'
import { store } from './store'

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AppInitializer>{children}</AppInitializer>
    </Provider>
  )
}

const AppInitializer = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')

      if (token) {
        dispatch(setAccessToken(token))
      } else if (refreshToken) {
        try {
          const newToken = await refreshAccessToken()
          if (newToken) {
            dispatch(setAccessToken(newToken))
            Cookies.set('accessToken', newToken, { expires: 1 })
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

  return <>{children}</>
}
