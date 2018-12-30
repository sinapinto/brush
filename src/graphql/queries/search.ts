import gql from 'graphql-tag';
import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';

export const searchQuery = gql`
  query Search($query: String!) {
    search(query: $query) {
      results {
        ... on User {
          ...userInfo
          subscribed
        }
        ... on Post {
          ...postInfo
          author {
            ...userInfo
          }
        }
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;
