import gql from 'graphql-tag';

export const userInfoFragment = gql`
  fragment userInfo on User {
    id
    username
    bio
    avatar
  }
`;
