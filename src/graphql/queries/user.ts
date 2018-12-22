import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export const getCurrentUser = graphql(currentUserQuery);

export const userByUsernameQuery = gql`
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
