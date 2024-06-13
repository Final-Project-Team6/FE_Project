export const checkNewPost = (createdAt: string) => {
  const postCreatedAt = new Date(createdAt)
  const now = new Date()
  const threeDaysAgo = new Date(now)
  threeDaysAgo.setDate(now.getDate() - 3)

  const isNewPost = postCreatedAt > threeDaysAgo
  return isNewPost
}
