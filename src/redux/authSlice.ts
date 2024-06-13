import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  apartmentData: any | null
  isLoggedOut: boolean
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
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
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    },
    clearAccessToken: state => {
      state.accessToken = null
      state.refreshToken = null
      state.isLoggedOut = true // 로그아웃 상태 설정
    },
    setApartmentData: (state, action: PayloadAction<any>) => {
      state.apartmentData = action.payload
    },
    setLoggedOut: state => {
      state.isLoggedOut = true
    },
  },
})

export const {
  setAccessToken,
  setRefreshToken,
  clearAccessToken,
  setApartmentData,
  setLoggedOut,
} = authSlice.actions
export default authSlice.reducer
