import SearchBar from '@/components/searchBar/SearchBar'
import { dropDown } from '@/constants/dropDown'

export default function Page({ params }: { params: { post: string } }) {
  return (
    <div>
      <h1>{params.post} 페이지</h1>
      <SearchBar
        id="test1"
        placeholder="검색어를 입력해주세요"
        dropDown={dropDown}
      />
      <SearchBar
        id="test2"
        placeholder="검색어를 입력해주세요"
      />
    </div>
  )
}
