import React, { useState, useEffect } from 'react'
import Card from '../../components/Card'
import PostPreview from './PostPreview'
import { listPosts } from '../../fetch/post'
import styles from './index.module.css'

export default function Home() {
  let [posts, setPosts] = useState()

  useEffect(() => {
    listPosts()
      .then((posts) => setPosts(posts))
      .catch(console.error)
  }, [])

  return (
    <Card className={styles.card}>
      {posts && posts.map((post) => <PostPreview key={post.id} {...post} />)}
    </Card>
  )
}
