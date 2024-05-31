import PostList from '@/components/postList/PostList'

export async function generateMetadata({
  params,
}: {
  params: { post: string }
}) {
  return {
    title: `${params.post[0]} ${params.post[1]} | Post`,
    description: 'post 페이지',
  }
}

export default function Page() {
  return (
    <div>
      <PostList />
    </div>
  )
}
