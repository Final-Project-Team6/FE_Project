import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface postCategoryState {
  name: string
  categoryId?: number | undefined
}

const initialState: postCategoryState = {
  name: '전체보기',
  categoryId: undefined,
}

const postCategorySlice = createSlice({
  name: 'postCategory',
  initialState,
  reducers: {
    setPostCategoryReducer(state, action: PayloadAction<postCategoryState>) {
      state.name = action.payload.name
      state.categoryId = action.payload.categoryId
    },
  },
})

export const { setPostCategoryReducer } = postCategorySlice.actions
export default postCategorySlice.reducer
