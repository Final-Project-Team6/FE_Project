// stepSlice.js
import { createSlice } from '@reduxjs/toolkit'

import { joinData } from '@/types/joinData'

const initialState: joinData = {
  data: {
    termsService: false,
    privateInformationCollection: false,
    snsMarketingInformationReceive: false,
    fullName: '',
    birthFirst: 0,
    gender: 0,
    phone: 0,
    username: '',
    password: '',
    nickname: '',
    dong: '',
    ho: '',
    apartmentId: 0,
  },
}

const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    saveStep1Data(state, action) {
      state.data = { ...state.data, ...action.payload.data }
    },
    saveStep2Data(state, action) {
      state.data = { ...state.data, ...action.payload.data }
    },
    saveStep3Data(state, action) {
      state.data = { ...state.data, ...action.payload.data }
    },
    saveStep4Data(state, action) {
      state.data = { ...state.data, ...action.payload.data }
    },
    saveStep5Data(state, action) {
      state.data = { ...state.data, ...action.payload.data }
    },
  },
})

export const {
  saveStep1Data,
  saveStep2Data,
  saveStep3Data,
  saveStep4Data,
  saveStep5Data,
} = stepSlice.actions
export default stepSlice.reducer
