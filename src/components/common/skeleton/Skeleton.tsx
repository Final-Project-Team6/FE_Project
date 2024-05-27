import styled from 'styled-components'

const SkeletonWrapper = styled.div<{
  $width: number
  $height: number
}>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ theme }) => theme.colors.white};
  animation-duration: 2000ms;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: skeletonUiAnimation;
  animation-timing-function: cubic-bezier(0.47, 0.01, 0.51, 1);
  background: ${({ theme }) => theme.colors.gray._03};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.gray._03} 0%,
    ${({ theme }) => theme.colors.gray._04} 15%,
    ${({ theme }) => theme.colors.gray._04} 35%,
    ${({ theme }) => theme.colors.gray._03} 50%
  );
  background-size: 200%;
  border-radius: var(--size-24, 24px);

  @keyframes skeletonUiAnimation {
    0% {
      background-position: 100% 0;
    }
    100% {
      background-position: -100% 0;
    }
  }
`

export default function Skeleton({
  width,
  height,
}: {
  width: number
  height: number
}) {
  return (
    <SkeletonWrapper
      $width={width}
      $height={height}
    />
  )
}
