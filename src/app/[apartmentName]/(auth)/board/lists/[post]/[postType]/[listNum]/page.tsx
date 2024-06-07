import Link from 'next/link'

import Button from '@/components/common/Button'
import NumberBar from '@/components/numberBar/NumberBar'
import PostList from '@/components/postList/PostList'
import SearchBar from '@/components/searchBar/SearchBar'
import ToolTip from '@/components/toolTip/ToolTip'
import { dropDown } from '@/constants/dropDown'
import {
  PostCategoryParamKeys,
  postCategoryParams,
} from '@/constants/params/postCategoryUrl.params'
import styles from '@/styles/postPage.module.scss'

import Filter from './components/Filter'

export async function generateMetadata({
  params,
}: {
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  return {
    title: `${postCategoryParams[params.postType]} | Post`,
    description: 'post 페이지',
  }
}

export default function Page({
  params,
}: {
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  return (
    <>
      <div>
        <h1 className={'title1 ' + styles.postTitle}>
          {postCategoryParams[params.postType]}
        </h1>
        <div className={styles.postFilterWrapper}>
          <div className={styles.postChipWrapper}>
            <Filter params={params} />
          </div>
          <SearchBar
            id={params.post[0]}
            placeholder="검색어를 입력해주세요"
            dropDown={dropDown}
          />
        </div>
        <ToolTip />
      </div>
      <PostList params={params} />
      <div className={styles.postBottomWrapper}>
        <NumberBar params={params} />
        <Link href={'write'}>
          <Button
            className="body_05"
            size="phone"
            color="primary"
            $text="thin">
            글작성하기
          </Button>
        </Link>
      </div>
    </>
  )
}
