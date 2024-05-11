'use client'

import styled from 'styled-components'

const TestContainer = styled.div`
  font-size: 30px;
  color: #111;

  .label-item {
    ${({ theme }) => theme.fonts.caption._01}
  }
`

export default function Header() {
  return (
    <TestContainer>
      <p className="label-item">body_01 text</p>
    </TestContainer>
  )
}
