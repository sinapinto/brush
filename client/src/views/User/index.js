import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/Card'
import UserBio from './UserBio'
import styles from './index.module.css'
import { getProfile } from '../../fetch/profile'

export default function User({ match }) {
  let [user, setUser] = useState({})
  let { username } = match.params

  useEffect(() => {
    getProfile(username)
      .then(user => setUser(user))
      .catch(user => setUser(null))
  }, [username])

  return (
    <Card>
      {user === null ? (
        <div>user not found :0</div>
      ) : (
        <UserBio user={user} />
      )}
    </Card>
  )
}

User.propTypes = {
  match: PropTypes.object.isRequired,
}
