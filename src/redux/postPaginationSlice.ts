import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface postPaginationState {
  totalPages: number
  totalElements: number
  pageNumber: number
  size: number
}

const initialState: postPaginationState = {
  totalPages: 1,
  totalElements: 1,
  pageNumber: 1,
  size: 1,
}

const postPaginationSlice = createSlice({
  name: 'postPagination',
  initialState,
  reducers: {
    setPostPaginationReducer(
      state,
      action: PayloadAction<postPaginationState>,
    ) {
      state.totalPages = action.payload.totalPages
      state.totalElements = action.payload.totalElements
      state.pageNumber = action.payload.pageNumber
      state.size = action.payload.size
    },
  },
})

export const { setPostPaginationReducer } = postPaginationSlice.actions
export default postPaginationSlice.reducer
