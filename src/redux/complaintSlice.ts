import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { noticeList, noticeState } from '@/types/notice.interface'

const initialState: noticeState = {
  byComments: {
    content: [],
    totalPage: 0,
    totalElements: 0,
    pageNumber: 0,
    size: 0,
  },
  byPopularity: {
    content: [],
    totalPage: 0,
    totalElements: 0,
    pageNumber: 0,
    size: 0,
  },
  byImportance: {
    content: [],
    totalPage: 0,
    totalElements: 0,
    pageNumber: 0,
    size: 0,
  },
  byRecency: {
    content: [],
    totalPage: 0,
    totalElements: 0,
    pageNumber: 0,
    size: 0,
  },
}

const noticeSlice = createSlice({
  name: 'complaint',
  initialState,
  reducers: {
    setNoticesByComments: (state, action: PayloadAction<noticeList>) => {
      state.byComments = action.payload
    },
    setNoticesByPopularity: (state, action: PayloadAction<noticeList>) => {
      state.byPopularity = action.payload
    },
    setNoticesByImportance: (state, action: PayloadAction<noticeList>) => {
      state.byImportance = action.payload
    },
    setNoticesByRecency: (state, action: PayloadAction<noticeList>) => {
      state.byRecency = action.payload
    },
  },
})

export const {
  setNoticesByComments,
  setNoticesByPopularity,
  setNoticesByImportance,
  setNoticesByRecency,
} = noticeSlice.actions
export default noticeSlice.reducer
