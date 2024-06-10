// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  apartmentData: any | null
  isLoggedOut: boolean
}

const initialState: AuthState = {
  accessToken: null,
  apartmentData: null,
  isLoggedOut: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      state.isLoggedOut = false // 로그인이 되면 로그아웃 상태 해제
    },
    clearAccessToken: state => {
      state.accessToken = null
      state.isLoggedOut = true // 로그아웃 상태 설정
    },
    setApartmentData: (state, action: PayloadAction<any>) => {
      state.apartmentData = action.payload
    },
  },
})

export const { setAccessToken, clearAccessToken, setApartmentData } =
  authSlice.actions
export default authSlice.reducer
