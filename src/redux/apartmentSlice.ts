import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { findApartmentData } from '@/types/apartmentData'

const initialState: findApartmentData = {
  code: 0,
  message: '',
  data: {
    apartmentId: 0,
    name: '',
    engName: '',
    sido: '',
    gugun: '',
    road: '',
    zipcode: '',
    icon: '',
    banner: '',
    tel: '',
    dutyTime: '',
  },
}

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    fetchApartmentReducer(state, action: PayloadAction<findApartmentData>) {
      state.code = action.payload.code
      state.message = action.payload.message
      state.data = action.payload.data
    },
  },
})

export const { fetchApartmentReducer } = apartmentSlice.actions
export default apartmentSlice.reducer
