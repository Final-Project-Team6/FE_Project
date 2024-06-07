'use client'

import Image from 'next/image'
import Link from 'next/link'
import nextIcon from 'public/icons/arrowDownGray10.svg'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { PostCategoryParamKeys } from '@/constants/params/postCategoryUrl.params'
import { RootState } from '@/redux/store'

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
  params: { post: string; postType: PostCategoryParamKeys; listNum: string }
}) {
  const postList = useSelector((state: RootState) => state.postList.content)
  const postPagination = useSelector((state: RootState) => state.postPagination)
  const calculateStart = (pageNumber: number) => {
    return Math.floor((pageNumber - 1) / 5) * 5 + 1
  }
  const [start, setStart] = useState(calculateStart(Number(params.listNum)))
  const noPrev = Number(params.listNum) === 1

  useEffect(() => {
    setStart(calculateStart(Number(params.listNum)))
  }, [params.post, postList])
  return (
    <>
      {postList !== undefined && (
        <NumberBarWrapper>
          <li className={`${noPrev ? 'invisible' : ''}`}>
            <Link
              className="moveContainer"
              href={`${postPagination.pageNumber - 1}`}
              prefetch>
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
              start + i <= postPagination.totalPages && (
                <li key={i}>
                  <Link
                    className={`${postPagination.pageNumber === start + i ? 'active' : ''}`}
                    href={`${start + i}`}
                    prefetch>
                    {start + i}
                  </Link>
                </li>
              ),
          )}
          <li
            className={`${Number(params.listNum) === postPagination.totalPages ? 'invisible' : ''}`}>
            <Link
              className="moveContainer"
              href={`${postPagination.pageNumber + 1}`}
              prefetch>
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
