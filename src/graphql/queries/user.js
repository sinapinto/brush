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

let userByUsernameQuery = gql`
  query UserByUsername($username: String!) {
    user(username: $username) {
      id
      username
      avatar
      bio
      updatedAt
      createdAt
    }
  }
`;

export let userByUsername = graphql(userByUsernameQuery);
