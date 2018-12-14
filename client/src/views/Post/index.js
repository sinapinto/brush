import React from 'react'
import PropTypes from 'prop-types'

export default function Post({ id }) {
  return (
    <div>
      post {id}
    </div>
  )
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
}
