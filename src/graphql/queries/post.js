import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { postInfoFragment } from '../fragments/post';

export let getPostsQuery = gql`
  query GetPosts($pageSize: Int, $after: String) {
    getPosts(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      posts {
        ...postInfo
      }
    }
  }
  ${postInfoFragment}
`;

export let getPosts = graphql(getPostsQuery, {
  options: props => ({
    variables: {
      // pageSize: props.pageSize,
      // after: props.after,
    },
  }),
});

export let getPostByIdQuery = gql`
  query GetPostById($id: ID!) {
    getPost(id: $id) {
      ...postInfo
    }
  }
  ${postInfoFragment}
`;
