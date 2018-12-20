import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { postInfoFragment } from '../fragments/post';
import { userInfoFragment } from '../fragments/user';

export let getPostsQuery = gql`
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
      author {
        ...userInfo
      }
    }
  }
  ${postInfoFragment}
  ${userInfoFragment}
`;
