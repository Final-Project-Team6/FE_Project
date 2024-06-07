import { PostCategoryParamKeys, postCategoryParams } from '@/constants/params/postCategoryUrl.params'
import styles from '@/styles/postDetailPage.module.scss'

import PostDetailCommentWrapper from './components/PostDetailCommentWrapper'
import PostDetailTopWrapper from './components/PostDetailTopWrapper'

export async function generateMetadata({
  params,
}: {
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  return {
    title: `${params.post} | Detail`,
    description: 'detail 페이지',
  }
}

export default async function Page({
  params,
}: {
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  return (
    <>
      <div className={styles.postDetailWrapper}>
        <h1 className={'title1 ' + styles.postTitle}>
          {postCategoryParams[params.postType]}
        </h1>
        <div>
          <PostDetailTopWrapper params={params} />
        </div>
        <PostDetailCommentWrapper params={params} />
      </div>
    </>
  )
}
