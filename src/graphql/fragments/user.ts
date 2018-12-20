import gql from 'graphql-tag';

export let userInfoFragment = gql`
  fragment userInfo on User {
    id
    username
    bio
    avatar
  }
`;
