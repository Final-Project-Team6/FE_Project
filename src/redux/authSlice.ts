// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  apartmentData: any | null
}

const initialState: AuthState = {
  accessToken: null,
  apartmentData: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    clearAccessToken: state => {
      state.accessToken = null
    },
    setApartmentData: (state, action: PayloadAction<any>) => {
      state.apartmentData = action.payload
    },
  },
})

export const { setAccessToken, clearAccessToken, setApartmentData } =
  authSlice.actions
export default authSlice.reducer
