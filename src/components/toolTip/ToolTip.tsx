'use client'
import Image from 'next/image'
import InfoOff from 'public/icons/roundPlusClicked.svg'
import InfoOn from 'public/icons/roundPlusUnclicked.svg'
import { useState } from 'react'
import styled from 'styled-components'

const ToolTipWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  height: fit-content;
`

const ToolTipText = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  img {
    transition: 0.3s;
  }

  &:hover > img {
    transform: rotate(90deg);
  }
`
const ToolTipInfo = styled.div<{ $active: boolean }>`
  background-color: ${({ theme }) => theme.colors.primaryColor};
  color: ${({ theme }) => theme.colors.white};
  padding: 8px 16px;
  border-radius: 8px;
  transition:
    width 0.5s,
    opacity 0.5s;
  overflow: hidden;
  white-space: nowrap;
  opacity: ${props => (props.$active ? '1' : '0')};
`

export default function ToolTip({
  toolTipText = '비밀글이 노출되시는게 걱정되시나요?',
  toolTipInfo = '비밀글에 대한 내용은 나와 관리사무소만 볼 수 있습니다.',
}: {
  toolTipText?: string
  toolTipInfo?: string
}) {
  const [activeInfo, setActiveInfo] = useState(false)

  return (
    <ToolTipWrapper>
      <ToolTipText
        onMouseEnter={() => setActiveInfo(true)}
        onMouseLeave={() => setActiveInfo(false)}>
        <p>{toolTipText}</p>
        <Image
          src={activeInfo ? InfoOff : InfoOn}
          width={24}
          height={24}
          alt="Clear input"
          priority
        />
      </ToolTipText>
      <ToolTipInfo $active={activeInfo}>{toolTipInfo}</ToolTipInfo>
    </ToolTipWrapper>
  )
}
