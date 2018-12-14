import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Card from '../../components/Card'
import { H1 } from '../../components/Text'
import UserBio from './UserBio'
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
        <H1>This user does not exist :0</H1>
      ) : (
        <UserBio user={user} />
      )}
    </Card>
  )
}

User.propTypes = {
  match: PropTypes.object.isRequired,
}
