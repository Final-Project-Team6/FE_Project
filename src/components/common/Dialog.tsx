'use client'

import { ReactNode } from 'react'
import { styled } from 'styled-components'

import Button from '@/components/common/Button'

/*
  Todo
  - Dialog와 DialogButton 컴포넌트 분리 필요
  - 버튼이 생각보다 크게 렌더링되서 디자이너와 협의 후에 재조정 필요
*/

type Dialog = 'confirm' | 'find'

interface DialogProps {
  children: ReactNode
  dialog: Dialog
}

interface DialogButtonProps {
  dialog: Dialog
}

const Background = styled.div`
  position: fixed;
  background: #000;
  opacity: 0.3;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
`

const StyledModal = styled.div`
  width: 570px;
  height: 358px;
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  h2 {
    font-size: ${({ theme }) => theme.fonts.body._03};
    margin-bottom: 56px;
  }
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ButtonBlock = styled.div`
  display: flex;
  gap: 10px;
`

const CloseButton = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  span {
    width: inherit;
    height: 3px;
    background: #000;
    &:first-child {
      position: absolute;
      transform: rotate(45deg);
    }
    &:last-child {
      position: absolute;
      transform: rotate(-45deg);
    }
  }
`

function DialogButton({ dialog }: DialogButtonProps) {
  switch (dialog) {
    case 'find':
      return (
        <ButtonBlock>
          <Button size="message">확인</Button>
          <Button
            size="message"
            color="primary">
            아이디/비밀번호 찾기
          </Button>
        </ButtonBlock>
      )
    case 'confirm':
      return <Button size="message">확인</Button>
  }
}

export default function Dialog({ children, dialog }: DialogProps) {
  return (
    <>
      <Background />
      <StyledModal>
        <CloseButton>
          <span />
          <span />
        </CloseButton>
        <h2>{children}</h2>
        <DialogButton dialog={dialog} />
      </StyledModal>
    </>
  )
}
