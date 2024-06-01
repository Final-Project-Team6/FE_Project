import { configureStore } from '@reduxjs/toolkit'

import apartmentReducer from '@/redux/apartmentSlice'
import stepReducer from '@/redux/joinSlice'

import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    apartment: apartmentReducer,
    step: stepReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
