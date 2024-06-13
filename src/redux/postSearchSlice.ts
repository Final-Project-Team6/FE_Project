import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface postSearchState {
  searchType: string | undefined
  keyword: string | undefined
}

const initialState: postSearchState = {
  searchType: undefined,
  keyword: undefined,
}

const postSearchSlice = createSlice({
  name: 'postSearch',
  initialState,
  reducers: {
    setPostSearchReducer(state, action: PayloadAction<postSearchState>) {
      state.searchType = action.payload.searchType
      state.keyword = action.payload.keyword
    },
  },
})

export const { setPostSearchReducer } = postSearchSlice.actions
export default postSearchSlice.reducer
