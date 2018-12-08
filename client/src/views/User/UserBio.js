import React from 'react'
import PropTypes from 'prop-types'
import H from '../../components/H'
import styles from './UserBio.module.css'

function Avatar({ src }) {
  return <div>{src}</div>
}

export default function UserBio({ user }) {
  return (
    <div className={styles.container}>
      <div>
        <H level={1}>{user.username}</H>
        <H level={3}>{user.bio}</H>
      </div>
      <Avatar src={user.avatar} />
    </div>
  );
}

UserBio.propTypes = {
  user: PropTypes.object,
}
