import React from 'react'
import PropTypes from 'prop-types'
import { H2, Card } from '../../components/globals'

export default function Post({ id }) {
  return (
    <Card>
      <H2>post</H2>
    </Card>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
}
