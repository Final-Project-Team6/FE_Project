'use client'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Chip from '@/components/common/Chip'
import { PostCategoryParamKeys } from '@/constants/params/postCategoryUrl.params'
import { setPostCategoryListReducer } from '@/redux/postCategoryListSlice'
import { setPostWriteCategoryReducer } from '@/redux/postWriteSlice'
import { RootState } from '@/redux/store'
import { fetchPostCategory } from '@/serverActions/fetchPostData'

export default function Filter({
  params,
}: {
  params: {
    apartmentName: string
    post: string
    postType: PostCategoryParamKeys
    listNum: string
  }
}) {
  const postWrite = useSelector((state: RootState) => state.postWrite)
  const postCategoryList = useSelector(
    (state: RootState) => state.postCategoryList.postCategoryList,
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchPostCategory({
        postType: params.post,
        apartmentId: 1,
        [`${params.post}Type`]: params.postType,
      })
      dispatch(setPostCategoryListReducer(response))
    }
    fetchCategories()
  }, [params.postType])

  return (
    <>
      {postCategoryList.length !== 0 &&
        postCategoryList.map(category => (
          <Chip
            key={category.name}
            color={
              postWrite.name === category.name ? 'fill_black' : 'fill_gray'
            }
            onClick={() =>
              dispatch(
                setPostWriteCategoryReducer({
                  name: category.name,
                  categoryId:
                    category.announcementCategoryId ||
                    category.communicationCategoryId ||
                    category.complaintCategory ||
                    category.informationCategoryId ||
                    0,
                }),
              )
            }>
            {category.name}
          </Chip>
        ))}
    </>
  )
}
