import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/Card'
import { H2, P } from '../../components/Text'
import { getPost } from '../../fetch/post'
import usePosts from '../../hooks/usePosts'
import styles from './index.module.css'

export default function Post({ id }) {
  let [post = {}, setPost] = usePosts(id)

  useEffect(() => {
    getPost(id)
      .then((post) => setPost(post))
      .catch(console.error)
  }, [])

  return (
    <Card className={styles.container}>
      <H2>post {id}</H2>
      <P>{post.body}</P>
    </Card>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
}
