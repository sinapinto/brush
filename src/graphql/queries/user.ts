import gql from 'graphql-tag';

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export const userByUsernameQuery = gql`
  query UserByUsername($username: String!) {
    user(username: $username) {
      id
      username
      avatar
      bio
      subscribed
      isSubscriber
      createdAt
      posts {
        id
        title
        createdAt
      }
    }
  }
`;
