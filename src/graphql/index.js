import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { toIdValue } from 'apollo-utilities';

let cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      getPost: (_, { id }) => {
        return toIdValue(
          cache.config.dataIdFromObject({ __typename: 'Post', id })
        );
      },
    },
  },
});

export let client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin',
    }),
  ]),
  cache,
});
