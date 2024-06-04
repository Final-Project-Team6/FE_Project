import Button from '@/components/common/Button'
import Chip from '@/components/common/Chip'
import NumberBar from '@/components/numberBar/NumberBar'
import PostList from '@/components/postList/PostList'
import SearchBar from '@/components/searchBar/SearchBar'
import ToolTip from '@/components/toolTip/ToolTip'
import { dummyAnnouncementData } from '@/constants/announcement.dummy'
import { dropDown } from '@/constants/dropDown'
import { PostParamKeys, postParams } from '@/constants/params/postUrl.params'
import styles from '@/styles/postPage.module.scss'

export async function generateMetadata({
  params,
}: {
  params: { post: PostParamKeys; listNum: string }
}) {
  return {
    title: `${postParams[params.post]} | Post`,
    description: 'post 페이지',
  }
}

export default function Page({
  params,
}: {
  params: { post: PostParamKeys; listNum: string }
}) {
  return (
    <>
      <div>
        <h1 className={'title1 ' + styles.postTitle}>
          {postParams[params.post]}
        </h1>
        <div className={styles.postFilterWrapper}>
          <div className={styles.postChipWrapper}>
            <Chip
              color="fill_black"
              className="">
              전체보기
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              공동생활
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              엘리베이터
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              주차장
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              보안/경비
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              시설
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              시공하자보수
            </Chip>
            <Chip
              color="fill_gray"
              className="">
              기타
            </Chip>
          </div>
          <SearchBar
            id={params.post[0]}
            placeholder="검색어를 입력해주세요"
            dropDown={dropDown}
          />
        </div>
        <ToolTip />
      </div>
      <PostList />
      <div className={styles.postBottomWrapper}>
        <NumberBar
          totalPages={dummyAnnouncementData.totalPages}
          pageNumber={Number(params.listNum)}
        />
        <Button
          className="body_05"
          size="phone"
          color="primary"
          $text="thin">
          글작성하기
        </Button>
      </div>
    </>
  )
}
