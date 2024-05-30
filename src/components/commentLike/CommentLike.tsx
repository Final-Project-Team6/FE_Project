'use client'
import Image from 'next/image'
import likeOff from 'public/icons/likeOff.svg'
import likeOn from 'public/icons/likeOn.svg'
import styled from 'styled-components'

import { CommentLikeProps } from '@/types/emoji.interface'

const CommentLikeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  ${({ theme }) => theme.fonts.body._05}
  color: ${({ theme }) => theme.colors.gray._07};
  cursor: pointer;
  + .active {
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`
export default function CommentLike({
  count,
  active = false,
}: CommentLikeProps) {
  return (
    <CommentLikeWrapper className={active ? 'active' : ''}>
      <Image
        src={active ? likeOn : likeOff}
        width={24}
        height={24}
        alt="Clear input"
        priority
      />
      {count ? count : '좋아요'}
    </CommentLikeWrapper>
  )
}
