import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export let currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`

export let getCurrentUser = graphql(currentUserQuery, {
  props: ({ data }) => ({
    currentUser: data.currentUser,
  }),
})
