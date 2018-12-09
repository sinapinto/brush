import React from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import Icon from '../../components/Icon'
import H from '../../components/H'
import styles from './UserBio.module.css'

export default function UserBio({ user }) {
  let startDate = formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <H level={1}>{user.username}</H>
        <p>{user.bio}</p>
        <p>Started brushing {startDate}</p>
      </div>
      <Icon name="grin" className={styles.avatar} size={64} />
    </div>
  )
}

UserBio.propTypes = {
  user: PropTypes.object,
}
