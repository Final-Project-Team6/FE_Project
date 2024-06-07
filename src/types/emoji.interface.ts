export interface EmojiType {
  iconType: string
  count?: number
  active?: boolean | null
  postId: number
  accessToken: string | null
}

export interface CommentLikeType {
  count?: number
  active?: boolean
}
