import styled from 'styled-components'

import { sizeMap } from '@/styles/themes'

interface BodyProps {
  children: string
  size: keyof typeof sizeMap
}

const BodyText = styled.h1<BodyProps>`
  font-size: ${props => sizeMap[props.size]}rem;
  font-family: Pretendard;
  font-weight: medium;
  color: #111;
`

const Body = ({ children, size }: BodyProps) => {
  return <BodyText size={size}>{children}</BodyText>
}

export default Body
