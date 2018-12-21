import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export let currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export let getCurrentUser = graphql(currentUserQuery);

export let userByUsernameQuery = gql`
  query UserByUsername($username: String!) {
    user(username: $username) {
      id
      username
      avatar
      bio
      updatedAt
      createdAt
      posts {
        id
        title
        createdAt
      }
    }
  }
`;