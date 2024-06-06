'use client'
import { useEffect, useState } from 'react'

import Chip from '@/components/common/Chip'
import { PostParamKeys } from '@/constants/params/postUrl.params'
import { fetchPostCategory } from '@/serverActions/fetchPostData'
import { CategoryType } from '@/types/post.interface'

export default function Filter({
  params,
}: {
  params: { post: PostParamKeys; listNum: string }
}) {
  const [filterType, setFilterType] = useState('전체보기')
  const [postCategoryList, setPostCategoryList] = useState<CategoryType[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetchPostCategory({
        postType: params.post,
        apartmentId: 1,
        complaintType: 'MANAGEMENT_OFFICE',
      })
      setPostCategoryList(response)
    }
    fetchCategories()
  }, [params.post])

  return (
    <>
      <Chip
        color={filterType === '전체보기' ? 'fill_black' : 'fill_gray'}
        onClick={() => setFilterType('전체보기')}>
        전체보기
      </Chip>
      {postCategoryList.length !== 0 &&
        postCategoryList.map(category => (
          <Chip
            key={category.name}
            color={filterType === category.name ? 'fill_black' : 'fill_gray'}
            onClick={() => setFilterType(category.name)}>
            {category.name}
          </Chip>
        ))}
    </>
  )
}
