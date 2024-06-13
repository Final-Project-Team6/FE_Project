'use client'

import styled from 'styled-components'

const DoNumBox = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`

const Dot = styled.div`
  display: flex;
  gap: 1rem;
  width: 18px;
  height: 18px;
  border-radius: 3rem;

  background-color: ${({ theme }) => theme.colors.gray._06};
`

export default function DotNum({ number }: { number: number }) {
  const dots = Array.from({ length: number }, (_, index) => <Dot key={index} />)
  return <DoNumBox> {dots} </DoNumBox>
}
