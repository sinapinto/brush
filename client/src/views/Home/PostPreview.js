import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { H3, P } from '../../components/Text'
import styles from './PostPreview.module.css'

export default function PostPreview({ id, title, author }) {
  return (
    <div className={styles.container}>
      <H3>
        <Link to={`/p/${id}`} className={styles.h3link}>
          {title}
        </Link>
      </H3>
      <P>
        <Link to={`/u/${author.username}`} className={styles.plink}>
          {author.username}
        </Link>
      </P>
    </div>
  )
}

PostPreview.propTypes = {
  id: PropTypes.string.isRequired,
  following: PropTypes.bool,
  username: PropTypes.string,
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
