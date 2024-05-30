import axios from 'axios'
import Cookies from 'js-cookie'

import { clearAccessToken } from '@/redux/authSlice'
import { store } from '@/redux/store'

import { refreshAccessToken } from './auth'

const api = axios.create({
  baseURL: 'https://aptner.shop/api',
})

api.interceptors.request.use(
  async config => {
    let token = Cookies.get('accessToken')

    if (!token) {
      token = await refreshAccessToken()
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const newToken = await refreshAccessToken()
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axios(originalRequest)
      } else {
        store.dispatch(clearAccessToken())
      }
    }

    return Promise.reject(error)
  },
)

export default api
