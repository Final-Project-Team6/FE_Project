'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import nextIcon from 'public/icons/arrowDownGray10.svg'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { PaginationProps } from '@/types/pagination.interface'

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

export default function Mypage_NumberBar({
  totalPages,
  pageNumber,
}: PaginationProps) {
  const calculateStart = (pageNumber: number) => {
    return Math.floor((pageNumber - 1) / 5) * 5 + 1
  }

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [start, setStart] = useState(calculateStart(pageNumber))
  const noPrev = pageNumber === 1
  const noNext = pageNumber === totalPages

  useEffect(() => {
    setStart(calculateStart(pageNumber))
  }, [pageNumber, totalPages])

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('pageNumber', page.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <NumberBarWrapper>
      <li className={`${noPrev ? 'invisible' : ''}`}>
        <Link
          className="moveContainer"
          href={createHref(pageNumber - 1)}>
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
          start + i <= totalPages && (
            <li key={i}>
              <Link
                className={`${pageNumber === start + i ? 'active' : ''}`}
                href={createHref(start + i)}>
                {start + i}
              </Link>
            </li>
          ),
      )}
      <li className={`${noNext ? 'invisible' : ''}`}>
        <Link
          className="moveContainer"
          href={createHref(pageNumber + 1)}>
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
  )
}
