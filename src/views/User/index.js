import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'

import { Card } from '../../components/globals'
import { userByUsername } from '../../graphql/queries/user'
import UserBio from './UserBio'

function User({ username, data }) {
  return <Card>{data.user && <UserBio user={data.user} />}</Card>
}

User.propTypes = {
  username: PropTypes.string.isRequired,
  data: PropTypes.object,
}

export default compose(userByUsername)(User)
