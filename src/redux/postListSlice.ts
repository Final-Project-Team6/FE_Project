import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { postType } from '@/types/post.interface'

const initialState: { content: postType[] } = { content: [] }

const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    setPostListReducer(state, action: PayloadAction<postType[]>) {
      state.content = action.payload
    },
  },
})

export const { setPostListReducer } = postListSlice.actions
export default postListSlice.reducer
