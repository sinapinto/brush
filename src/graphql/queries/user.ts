import gql from 'graphql-tag';
import { userInfoFragment } from '../fragments/user';

export const currentUserQuery = gql`
  query CurrentUser {
    currentUser {
      id
      username
    }
  }
`;

export const getUserByUsernameQuery = gql`
  query GetUserByUsername($username: String!) {
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

export const getSubscribersByUsername = gql`
  query GetSubscribersByUsername($username: String!) {
    user(username: $username) {
      id
      subscribers {
        ...userInfo
        subscribed
      }
    }
  }
  ${userInfoFragment}
`;

export const getSubscriptionsByUsername = gql`
  query GetSubscriptionsByUsername($username: String!) {
    user(username: $username) {
      id
      subscriptions {
        ...userInfo
        subscribed
      }
    }
  }
  ${userInfoFragment}
`;
