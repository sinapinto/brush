import gql from 'graphql-tag';

export let postInfoFragment = gql`
  fragment postInfo on Post {
    id
    title
    body
    updatedAt
    author {
      id
      username
      bio
      avatar
    }
  }
`;
