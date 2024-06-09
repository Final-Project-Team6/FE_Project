import React from 'react'

import {
  PostCategoryParamKeys,
  postCategoryParams,
} from '@/constants/params/postCategoryUrl.params'

import WriteForm from './components/WriteForm'

export async function generateMetadata({
  params,
}: {
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  return {
    title: `${postCategoryParams[params.postType]} | Write`,
    description: 'write 페이지',
  }
}

export default async function Page({
  params,
}: {
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  return <WriteForm params={params} />
}
