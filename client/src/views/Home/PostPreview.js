import React from 'react'
import PropTypes from 'prop-types'
import { H3 } from '../../components/Text'
import styles from './PostPreview.module.css'

export default function PostPreview({ title, author }) {
  return (
    <div className={styles.container}>
      <H3>{title}</H3>
      <p>{author.username}</p>
    </div>
  )
}

PostPreview.propTypes = {
  id: PropTypes.string,
  following: PropTypes.bool,
  username: PropTypes.string,
  body: PropTypes.string,
  favorited: PropTypes.bool,
  slug: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
    bio: PropTypes.string,
    createdAt: PropTypes.string,
  }),
}
