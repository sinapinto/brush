import React, { useEffect } from 'react'
import Card from '../../components/Card'
import PostPreview from './PostPreview'
import { listPosts } from '../../fetch/post'
import usePosts from '../../hooks/usePosts'
import styles from './index.module.css'

export default function Home() {
  let [posts = [], setPosts] = usePosts()

  useEffect(() => {
    listPosts()
      .then((posts) => setPosts(posts))
      .catch(console.error)
  }, [])

  return (
    <Card className={styles.card}>
      {posts.map((post) => <PostPreview key={post.id} {...post} />)}
    </Card>
  )
}
