import gql from 'graphql-tag';

export const postInfoFragment = gql`
  fragment postInfo on Post {
    id
    title
    body
    updatedAt
  }
`;
