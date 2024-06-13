'use client'
import Image from 'next/image'
import likeOff from 'public/icons/likeOff.svg'
import likeOn from 'public/icons/likeOn.svg'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

import { setPostDetailReducer } from '@/redux/postDetailSlice'
import { fetchPostDetailData } from '@/serverActions/fetchPostData'
import {
  createVote,
  deleteVote,
  patchVote,
} from '@/serverActions/fetchVoteData'
import { EmojiType } from '@/types/emoji.interface'

const EmojiWrapper = styled.div`
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  ${({ theme }) => theme.fonts.caption._02}
  color: ${({ theme }) => theme.colors.primaryColor};
  border: 1px solid ${({ theme }) => theme.colors.gray._09};
  border-radius: 8px;
  cursor: pointer;
  .hate {
    transform: rotate(180deg);
  }
`

export default function Emoji({
  iconType,
  count,
  active = null,
  postId,
  accessToken,
  params,
}: EmojiType) {
  const dispatch = useDispatch()

  const fetchPostDetail = async () => {
    const response = await fetchPostDetailData(params.post, postId, accessToken)
    dispatch(setPostDetailReducer(response))
  }

  const handleEmojiClick = async () => {
    if (active === null) {
      const response = await createVote({
        postId: postId,
        voteType: params.post.toUpperCase(),
        opinion: iconType === 'like' ? true : false,
        accessToken: accessToken,
      })
      console.log(response)
    } else if (
      (active && iconType === 'like') ||
      (!active && iconType === 'hate')
    ) {
      const response = await deleteVote({
        postId: postId,
        voteType: params.post.toUpperCase(),
        accessToken: accessToken,
      })
      console.log(response)
    } else {
      const response = await patchVote({
        postId: postId,
        voteType: params.post.toUpperCase(),
        opinion: !active,
        accessToken: accessToken,
      })
      console.log(response)
    }
    fetchPostDetail()
  }

  return (
    <EmojiWrapper onClick={() => handleEmojiClick()}>
      <Image
        className={iconType}
        src={
          active === null
            ? likeOff
            : iconType === 'like' && active
              ? likeOn
              : iconType === 'hate' && !active
                ? likeOn
                : likeOff
        }
        width={24}
        height={24}
        alt="Clear input"
        priority
      />
      {iconType === 'like' && count}
    </EmojiWrapper>
  )
}
