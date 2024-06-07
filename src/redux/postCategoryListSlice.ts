import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CategoryType } from '@/types/post.interface'

const initialState: { postCategoryList: CategoryType[] } = {
  postCategoryList: [],
}

const postCategoryListSlice = createSlice({
  name: 'postCategoryList',
  initialState,
  reducers: {
    setPostCategoryListReducer(state, action: PayloadAction<CategoryType[]>) {
      state.postCategoryList = action.payload
    },
  },
})

export const { setPostCategoryListReducer } = postCategoryListSlice.actions
export default postCategoryListSlice.reducer
