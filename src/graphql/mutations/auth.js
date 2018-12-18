import gql from 'graphql-tag'

export let registerUserMutation = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      success
      message
      user {
        id
        username
      }
    }
  }
`

export let loginUserMutation = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
    }
  }
`
