import ApolloClient from 'apollo-boost'

export let client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  fetchOptions: {
    credentials: 'same-origin',
  },
})
