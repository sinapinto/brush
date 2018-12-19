import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { client } from '../index'

let registerUserMutation = gql`
  mutation RegisterUser($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      id
      username
    }
  }
`

export let registerUser = graphql(registerUserMutation, {
  props: ({ mutate }) => ({
    registerUser: async ({ username, password }) => {
      return mutate({
        variables: {
          username: username,
          password: password,
        },
      })
    },
  }),
})

let loginUserMutation = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
    }
  }
`

export let loginUser = graphql(loginUserMutation, {
  props: ({ mutate }) => ({
    loginUser: async ({ username, password }) => {
      return mutate({
        variables: {
          username: username,
          password: password,
        },
      })
    },
  }),
})

let logoutUserMutation = gql`
  mutation LogoutUser {
    logout
  }
`

export let logoutUser = graphql(logoutUserMutation, {
  props: ({ mutate }) => ({
    logoutUser: async () => {
      await mutate()
      await client.resetStore() // purge apollo cache
    },
  }),
})
