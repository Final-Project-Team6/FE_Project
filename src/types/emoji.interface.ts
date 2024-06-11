import { PostCategoryParamKeys } from '@/constants/params/postCategoryUrl.params'

export interface EmojiType {
  iconType: string
  count?: number
  active?: boolean | null
  postId: number
  accessToken: string | null
  params: {
    post: string
    postType: PostCategoryParamKeys
    listNum: string
    postId: number
  }
}

export interface CommentLikeType {
  count?: number
  active?: boolean
}
