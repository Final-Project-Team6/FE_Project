'use client'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 1280px;

  ${({ theme }) => theme.fonts.body._05}
  color: ${({ theme }) => theme.colors.gray._05};

  .link-item {
    display: flex;
    align-items: center;

    gap: 8px;

    width: 232px;
    padding-left: 24px;
    padding-bottom: 16px;

    color: ${({ theme }) => theme.colors.gray._05};
    border-bottom: 2px solid ${({ theme }) => theme.colors.gray._05};
  }

  .number {
    display: flex;
    align-items: flex-end;
    justify-content: center;

    width: 28px;
    height: 28px;
    border-radius: 50%;

    ${({ theme }) => theme.fonts.body._05}
    background-color: ${({ theme }) => theme.colors.gray._05};
    color: ${({ theme }) => theme.colors.white};

    /* 활성화 상태 */
    &.active {
      background-color: ${({ theme }) => theme.colors.primaryColor};
      color: ${({ theme }) => theme.colors.white};
    }

    /* 이미지 추가된 상태 */
    &.with-background {
      background-image: url('icons/checkbox.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border: none;
      text-indent: -9999px;
    }
  }

  .active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primaryColor};
    color: ${({ theme }) => theme.colors.primaryColor};
  }
`

const progressItems = {
  1: '약관동의',
  2: '본인인증',
  3: '개인정보입력',
  4: '아파트정보입력',
  5: '가입완료',
}

interface ProgressBarProps {
  completedItems: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedItems }) => {
  return (
    <Container>
      {Object.entries(progressItems).map(([number, text]) => {
        const isActive = parseInt(number) <= completedItems
        const hasBackground = parseInt(number) < completedItems // 이미지가 있는 상태
        return (
          <div
            className={`link-item ${isActive ? 'active' : ''}`}
            key={number}>
            <span
              className={`number ${isActive ? 'active' : ''} ${hasBackground ? 'with-background' : ''}`}>
              {number}
            </span>
            <span className="text">{text}</span>
          </div>
        )
      })}
    </Container>
  )
}

export default ProgressBar
