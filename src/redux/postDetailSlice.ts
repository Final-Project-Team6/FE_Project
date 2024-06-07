import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { postType } from '@/types/post.interface'

const initialState: postType = {
  writer: {
    memberId: 0,
    nickname: '',
    profileImage: '',
  },
  title: '',
  createdAt: '',
  view: 0,
}

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
    setPostDetailReducer(state, action: PayloadAction<postType>) {
      state.announcementId = action.payload.announcementId
      state.announcementCategory = action.payload.announcementCategory
      state.communicationId = action.payload.communicationId
      state.communicationCategory = action.payload.communicationCategory
      state.complaintId = action.payload.complaintId
      state.complaintCategory = action.payload.complaintCategory
      state.informationId = action.payload.informationId
      state.informationCategory = action.payload.informationCategory
      state.writer = action.payload.writer
      state.title = action.payload.title
      state.contents = action.payload.contents
      state.createdAt = action.payload.createdAt
      state.view = action.payload.view
      state.complaintStatus = action.payload.complaintStatus
      state.secret = action.payload.secret
      state.commentCnt = action.payload.commentCnt
      state.agreeCnt = action.payload.agreeCnt
      state.disagreeCnt = action.payload.disagreeCnt
      state.comments = action.payload.comments
      state.yourVote = action.payload.yourVote
    },
  },
})

export const { setPostDetailReducer } = postDetailSlice.actions
export default postDetailSlice.reducer
