'use client'

import { ReactNode } from 'react'
import { styled } from 'styled-components'

import Button from '@/components/common/Button'

type Dialog = 'confirm' | 'find' | 'confirmWithCancel'

interface DialogProps {
  children: ReactNode
  dialog: Dialog
  onClose: () => void
  onConfirm?: () => void
}

interface DialogButtonProps {
  dialog: Dialog
  onClose: () => void
  onConfirm?: () => void
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
  gap: 32px;
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

  p {
    font-size: ${({ theme }) => theme.fonts.body._03};
    ${({ theme }) => theme.colors.gray._10};
    padding: 16px 26px;
    text-align: center;
  }
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

function DialogButton({ dialog, onClose, onConfirm }: DialogButtonProps) {
  switch (dialog) {
    case 'find':
      return (
        <ButtonBlock>
          <Button
            size="message"
            onClick={onClose}>
            확인
          </Button>
          <Button
            size="message"
            color="primary"
            onClick={onClose}>
            아이디/비밀번호 찾기
          </Button>
        </ButtonBlock>
      )
    case 'confirm':
      return (
        <Button
          color="primary"
          size="message"
          onClick={onClose}>
          확인
        </Button>
      )
    case 'confirmWithCancel':
      return (
        <ButtonBlock>
          <Button
            size="message"
            onClick={onClose}>
            취소
          </Button>
          <Button
            size="message"
            color="primary"
            onClick={onConfirm}>
            확인
          </Button>
        </ButtonBlock>
      )
  }
}

export default function Dialog({
  children,
  dialog,
  onClose,
  onConfirm,
}: DialogProps) {
  return (
    <>
      <Background onClick={onClose} />
      <StyledModal>
        <CloseButton onClick={onClose}>
          <span />
          <span />
        </CloseButton>
        <p dangerouslySetInnerHTML={{ __html: children as string }} />
        <DialogButton
          dialog={dialog}
          onClose={onClose}
          onConfirm={onConfirm}
        />
      </StyledModal>
    </>
  )
}
