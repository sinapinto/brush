import gql from 'graphql-tag'

export let meQuery = gql`
  query Me {
    me {
      id
      username
    }
  }
`
