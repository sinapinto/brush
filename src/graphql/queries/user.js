import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export let meQuery = gql`
  query Me {
    me {
      id
      username
    }
  }
`

export let getCurrentUser = graphql(meQuery, {
  props: ({ data }) => ({
    currentUser: data.me,
  }),
})
