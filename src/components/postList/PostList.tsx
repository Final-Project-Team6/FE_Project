'use client'

import Image from 'next/image'
import lock from 'public/icons/lock.svg'
import newIcon from 'public/icons/new.svg'
import styled from 'styled-components'

import Chip from '@/components/common/Chip'

const PostWrapper = styled.table`
  width: 100%;
  border-collapse: collapse;
  thead {
    border-bottom: 1px solid ${({ theme }) => theme.colors.black100};
  }
  th {
    ${({ theme }) => theme.fonts.body._05};
  }
  tr {
    height: 64px;
  }
  tbody tr {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray._05};
  }
`

const PostWidth164 = styled.th`
  width: 164px;
`
const PostWidth160 = styled.th`
  width: 160px;
`
const PostWidth120 = styled.th`
  width: 120px;
`

const PostTextAlignCenter = styled.td`
  text-align: center;
`
const PostTextAlignLeft = styled.th`
  text-align: left;
`

const PostTitleData = styled.td`
  display: flex;
  gap: 8px;
  height: inherit;
  align-items: center;
`

const AlignItemsCenter = styled.td`
  display: flex;
  justify-content: center;
`

export default function PostList() {
  return (
    <PostWrapper>
      <thead>
        <tr>
          <PostWidth164>분류</PostWidth164>
          <PostTextAlignLeft>제목</PostTextAlignLeft>
          <PostWidth160>작성자</PostWidth160>
          <PostWidth120>조회수</PostWidth120>
          <PostWidth120>등록일</PostWidth120>
          <PostWidth120>민원상태</PostWidth120>
        </tr>
      </thead>
      <tbody>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="fill"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
        <tr>
          <PostTextAlignCenter>공동생활</PostTextAlignCenter>
          <PostTitleData>
            <Image
              className="rightIcon"
              src={lock}
              width={24}
              height={24}
              alt="다음"
            />
            <p>탁구대 구입 문의</p>
            <Image
              className="rightIcon"
              src={newIcon}
              width={24}
              height={24}
              alt="다음"
            />
            <p>[2]</p>
          </PostTitleData>
          <PostTextAlignCenter>Curiosity</PostTextAlignCenter>
          <PostTextAlignCenter>2</PostTextAlignCenter>
          <PostTextAlignCenter>2024.05.10</PostTextAlignCenter>
          <AlignItemsCenter>
            <Chip
              color="outline"
              className="caption_01">
              처리완료
            </Chip>
          </AlignItemsCenter>
        </tr>
      </tbody>
    </PostWrapper>
  )
}
