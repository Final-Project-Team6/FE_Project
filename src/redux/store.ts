import { configureStore } from '@reduxjs/toolkit'

import apartmentReducer from '@/redux/apartmentSlice'
import noticeReducer from '@/redux/complaintSlice'
import stepReducer from '@/redux/joinSlice'

export const store = configureStore({
  reducer: {
    notice: noticeReducer,
    apartment: apartmentReducer,
    step: stepReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
