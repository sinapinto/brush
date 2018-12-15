import React, { useEffect } from 'react'
import { Card } from '../../components/globals'
import PostPreview from './PostPreview'
import { listPosts } from '../../fetch/post'
import usePosts from '../../hooks/usePosts'

export default function Home() {
  let [posts = [], setPosts] = usePosts()

  useEffect(() => {
    listPosts()
      .then((posts) => setPosts(posts))
      .catch(console.error)
  }, [])

  return (
    <Card>
      {posts.map((post) => <PostPreview key={post.id} {...post} />)}
    </Card>
  )
}
