import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

export let registerUserMutation = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`

export let loginUserMutation = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`

export let logoutUserMutation = gql`
  mutation LogoutUser {
    logout
  }
`

export let logoutUser = graphql(logoutUserMutation, {
  props: ({ mutate }) => ({
    logoutUser: () => {
      mutate()
    },
  }),
})
