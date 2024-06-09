import { configureStore } from '@reduxjs/toolkit'

import apartmentReducer from '@/redux/apartmentSlice'
import stepReducer from '@/redux/joinSlice'
import postCategoryListReducer from '@/redux/postCategoryListSlice'
import postCategoryReducer from '@/redux/postCategorySlice'
import postDetailReducer from '@/redux/postDetailSlice'
import postListReducer from '@/redux/postListSlice'
import postPaginationReducer from '@/redux/postPaginationSlice'
import postSearchReducer from '@/redux/postSearchSlice'
import postWriteReducer from '@/redux/postWriteSlice'

import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    apartment: apartmentReducer,
    step: stepReducer,
    auth: authReducer,
    postCategory: postCategoryReducer,
    postCategoryList: postCategoryListReducer,
    postList: postListReducer,
    postPagination: postPaginationReducer,
    postDetail: postDetailReducer,
    postSearch: postSearchReducer,
    postWrite: postWriteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
