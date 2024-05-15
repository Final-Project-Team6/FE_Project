'use client'
import { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;

  ${({ theme }) => theme.fonts.body._05}
  color: ${({ theme }) => theme.colors.gray._05};

  .link-item {
    display: flex;
    align-items: center;
    gap: 8px;

    width: 208px;
    padding-left: 24px;
    padding-bottom: 16px;

    color: ${({ theme }) => theme.colors.gray._05};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray._05};
  }

  .number {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  .active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryColor};
    color: ${({ theme }) => theme.colors.primaryColor};

    .number {
      background-color: ${({ theme }) => theme.colors.primaryColor};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`

const progressItems = {
  1: '약관동의',
  2: '본인인증',
  3: '개인정보입력',
  4: '아파트정보입력',
  5: '가입완료',
}

export default function ProgressBar() {
  const [completedItems, setCompletedItems] = useState(1)

  const handleNextClick = () => {
    if (completedItems < Object.keys(progressItems).length) {
      setCompletedItems(completedItems + 1)
    }
  }

  return (
    <Container>
      {Object.entries(progressItems).map(([number, text]) => {
        const isActive = parseInt(number) <= completedItems
        return (
          <div
            className={`link-item ${isActive ? 'active' : ''}`}
            key={number}>
            <span className="number">{number}</span>
            <span className="text">{text}</span>
          </div>
        )
      })}
      {/* 테스트용 다음버튼입니다. */}
      <button onClick={handleNextClick}>다음</button>
    </Container>
  )
}
