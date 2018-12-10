import React, { useState, useEffect } from 'react'
import H from '../../components/H'
import Card from '../../components/Card'
import { listPosts } from '../../fetch/post'

export default function Home() {
  let [posts, setPosts] = useState()

  useEffect(() => {
    listPosts()
      .then((posts) => setPosts(posts))
      .catch(console.error)
  }, [])

  return (
    <Card>
      <H level={1}>Home</H>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </Card>
  )
}
