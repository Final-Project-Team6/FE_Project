import axios from 'axios'
import Cookies from 'js-cookie'

import { clearAccessToken } from '@/redux/authSlice'
import { store } from '@/redux/store'

import { refreshAccessToken } from './auth'
import { clearTokens } from './auth'

const api = axios.create({
  baseURL: 'https://aptner.shop/api',
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (
      error.response &&
      (error.response.status === 401 || error.response.data?.code === -1) &&
      !originalRequest._retry
    ) {
      console.log('401 or -1 error detected')
      originalRequest._retry = true
      const refreshToken = Cookies.get('refreshToken')
      if (refreshToken) {
        const newToken = await refreshAccessToken(refreshToken)
        if (newToken) {
          Cookies.set('accessToken', newToken) // 새 토큰을 쿠키에 저장
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return api(originalRequest)
        } else {
          store.dispatch(clearAccessToken())
          clearTokens() // 토큰 초기화
        }
      } else {
        store.dispatch(clearAccessToken())
        clearTokens() // 토큰 초기화
      }
    }

    return Promise.reject(error)
  },
)
