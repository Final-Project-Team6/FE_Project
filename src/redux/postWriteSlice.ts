import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface postWriteState {
  name: string
  categoryId: number
  title: string
  contents: string
  secret?: boolean
  important?: number
  status?: string
}

const initialState: postWriteState = {
  name: '',
  categoryId: 0,
  title: '',
  contents: '',
  secret: false,
}

const postWriteSlice = createSlice({
  name: 'postWrite',
  initialState,
  reducers: {
    setPostWriteCategoryReducer(
      state,
      action: PayloadAction<Partial<postWriteState>>,
    ) {
      state.name = action.payload.name || state.name
      state.categoryId = action.payload.categoryId || state.categoryId
    },
    setPostWriteContentsReducer(
      state,
      action: PayloadAction<{ contents: string }>,
    ) {
      state.contents = action.payload.contents
    },
    setPostWriteTitleReducer(state, action: PayloadAction<{ title: string }>) {
      state.title = action.payload.title
    },
    setPostWriteSecretReducer(
      state,
      action: PayloadAction<Partial<postWriteState>>,
    ) {
      state.secret = action.payload.secret
    },
    setPostWriteImportantReducer(
      state,
      action: PayloadAction<Partial<postWriteState>>,
    ) {
      state.important = action.payload.important
    },
    setPostWriteStatusReducer(
      state,
      action: PayloadAction<Partial<postWriteState>>,
    ) {
      state.status = action.payload.status
    },
  },
})

export const { setPostWriteCategoryReducer: setPostWriteCategoryReducer } =
  postWriteSlice.actions
export const { setPostWriteContentsReducer: setPostWriteContentsReducer } =
  postWriteSlice.actions
export const { setPostWriteTitleReducer: setPostWriteTitleReducer } =
  postWriteSlice.actions
export const { setPostWriteSecretReducer: setPostWriteSecretReducer } =
  postWriteSlice.actions
export const { setPostWriteImportantReducer: setPostWriteImportantReducer } =
  postWriteSlice.actions
export const { setPostWriteStatusReducer: setPostWriteStatusReducer } =
  postWriteSlice.actions
export default postWriteSlice.reducer
