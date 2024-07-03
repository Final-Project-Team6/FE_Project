'use client'

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { PostCategoryParamKeys } from '@/constants/params/postCategoryUrl.params'
import { RootState } from '@/redux/store'
import { createComment } from '@/serverActions/fetchCommentData'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const StyledTextarea = styled.textarea`
  width: 1200px;
  height: 180px;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.gray._03};
  resize: none;
  border: none;
`

const Counter = styled.div`
  position: absolute;
  bottom: 10px;
  right: 24px;
  font-size: 14px;
  color: #999;
`

export default function CommentTextArea({
  params,
}: {
  params: {
    apartmentName: string
    post: string
    postType: PostCategoryParamKeys
    listNum: string
    postId: number
  }
}) {
  // const router = useRouter()
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [text, setText] = useState<string>('')
  const maxLength = 3000

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const writeCommentAction = async () => {
    const response = await createComment({
      postId: params.postId,
      commentType: params.postType,
      contents: text,
      accessToken: accessToken,
    })

    alert('댓글이 작성되었습니다.')
    return response
  }

  return (
    <Container>
      <form action={() => writeCommentAction()}>
        <StyledTextarea
          id="contents"
          className="body_03"
          placeholder="내용을 입력해주세요."
          value={text}
          onChange={handleChange}
          maxLength={maxLength}
        />
        <Counter>
          {text.length}/{maxLength}
        </Counter>
      </form>
    </Container>
  )
}
