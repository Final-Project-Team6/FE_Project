'use client'
import Image from 'next/image'
import likeOff from 'public/icons/likeOff.svg'
import likeOn from 'public/icons/likeOn.svg'
import styled from 'styled-components'

import { EmojiProps } from '@/types/emoji.interface'

const EmojiWrapper = styled.div`
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  ${({ theme }) => theme.fonts.caption._02}
  color: ${({ theme }) => theme.colors.primaryColor};
  border: 3px solid ${({ theme }) => theme.colors.gray._09};
  border-radius: 8px;
  cursor: pointer;
  .hate {
    transform: rotate(180deg);
  }
`

export default function Emoji({ iconType, count, active }: EmojiProps) {
  return (
    <EmojiWrapper>
      <Image
        className={iconType}
        src={active ? likeOn : likeOff}
        width={24}
        height={24}
        alt="Clear input"
        priority
      />
      {iconType === 'like' && count}
    </EmojiWrapper>
  )
}
