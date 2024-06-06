'use client'

import Image from 'next/image'
import Link from 'next/link'
import nextIcon from 'public/icons/arrowDownGray10.svg'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { PostParamKeys } from '@/constants/params/postUrl.params'
import { fetchPostListData } from '@/serverActions/fetchPostData'
import { postListType } from '@/types/post.interface'

const NumberBarWrapper = styled.ul`
  display: flex;
  gap: 16px;
  ${({ theme }) => theme.fonts.body._05}
  li {
    display: flex;
    list-style: none;
    align-items: center;
    color: ${({ theme }) => theme.colors.gray._08};
  }

  .leftIcon {
    transform: rotate(90deg);
  }
  .rightIcon {
    transform: rotate(-90deg);
  }
  .invisible {
    display: none;
  }
  .active {
    ${({ theme }) => theme.fonts.caption._02}
    color: ${({ theme }) => theme.colors.gray._10};
  }
  .moveContainer {
    display: flex;
    align-items: center;
    ${({ theme }) => theme.fonts.body._06}
  }
`

export default function NumberBar({
  params,
}: {
  params: { post: PostParamKeys; listNum: string }
}) {
  const [postResponse, setPostResponse] = useState<postListType>()
  const calculateStart = (pageNumber: number) => {
    return Math.floor((pageNumber - 1) / 5) * 5 + 1
  }
  const [start, setStart] = useState(calculateStart(Number(params.listNum)))

  const noPrev = Number(params.listNum) === 1

  useEffect(() => {
    const fetchPostList = async () => {
      const response = await fetchPostListData({
        postType: params.post,
        apartmentId: 1,
        pageNumber: Number(params.listNum),
        pageSize: 10,
        orderBy: 'DESC',
      })
      setPostResponse(response)
      setStart(calculateStart(Number(params.listNum)))
    }
    fetchPostList()
  }, [params.post])
  return (
    <>
      {postResponse !== undefined && (
        <NumberBarWrapper>
          <li className={`${noPrev ? 'invisible' : ''}`}>
            <Link
              className="moveContainer"
              href={`${postResponse.pageNumber - 1}`}>
              <Image
                className="leftIcon"
                src={nextIcon}
                width={24}
                height={24}
                alt="이전"
                priority
              />
              이전
            </Link>
          </li>
          {[...Array(5)].map(
            (_, i) =>
              start + i <= postResponse.totalPages && (
                <li key={i}>
                  <Link
                    className={`${postResponse.pageNumber === start + i ? 'active' : ''}`}
                    href={`${start + i}`}>
                    {start + i}
                  </Link>
                </li>
              ),
          )}
          <li
            className={`${Number(params.listNum) === postResponse.totalPages ? 'invisible' : ''}`}>
            <Link
              className="moveContainer"
              href={`${postResponse.pageNumber + 1}`}>
              다음
              <Image
                className="rightIcon"
                src={nextIcon}
                width={24}
                height={24}
                alt="다음"
                priority
              />
            </Link>
          </li>
        </NumberBarWrapper>
      )}
    </>
  )
}
