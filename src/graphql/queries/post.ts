import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';

export const getPostsQuery = gql`
  query GetPosts($pageSize: Int, $after: String) {
    getPosts(pageSize: $pageSize, after: $after) {
      cursor
      hasMore
      posts {
        ...postInfo
        author {
          ...userInfo
        }
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;

export const getPosts = graphql(getPostsQuery, {
  options: props => ({
    variables: {
      // pageSize: props.pageSize,
      // after: props.after,
    },
  }),
});

export const getPostByIdQuery = gql`
  query GetPostById($id: ID!) {
    getPost(id: $id) {
      ...postInfo
      author {
        ...userInfo
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;
