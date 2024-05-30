import CommentLike from '@/components/commentLike/CommentLike'
import Emoji from '@/components/emoji/Emoji'
import NumberBar from '@/components/numberBar/NumberBar'
import SearchBar from '@/components/searchBar/SearchBar'
import Tap from '@/components/tap/Tap'
import { dummyAnnouncementData } from '@/constants/announcement.dummy'
import { dropDown } from '@/constants/dropDown'
import { tapList } from '@/constants/tapList'

export default function Page({ params }: { params: { post: string } }) {
  return (
    <div>
      <h1>{params.post[0]} 페이지</h1>
      <SearchBar
        id="test1"
        placeholder="검색어를 입력해주세요"
        dropDown={dropDown}
      />
      <SearchBar
        id="test2"
        placeholder="검색어를 입력해주세요"
      />
      <Tap tapList={tapList} />
      <NumberBar
        totalPages={dummyAnnouncementData.totalPages}
        pageNumber={Number(params.post[1])}
      />
      <Emoji
        iconType="like"
        count={1}
        active={false}
      />
      <Emoji
        iconType="like"
        count={2}
        active={true}
      />
      <Emoji
        iconType="hate"
        active={false}
      />
      <Emoji
        iconType="hate"
        active={true}
      />
      <CommentLike />
      <CommentLike
        count={12}
        active={true}
      />
    </div>
  )
}
