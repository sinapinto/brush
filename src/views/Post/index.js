import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { H2, P, Card } from '../../components/globals'
import { getPost } from '../../fetch/post'
import usePosts from '../../hooks/usePosts'

export default function Post({ id }) {
  let [post = {}, setPost] = usePosts(id)

  useEffect(() => {
    getPost(id)
      .then(post => setPost(post))
      .catch(console.error)
  }, [])

  return (
    <Card>
      <H2>post {id}</H2>
      <P>{post.body}</P>
    </Card>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
}
