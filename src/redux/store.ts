import { configureStore } from '@reduxjs/toolkit'

import apartmentReducer from '@/redux/apartmentSlice'
import noticeReducer from '@/redux/complaintSlice'

export const store = configureStore({
  reducer: {
    notice: noticeReducer,
    apartment: apartmentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
