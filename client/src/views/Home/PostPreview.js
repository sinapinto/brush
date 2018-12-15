import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { H3, P } from '../../components/Text'

let Container = styled.div`
  padding: 16px;
`

export default function PostPreview({ id, title, author }) {
  return (
    <Container>
      <H3>
        <Link to={`/p/${id}`}>
          {title}
        </Link>
      </H3>
      <P>
        <Link to={`/u/${author.username}`}>
          {author.username}
        </Link>
      </P>
    </Container>
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
