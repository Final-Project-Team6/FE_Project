import Chip from '@/components/common/Chip'
import SearchBar from '@/components/searchBar/SearchBar'
import ToolTip from '@/components/toolTip/ToolTip'
import { dropDown } from '@/constants/dropDown'
import { PostParamKeys, postParams } from '@/constants/params/postUrl.params'
import styles from '@/styles/postPage.module.scss'

export default function page({
  params,
}: {
  params: { post: PostParamKeys[] }
}) {
  return (
    <div>
      <h1 className={'title1 ' + styles.postTitle}>
        {postParams[params.post[0]]}
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
  )
}
